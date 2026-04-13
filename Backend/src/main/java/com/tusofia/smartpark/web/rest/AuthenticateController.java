package com.tusofia.smartpark.web.rest;

import com.tusofia.smartpark.service.AuthenticationService;
import com.tusofia.smartpark.dto.LoginVM;
import com.tusofia.smartpark.dto.RefreshTokenVM;
import com.tusofia.smartpark.dto.TokenPairVM;
import jakarta.validation.Valid;
import java.security.Principal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller to authenticate users.
 */
@RestController
@RequestMapping("/api")
public class AuthenticateController {

    private static final Logger LOG = LoggerFactory.getLogger(AuthenticateController.class);

    private final AuthenticationService authenticationService;

    public AuthenticateController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<TokenPairVM> authorize(@Valid @RequestBody LoginVM loginVM) {
        TokenPairVM jwt = authenticationService.authenticate(loginVM);
        var httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(jwt.getAccessToken());
        return new ResponseEntity<>(jwt, httpHeaders, HttpStatus.OK);
    }

    @PostMapping("/authenticate/refresh")
    public ResponseEntity<TokenPairVM> refresh(@Valid @RequestBody RefreshTokenVM refreshTokenVM) {
        TokenPairVM jwt = authenticationService.refresh(refreshTokenVM);
        var httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(jwt.getAccessToken());
        return new ResponseEntity<>(jwt, httpHeaders, HttpStatus.OK);
    }

    /**
     * {@code GET /authenticate} : check if the user is authenticated.
     *
     * @return the {@link ResponseEntity} with status {@code 204 (No Content)},
     * or with status {@code 401 (Unauthorized)} if not authenticated.
     */
    @GetMapping("/authenticate")
    public ResponseEntity<Void> isAuthenticated(Principal principal) {
        LOG.debug("REST request to check if the current user is authenticated");
        return ResponseEntity.status(principal == null ? HttpStatus.UNAUTHORIZED : HttpStatus.NO_CONTENT).build();
    }
}
