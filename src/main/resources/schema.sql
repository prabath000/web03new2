-- Create projects table for MySQL
DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    status VARCHAR(255) NOT NULL,
    image LONGTEXT,
    image2 LONGTEXT,
    image3 LONGTEXT,
    image4 LONGTEXT,
    image5 LONGTEXT,
    github_url VARCHAR(512),
    INDEX idx_status (status),
    INDEX idx_title (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create quotes table for MySQL
DROP TABLE IF EXISTS quotes;

CREATE TABLE quotes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(255),
    message VARCHAR(2000),
    created_at DATETIME(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
