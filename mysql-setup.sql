-- MySQL Database Setup Script for web03 application
-- Run this script as MySQL root user or with admin privileges

-- Create main database
CREATE DATABASE IF NOT EXISTS web03db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Create test database
CREATE DATABASE IF NOT EXISTS web03db_test 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Create dedicated application user (recommended for security)
CREATE USER IF NOT EXISTS 'web03user'@'localhost' IDENTIFIED BY 'web03_secure_password_2024';
GRANT ALL PRIVILEGES ON web03db.* TO 'web03user'@'localhost';
GRANT ALL PRIVILEGES ON web03db_test.* TO 'web03user'@'localhost';

-- Grant limited privileges for external access (if needed)
CREATE USER IF NOT EXISTS 'web03user'@'%' IDENTIFIED BY 'web03_secure_password_2024';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX ON web03db.* TO 'web03user'@'%';

FLUSH PRIVILEGES;

-- Verify databases were created
SHOW DATABASES LIKE 'web03%';

-- Display user privileges
SELECT User, Host FROM mysql.user WHERE User = 'web03user';