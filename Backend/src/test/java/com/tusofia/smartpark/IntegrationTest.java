package com.tusofia.smartpark;

import com.tusofia.smartpark.config.AsyncSyncConfiguration;
import com.tusofia.smartpark.config.EmbeddedSQL;
import com.tusofia.smartpark.config.JacksonConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(
    classes = {
        SmartparkApp.class,
        JacksonConfiguration.class,
        AsyncSyncConfiguration.class,
        com.tusofia.smartpark.config.JacksonHibernateConfiguration.class,
    }
)
@EmbeddedSQL
public @interface IntegrationTest {}
