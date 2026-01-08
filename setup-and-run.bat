@echo off
echo ===============================================
echo Spring Boot Web03 - Database Setup and Run
echo ===============================================
echo.

REM Check if MySQL service is running
echo Checking MySQL service status...
sc query mysql | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo MySQL service is not running. Starting MySQL service...
    net start mysql
    if %errorlevel% neq 0 (
        echo Failed to start MySQL service. Please start MySQL manually.
        pause
        exit /b 1
    )
    echo MySQL service started successfully.
) else (
    echo MySQL service is already running.
)

echo.
echo Setting up database...
echo Database: web03db
echo Username: root
echo Password: Prabath (from application.properties)
echo.

REM Run the MySQL setup script
echo Creating database and user...
mysql -u root -pPrabath < mysql-setup.sql
if %errorlevel% neq 0 (
    echo Failed to create database. Please check your MySQL credentials.
    echo Make sure MySQL root password is 'Prabath' or update application.properties
    pause
    exit /b 1
)

echo.
echo Database setup completed successfully!
echo.
echo Starting Spring Boot application...
echo ===============================================
echo.

REM Set environment variables and run Spring Boot
set DB_USERNAME=root
set DB_PASSWORD=Prabath
mvnw.cmd spring-boot:run

pause