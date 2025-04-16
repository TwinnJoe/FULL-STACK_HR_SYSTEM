-- Create the MTS database
CREATE DATABASE IF NOT EXISTS hr_db;
USE hr_db;

-- Create Employees table
CREATE TABLE IF NOT EXISTS employees (
  employeeID INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  contact VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  employment_history TEXT NOT NULL
) AUTO_INCREMENT = 1001;

-- Insert employee data
INSERT INTO employees (name, position, salary, contact, department, employment_history) 
VALUES 
('Sibongile Nkosi', 'Software Engineer', 70000.00, 'sibongilenkosi@hrtech.com', 'Development', 'Joined in 2015, promoted to Senior in 2018'),
('Lungile Moyo', 'HR Manager', 80000.00, 'lungilemoyo@hrtech.com', 'HR', 'Joined in 2013, promoted to Manager in 2017'),
('Thabo Molefe', 'Quality Analyst', 55000.00, 'thabomolefe@hrtech.com', 'QA', 'Joined in 2018'),
('Keshav Naidoo', 'Sales Representative', 60000.00, 'keshavnaidoo@hrtech.com', 'Sales', 'Joined in 2020'),
('Zanele Khumalo', 'Marketing Specialist', 58000.00, 'zanelekhumalo@hrtech.com', 'Marketing', 'Joined in 2019'),
('Sipho Zulu', 'UI/UX Designer', 65000.00, 'siphozulu@hrtech.com', 'Design', 'Joined in 2016'),
('Naledi Moeketsi', 'DevOps Engineer', 72000.00, 'naledimoeketsi@hrtech.com', 'IT', 'Joined in 2017'),
('Farai Gumbo', 'Content Strategist', 56000.00, 'faraigumbo@hrtech.com', 'Marketing', 'Joined in 2021'),
('Karabo Dlamini', 'Accountant', 62000.00, 'karabodlamini@hrtech.com', 'Finance', 'Joined in 2018'),
('Fatima Patel', 'Customer Support Lead', 58000.00, 'fatimapatel@hrtech.com', 'Support', 'Joined in 2016');

-- Create Attendance table
CREATE TABLE IF NOT EXISTS attendance (
  employeeID INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('Present', 'Absent') NOT NULL,
  PRIMARY KEY (employeeID, date),
  FOREIGN KEY (employeeID) REFERENCES employees(employeeID) ON DELETE CASCADE
);

-- Insert attendance data
INSERT INTO attendance (employeeID, date, status) VALUES
(1001, '2024-11-25', 'Present'), 
(1002, '2024-11-25', 'Present'),
(1003, '2024-11-25', 'Present'),
(1004, '2024-11-25', 'Absent'),
(1005, '2024-11-25', 'Present'),
(1006, '2024-11-25', 'Present'),
(1007, '2024-11-25', 'Present'),
(1008, '2024-11-25', 'Present'),
(1009, '2024-11-25', 'Present'),
(1010, '2024-11-25', 'Present');

-- Create Payroll table
CREATE TABLE IF NOT EXISTS payroll (
  payrollID INT AUTO_INCREMENT PRIMARY KEY,
  employeeID INT NOT NULL,
  hours_worked INT NOT NULL,
  leave_days INT DEFAULT 0,
  salary DECIMAL(10,2) NOT NULL,
  performance ENUM('Excellent', 'Good', 'Average', 'Bad') DEFAULT 'Average',
  FOREIGN KEY (employeeID) REFERENCES employees(employeeID) ON DELETE CASCADE
) AUTO_INCREMENT = 3001;

-- Insert payroll data without specifying payrollID
INSERT INTO payroll (employeeID, hours_worked, leave_days, salary, performance) VALUES
(1001, 160, 2, 70000.00, 'Good'),
(1002, 150, 1, 80000.00, 'Good'),
(1003, 170, 0, 55000.00, 'Good'),
(1004, 165, 3, 60000.00, 'Bad'),
(1005, 158, 2, 58000.00, 'Bad'),
(1006, 168, 1, 65000.00, 'Average'),
(1007, 175, 0, 72000.00, 'Average'),
(1008, 160, 2, 56000.00, 'Average'),
(1009, 155, 1, 62000.00, 'Average'),
(1010, 162, 0, 58000.00, 'Good');

-- Create User Logins table
CREATE TABLE IF NOT EXISTS users (
  employeeID INT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  FOREIGN KEY (employeeID) REFERENCES employees(employeeID) ON DELETE CASCADE
);

-- Insert login credentials
INSERT INTO users (employeeID, username, password) VALUES
(1001, 'Sibongilenkosi', '$2b$10$z4MUKE4x7PG2MYP/Er7Ti.uRzwq0QKzRmSicTehn81iSbMMOrQ2Te'),
(1010, 'Fatimapatel', '$2b$10$C4XRa8Y34tNk2JJDksYNHefYCnyLl5SOjCXqYYDWFD0KA81.QlwLS');