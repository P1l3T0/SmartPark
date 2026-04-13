package com.tusofia.smartpark.service;

import static com.tusofia.smartpark.security.SecurityUtils.ACCESS_TOKEN_TYPE;
import static com.tusofia.smartpark.security.SecurityUtils.AUTHORITIES_CLAIM;
import static com.tusofia.smartpark.security.SecurityUtils.JWT_ALGORITHM;
import static com.tusofia.smartpark.security.SecurityUtils.REMEMBER_ME_CLAIM;
import static com.tusofia.smartpark.security.SecurityUtils.REFRESH_TOKEN_TYPE;
import static com.tusofia.smartpark.security.SecurityUtils.TOKEN_TYPE_CLAIM;
import static com.tusofia.smartpark.security.SecurityUtils.USER_ID_CLAIM;

import com.tusofia.smartpark.security.DomainUserDetailsService.UserWithId;
import com.tusofia.smartpark.dto.LoginVM;
import com.tusofia.smartpark.dto.RefreshTokenVM;
import com.tusofia.smartpark.dto.TokenPairVM;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final JwtEncoder jwtEncoder;
    private final JwtDecoder refreshTokenJwtDecoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Value("${jhipster.security.authentication.jwt.token-validity-in-seconds:0}")
    private long tokenValidityInSeconds;

    @Value("${jhipster.security.authentication.jwt.token-validity-in-seconds-for-remember-me:0}")
    private long tokenValidityInSecondsForRememberMe;

    @Value("${smartpark.security.authentication.jwt.refresh-token-validity-in-seconds:604800}")
    private long refreshTokenValidityInSeconds;

    @Value("${smartpark.security.authentication.jwt.refresh-token-validity-in-seconds-for-remember-me:2592000}")
    private long refreshTokenValidityInSecondsForRememberMe;

    public AuthenticationService(
        JwtEncoder jwtEncoder,
        @Qualifier("refreshTokenJwtDecoder") JwtDecoder refreshTokenJwtDecoder,
        AuthenticationManagerBuilder authenticationManagerBuilder
    ) {
        this.jwtEncoder = jwtEncoder;
        this.refreshTokenJwtDecoder = refreshTokenJwtDecoder;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    public TokenPairVM authenticate(LoginVM loginVM) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(loginVM.getUsername(), loginVM.getPassword());
        var authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return createTokens(authentication, loginVM.isRememberMe());
    }

    public TokenPairVM refresh(RefreshTokenVM refreshTokenVM) {
        Jwt refreshToken;
        try {
            refreshToken = refreshTokenJwtDecoder.decode(refreshTokenVM.getRefreshToken());
        } catch (JwtException ex) {
            throw new BadCredentialsException("Invalid refresh token", ex);
        }

        boolean rememberMe = Boolean.TRUE.equals(refreshToken.getClaim(REMEMBER_ME_CLAIM));
        var user = buildUserFromRefreshToken(refreshToken);
        var authentication = UsernamePasswordAuthenticationToken.authenticated(user, refreshTokenVM.getRefreshToken(), user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return createTokens(authentication, rememberMe);
    }

    private TokenPairVM createTokens(Authentication authentication, boolean rememberMe) {
        return new TokenPairVM(
            createToken(authentication, rememberMe, ACCESS_TOKEN_TYPE),
            createToken(authentication, rememberMe, REFRESH_TOKEN_TYPE)
        );
    }

    private String createToken(Authentication authentication, boolean rememberMe, String tokenType) {
        String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(" "));

        var now = Instant.now();
        Instant validity = now.plus(getTokenValidityInSeconds(rememberMe, tokenType), ChronoUnit.SECONDS);

        JwtClaimsSet.Builder builder = JwtClaimsSet.builder()
            .issuedAt(now)
            .expiresAt(validity)
            .subject(authentication.getName())
            .claim(AUTHORITIES_CLAIM, authorities)
            .claim(TOKEN_TYPE_CLAIM, tokenType)
            .claim(REMEMBER_ME_CLAIM, rememberMe);
        if (authentication.getPrincipal() instanceof UserWithId user) {
            builder.claim(USER_ID_CLAIM, user.getId());
        }

        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();
        return jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, builder.build())).getTokenValue();
    }

    private long getTokenValidityInSeconds(boolean rememberMe, String tokenType) {
        if (REFRESH_TOKEN_TYPE.equals(tokenType)) {
            return rememberMe ? refreshTokenValidityInSecondsForRememberMe : refreshTokenValidityInSeconds;
        }
        return rememberMe ? tokenValidityInSecondsForRememberMe : tokenValidityInSeconds;
    }

    private UserWithId buildUserFromRefreshToken(Jwt refreshToken) {
        String authoritiesClaim = refreshToken.getClaimAsString(AUTHORITIES_CLAIM);
        List<SimpleGrantedAuthority> authorities = authoritiesClaim == null || authoritiesClaim.isBlank()
            ? List.of()
            : Arrays.stream(authoritiesClaim.split(" "))
                .filter(authority -> !authority.isBlank())
                .map(SimpleGrantedAuthority::new)
                .toList();
        Number userId = refreshToken.getClaim(USER_ID_CLAIM);
        return new UserWithId(refreshToken.getSubject(), "", authorities, userId == null ? null : userId.longValue());
    }
}
