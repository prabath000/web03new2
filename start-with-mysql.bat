@echo off
echo ===============================================
echo Spring Boot Web03 with MySQL Quick Start
echo ===============================================
echo.

REM Check if environment variables are set
if "%DB_USERNAME%"=="" (
    echo Setting default database credentials...
    set DB_USERNAME=root
    set DB_PASSWORD=your_mysql_password
    echo Using default credentials - please update DB_PASSWORD if needed
) else (
    echo Using environment variables:
    echo DB_USERNAME=%DB_USERNAME%
    echo DB_PASSWORD=********
)

echo.
echo Starting Spring Boot application...
echo Database: web03db
echo.

REM Run the Spring Boot application
mvnw.cmd spring-boot:run

pause