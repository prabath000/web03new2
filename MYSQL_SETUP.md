# MySQL Database Setup Guide

## 1. Prerequisites
- MySQL Server 8.0+ installed and running
- MySQL command line client or MySQL Workbench
- Spring Boot application with MySQL connector (already included in pom.xml)

## 2. Database Creation
Run this SQL script in your MySQL server to create the database:

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS web03db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create test database (for testing)
CREATE DATABASE IF NOT EXISTS web03db_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create application user (optional but recommended)
CREATE USER IF NOT EXISTS 'web03user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON web03db.* TO 'web03user'@'localhost';
GRANT ALL PRIVILEGES ON web03db_test.* TO 'web03user'@'localhost';
FLUSH PRIVILEGES;
```

## 3. Application Configuration

### Option A: Update application.properties directly
Edit `src/main/resources/application.properties` and replace:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

With your actual MySQL credentials:
```properties
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```

### Option B: Use Environment Variables (Recommended)
Set environment variables instead of hardcoding credentials:

**For Windows (Command Prompt):**
```cmd
set DB_USERNAME=root
set DB_PASSWORD=your_mysql_password
mvnw.cmd spring-boot:run
```

**For Windows (PowerShell):**
```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
mvnw.cmd spring-boot:run
```

Then update application.properties to use environment variables:
```properties
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:your_default_password}
```

### Option C: Use application.yml with profiles
Create `src/main/resources/application.yml`:
```yaml
spring:
  profiles:
    active: dev
  
---
spring:
  config:
    activate:
      on-profile: dev
  datasource:
    url: jdbc:mysql://localhost:3306/web03db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
    username: root
    password: your_mysql_password
    
---
spring:
  config:
    activate:
      on-profile: test
  datasource:
    url: jdbc:mysql://localhost:3306/web03db_test?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
    username: root
    password: your_mysql_password
```

## 4. Database Schema
The application will automatically create the `projects` table using `schema.sql`:
- id: BIGINT AUTO_INCREMENT PRIMARY KEY
- title: VARCHAR(255) NOT NULL
- description: VARCHAR(1000)
- status: VARCHAR(255) NOT NULL
- image: LONGTEXT

## 5. Sample Data
The application will populate the table with sample data from `data.sql`.

## 6. Testing
Run the database setup test:
```bash
mvnw.cmd test -Dtest=DatabaseSetupTest
```

## 7. Troubleshooting

### Connection Issues
- Ensure MySQL server is running: `net start mysql`
- Check firewall settings
- Verify MySQL is listening on port 3306
- Test connection: `mysql -u root -p -h localhost`

### Common Errors
1. **Access Denied**: Check username/password
2. **Can't connect to MySQL server**: MySQL service not running
3. **Unknown database**: Create the database first
4. **SSL errors**: Add `?useSSL=false` to connection URL

## 8. Production Considerations
- Use strong passwords
- Enable SSL in production (`useSSL=true`)
- Use connection pooling (already configured)
- Consider using Docker for consistent environment
- Set up database backups
- Use read replicas for scaling