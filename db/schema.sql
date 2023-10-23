DROP DATABASE IF EXISTS emp_tracker;
CREATE DATABASE emp_tracker;

USE emp_tracker;
SELECT DATABASE();

CREATE TABLE department (
  id INT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
);


CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL
  department_id INT
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  -- /  FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL
);

