-- Create Database
CREATE DATABASE IF NOT EXISTS ieee_conference;
USE ieee_conference;

-- Create Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    usn VARCHAR(20) NOT NULL UNIQUE,
    branch VARCHAR(100) NOT NULL,
    sem INT NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Insert dummy data for testing
-- INSERT INTO registrations (name, usn, branch, sem, phone, email) 
-- VALUES ('Test User', '1AT23CS000', 'Computer Science', 4, '7022339670', 'test@example.com');

-- SECURITY: Create a restricted Staff user
-- This user can see and add registrations, but CANNOT drop tables or delete everything.
-- CREATE USER 'ieee_staff'@'%' IDENTIFIED BY 'staff_password_123';
-- GRANT SELECT, INSERT, UPDATE ON ieee_conference.* TO 'ieee_staff'@'%';
-- FLUSH PRIVILEGES;
