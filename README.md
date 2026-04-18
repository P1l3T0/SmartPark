# SmartPark

## Frontend

## Backend

Built with **Spring Boot**, **JHipster**, **Liquibase**, and PostgreSQL.  
The application provides REST APIs for authentication, parking management, and system administration.

---

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

### Running the Application

Use the Maven wrapper (with profile Prod):
```bash
./mvnw -Pprod
```

### Build Project

To build the backend:
```bash
./mvnw clean install
```
Run tests:
```bash
./mvnw test
```