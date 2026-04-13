package com.tusofia.smartpark.web.rest;

import static org.hamcrest.Matchers.emptyString;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.nullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tusofia.smartpark.IntegrationTest;
import com.tusofia.smartpark.domain.User;
import com.tusofia.smartpark.repository.UserRepository;
import com.tusofia.smartpark.dto.LoginVM;
import com.tusofia.smartpark.dto.RefreshTokenVM;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link AuthenticateController} REST controller.
 */
@AutoConfigureMockMvc
@IntegrationTest
class AuthenticateControllerIT {

    @Autowired
    private ObjectMapper om;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @Transactional
    void testAuthorize() throws Exception {
        User user = new User();
        user.setLogin("user-jwt-controller");
        user.setEmail("user-jwt-controller@example.com");
        user.setActivated(true);
        user.setPassword(passwordEncoder.encode("test"));

        userRepository.saveAndFlush(user);

        LoginVM login = new LoginVM();
        login.setUsername("user-jwt-controller");
        login.setPassword("test");
        mockMvc
            .perform(post("/api/authenticate").contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(login)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.access_token").isString())
            .andExpect(jsonPath("$.access_token").isNotEmpty())
            .andExpect(jsonPath("$.refresh_token").isString())
            .andExpect(jsonPath("$.refresh_token").isNotEmpty())
            .andExpect(header().string("Authorization", not(nullValue())))
            .andExpect(header().string("Authorization", not(is(emptyString()))));
    }

    @Test
    @Transactional
    void testAuthorizeWithRememberMe() throws Exception {
        User user = new User();
        user.setLogin("user-jwt-controller-remember-me");
        user.setEmail("user-jwt-controller-remember-me@example.com");
        user.setActivated(true);
        user.setPassword(passwordEncoder.encode("test"));

        userRepository.saveAndFlush(user);

        LoginVM login = new LoginVM();
        login.setUsername("user-jwt-controller-remember-me");
        login.setPassword("test");
        login.setRememberMe(true);
        mockMvc
            .perform(post("/api/authenticate").contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(login)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.access_token").isString())
            .andExpect(jsonPath("$.access_token").isNotEmpty())
            .andExpect(jsonPath("$.refresh_token").isString())
            .andExpect(jsonPath("$.refresh_token").isNotEmpty())
            .andExpect(header().string("Authorization", not(nullValue())))
            .andExpect(header().string("Authorization", not(is(emptyString()))));
    }

    @Test
    void testAuthorizeFails() throws Exception {
        LoginVM login = new LoginVM();
        login.setUsername("wrong-user");
        login.setPassword("wrong password");
        mockMvc
            .perform(post("/api/authenticate").contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(login)))
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("$.access_token").doesNotExist())
            .andExpect(header().doesNotExist("Authorization"));
    }

    @Test
    @Transactional
    void testExchangeRefreshToken() throws Exception {
        User user = new User();
        user.setLogin("user-jwt-controller-refresh");
        user.setEmail("user-jwt-controller-refresh@example.com");
        user.setActivated(true);
        user.setPassword(passwordEncoder.encode("test"));

        userRepository.saveAndFlush(user);

        LoginVM login = new LoginVM();
        login.setUsername("user-jwt-controller-refresh");
        login.setPassword("test");

        String refreshToken = mockMvc
            .perform(post("/api/authenticate").contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(login)))
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();

        String refreshTokenValue = om.readTree(refreshToken).get("refresh_token").asText();

        RefreshTokenVM refreshTokenVM = new RefreshTokenVM();
        refreshTokenVM.setRefreshToken(refreshTokenValue);

        mockMvc
            .perform(post("/api/authenticate/refresh").contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(refreshTokenVM)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.access_token").isString())
            .andExpect(jsonPath("$.access_token").isNotEmpty())
            .andExpect(jsonPath("$.refresh_token").isString())
            .andExpect(jsonPath("$.refresh_token").isNotEmpty())
            .andExpect(header().string("Authorization", not(nullValue())))
            .andExpect(header().string("Authorization", not(is(emptyString()))));
    }

    @Test
    @Transactional
    void testRefreshTokenCannotAuthenticateRequests() throws Exception {
        User user = new User();
        user.setLogin("user-jwt-controller-no-access");
        user.setEmail("user-jwt-controller-no-access@example.com");
        user.setActivated(true);
        user.setPassword(passwordEncoder.encode("test"));

        userRepository.saveAndFlush(user);

        LoginVM login = new LoginVM();
        login.setUsername("user-jwt-controller-no-access");
        login.setPassword("test");

        String loginResponse = mockMvc
            .perform(post("/api/authenticate").contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(login)))
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();

        String refreshTokenValue = om.readTree(loginResponse).get("refresh_token").asText();

        mockMvc.perform(get("/api/account").header("Authorization", "Bearer " + refreshTokenValue)).andExpect(status().isUnauthorized());
    }

    @Test
    void testRefreshAuthorizeFails() throws Exception {
        RefreshTokenVM refreshTokenVM = new RefreshTokenVM();
        refreshTokenVM.setRefreshToken("wrong-token");

        mockMvc
            .perform(post("/api/authenticate/refresh").contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(refreshTokenVM)))
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("$.access_token").doesNotExist())
            .andExpect(header().doesNotExist("Authorization"));
    }
}
