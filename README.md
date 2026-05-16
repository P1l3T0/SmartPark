# SmartPark

## Frontend

---

## Backend

Built with **Spring Boot**, **JHipster**, **Liquibase**, and PostgreSQL.  
The application provides REST APIs for authentication, parking management, and system administration.


### Technology Stack

- Java 21
- Spring Boot
- Spring Security (JWT authentication)
- JPA / Hibernate
- Liquibase (database migrations)
- PostgreSQL
- Maven Wrapper (`./mvnw`)
- JHipster framework

### Prerequisites

Before running the backend, ensure the following software is installed:

- **Java 21**
- **PostgreSQL 16+**
- **Git**
- **Node.js** (only required if frontend build is enabled)
  

Verify installations:

```bash
java -version
psql --version
```

### Environment Variables

Some configuration values are read from environment variables. Contact backend dev to provide them.

### Database Migrations

The project uses Liquibase to manage database schema.

When the application starts:

- Liquibase automatically runs migrations
- Tables are created automatically

Migration scripts are located in: config/liquibase/changelog

### Run the Backend

Run the backend locally:

```bash
./mvnw
```

The application starts with the default development profile and is available at:

```text
http://localhost:8080
```

The API base URL is:

```text
http://localhost:8080/api
```

### Run Tests

Run the full backend test suite:

```bash
./mvnw verify
```

Run only unit tests:

```bash
./mvnw test
```

Run integration tests. Integration tests are named `*IT.java` and are executed by Maven Failsafe during the `verify` phase:

```bash
./mvnw verify
```

Run a single integration test class:

```bash
./mvnw -Dit.test=AccountResourceIT verify
```

Run a single unit test class:

```bash
./mvnw -Dtest=UserServiceTest test
```

### Useful Development Commands

Compile the backend without running tests:

```bash
./mvnw compile
```

Clean generated build files:

```bash
./mvnw clean
```

Clean and verify the project from scratch:

```bash
./mvnw clean verify
```

### Configuration Notes

- Main application configuration is in `src/main/resources/config/application.yml`.
- Development configuration is in `src/main/resources/config/application-dev.yml`.
- Test configuration is in `src/test/resources/config/application.yml` and `src/test/resources/config/application-testdev.yml`.

This application was generated using JHipster 9.0.0, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v9.0.0](https://www.jhipster.tech/documentation-archive/v9.0.0).

## Project Structure

Node is required for generation and recommended for development. `package.json` is always generated for a better development experience with prettier, commit hooks, scripts and so on.

In the project root, JHipster generates configuration files for tools like git, prettier, eslint, husky, and others that are well known and you can find references in the web.

`/src/*` structure follows default Java structure.

- `.yo-rc.json` - Yeoman configuration file
  JHipster configuration is stored in this file at `generator-jhipster` key. You may find `generator-jhipster-*` for specific blueprints configuration.
- `.yo-resolve` (optional) - Yeoman conflict resolver
  Allows to use a specific action when conflicts are found skipping prompts for files that matches a pattern. Each line should match `[pattern] [action]` with pattern been a [Minimatch](https://github.com/isaacs/minimatch#minimatch) pattern and action been one of skip (default if omitted) or force. Lines starting with `#` are considered comments and are ignored.
- `.jhipster/*.json` - JHipster entity configuration files

- `npmw` - wrapper to use locally installed npm.
  JHipster installs Node and npm locally using the build tool by default. This wrapper makes sure npm is installed locally and uses it avoiding some differences different versions can cause. By using `./npmw` instead of the traditional `npm` you can configure a Node-less environment to develop or test your application.
- `/src/main/docker` - Docker configurations for the application and services that the application depends on (coming soon)

## Development

The build system will install automatically the recommended version of Node and npm.

We provide a wrapper to launch npm.
You will only need to run this command when dependencies change in [package.json](package.json).

```bash
./npmw install
```

We use npm scripts and Webpack as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

```bash
./npmw run backend:start
./npmw run start
```

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `./npmw update` and `./npmw install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `./npmw help update`.

The `./npmw run` command will list all the scripts available to run for this project.

## References

- [JHipster Homepage and latest documentation](https://www.jhipster.tech/)
- [JHipster 9.0.0 archive](https://www.jhipster.tech/documentation-archive/v9.0.0)
- [Using JHipster in development](https://www.jhipster.tech/documentation-archive/v9.0.0/development/)
- [Using JHipster in production](https://www.jhipster.tech/documentation-archive/v9.0.0/production/)
- [Running tests page](https://www.jhipster.tech/documentation-archive/v9.0.0/running-tests/)
- [Code quality page](https://www.jhipster.tech/documentation-archive/v9.0.0/code-quality/)
- [Setting up Continuous Integration](https://www.jhipster.tech/documentation-archive/v9.0.0/setting-up-ci/)
- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [Webpack](https://webpack.js.org/)
- [BrowserSync](https://www.browsersync.io/)
- [Jest](https://jestjs.io)
- [Leaflet](https://leafletjs.com/)
- [DefinitelyTyped](https://definitelytyped.org/)