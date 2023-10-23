source ./db/schema.sql;
source ./db/seeds.sql;

select name, department, title, salary, concat(employees.first_name,' ',employees.last_name) as manager from (select concat(first_name,' ',last_name) as name, department_name as department, title, salary, employees.id,manager_id from employees join (select department_name,title,salary,roles.id from departments right join roles on departments.id = roles.department_id) as dep on employees.role_id = dep.id) as full_employee join employees on full_employee.manager_id = employees.id;

select concat(first_name,' ',last_name) as name, department_name as department, title, salary, employees.id,manager_id from employees join (select department_name,title,salary,roles.id from departments right join roles on departments.id = roles.department_id) as dep on employees.role_id = dep.id

select a.first_name,a.last_name,b.first_name as manager from employees a, employees b where a.manager_id = b.id;