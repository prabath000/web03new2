-- MySQL Database Setup Script for web03 application
-- Updated for Prabath's database name
-- Run this script as MySQL root user or with admin privileges

-- Create main database
CREATE DATABASE IF NOT EXISTS prabath_web 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Create test database
CREATE DATABASE IF NOT EXISTS prabath_web_test 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Grant privileges to root user on the new databases
GRANT ALL PRIVILEGES ON prabath_web.* TO 'root'@'localhost';
GRANT ALL PRIVILEGES ON prabath_web_test.* TO 'root'@'localhost';

FLUSH PRIVILEGES;

-- Verify databases were created
SHOW DATABASES LIKE 'prabath%';