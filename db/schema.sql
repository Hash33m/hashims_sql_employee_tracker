-- Drop the database if it exists
DROP DATABASE IF EXISTS inventory_db;

-- Create the database
CREATE DATABASE inventory_db;

-- Switch to inventory_db database
USE inventory_db;



-- Create Department table
CREATE TABLE Department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL
);

-- Create Role table
CREATE TABLE Role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES Department(id)
);

-- Create Employee table
CREATE TABLE Employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES Role(id),
  FOREIGN KEY (manager_id) REFERENCES Employee(id)
);







