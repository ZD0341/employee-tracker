INSERT INTO departments (department_name)
VALUES
  ('General'),
  ('Engineering'),
  ('Marketing'),
  ('Sales');

INSERT INTO roles (title, salary, department_id) 
VALUES
  ('General Manager', 90000, 1),
  ('Software Lead Engineer', 80000, 2),
  ('Software Intern', 40000, 2),
  ('Marketing Specialist', 49500, 3),  
  ('Social Media Intern', 49750, 3),
  ('Sales Manager', 70000, 4),
  ('Salesman', 60000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
  ('Zeke', 'Doe', 1, NULL),
  ('Gabriel', 'Johnson', 2, 1),
  ('Quinn', 'Smith', 4, 1),
  ('Bolt', 'Williams', 6, 1),
  ('Gavin', 'Jefferson', 3, 2),
  ('Zach', 'Lincoln', 5, 3),
  ('Logan', 'Washington', 7, 4);
