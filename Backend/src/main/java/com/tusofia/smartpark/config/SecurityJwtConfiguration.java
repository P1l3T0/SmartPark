package com.tusofia.smartpark.config;

import static com.tusofia.smartpark.security.SecurityUtils.ACCESS_TOKEN_TYPE;
import static com.tusofia.smartpark.security.SecurityUtils.JWT_ALGORITHM;
import static com.tusofia.smartpark.security.SecurityUtils.REFRESH_TOKEN_TYPE;
import static com.tusofia.smartpark.security.SecurityUtils.TOKEN_TYPE_CLAIM;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import com.nimbusds.jose.util.Base64;
import com.tusofia.smartpark.management.SecurityMetersService;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Qualifier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

@Configuration
public class SecurityJwtConfiguration {

    private static final Logger LOG = LoggerFactory.getLogger(SecurityJwtConfiguration.class);

    @Value("${jhipster.security.authentication.jwt.base64-secret}")
    private String jwtKey;

    @Bean
    @Primary
    public JwtDecoder jwtDecoder(SecurityMetersService metersService) {
        NimbusJwtDecoder jwtDecoder = buildJwtDecoder();
        jwtDecoder.setJwtValidator(
            new DelegatingOAuth2TokenValidator<>(JwtValidators.createDefault(), tokenTypeValidator(ACCESS_TOKEN_TYPE, true))
        );
        return monitoredJwtDecoder(jwtDecoder, metersService);
    }

    @Bean
    @Qualifier("refreshTokenJwtDecoder")
    public JwtDecoder refreshTokenJwtDecoder(SecurityMetersService metersService) {
        NimbusJwtDecoder jwtDecoder = buildJwtDecoder();
        jwtDecoder.setJwtValidator(new DelegatingOAuth2TokenValidator<>(JwtValidators.createDefault(), tokenTypeValidator(REFRESH_TOKEN_TYPE, false)));
        return monitoredJwtDecoder(jwtDecoder, metersService);
    }

    private JwtDecoder monitoredJwtDecoder(NimbusJwtDecoder jwtDecoder, SecurityMetersService metersService) {
        return token -> {
            try {
                return jwtDecoder.decode(token);
            } catch (Exception e) {
                if (e.getMessage().contains("Invalid signature")) {
                    metersService.trackTokenInvalidSignature();
                } else if (e.getMessage().contains("Jwt expired at")) {
                    metersService.trackTokenExpired();
                } else if (
                    e.getMessage().contains("Invalid JWT serialization") ||
                    e.getMessage().contains("Malformed token") ||
                    e.getMessage().contains("Invalid unsecured/JWS/JWE")
                ) {
                    metersService.trackTokenMalformed();
                } else {
                    LOG.error("Unknown JWT error {}", e.getMessage());
                }
                throw e;
            }
        };
    }

    private NimbusJwtDecoder buildJwtDecoder() {
        return NimbusJwtDecoder.withSecretKey(getSecretKey()).macAlgorithm(JWT_ALGORITHM).build();
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        return new NimbusJwtEncoder(new ImmutableSecret<>(getSecretKey()));
    }

    private OAuth2TokenValidator<org.springframework.security.oauth2.jwt.Jwt> tokenTypeValidator(String expectedTokenType, boolean allowMissingClaim) {
        return jwt -> {
            String tokenType = jwt.getClaimAsString(TOKEN_TYPE_CLAIM);
            if (tokenType == null && allowMissingClaim) {
                return OAuth2TokenValidatorResult.success();
            }
            if (expectedTokenType.equals(tokenType)) {
                return OAuth2TokenValidatorResult.success();
            }
            return OAuth2TokenValidatorResult.failure(
                new OAuth2Error("invalid_token", "The token type is not valid for this endpoint", null)
            );
        };
    }

    private SecretKey getSecretKey() {
        byte[] keyBytes = Base64.from(jwtKey).decode();
        return new SecretKeySpec(keyBytes, 0, keyBytes.length, JWT_ALGORITHM.getName());
    }
}
