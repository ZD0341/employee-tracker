INSERT INTO departments (name) 
VALUES
  ('HR'),
  ('Engineering'),
  ('Marketing'),
  ('Sales');

INSERT INTO roles (title, salary, department_id) 
VALUES
  ('HR Manager', 60000, 1),
  ('Software Engineer', 80000, 2),
  ('Marketing Specialist', 55000, 3),
  ('Sales Manager', 70000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
  ('Zeke', 'Doe', 1, NULL),
  ('Gabriel', 'Johnson', 2, NULL),
  ('Quinn', 'Smith', 3, NULL),
  ('Bolt', 'Williams', 4, NULL);
