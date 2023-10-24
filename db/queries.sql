-- source ./db/schema.sql;
-- source ./db/seeds.sql;

-- view full name, department, title, salary, and manager 

-- select 
--     a.id, 
--     concat(a.first_name,' ',a.last_name) as name,
--     title,
--     department_name as department,
--     salary,
--     concat(e.first_name,' ',e.last_name) as manager
-- from 
--     employees a 
-- join 
--     select 
--         department_name,
--         title,
--         salary,
--         roles.id as id 
--     from 
--         departments 
--     right join 
--         roles on departments.id = roles.department_id 
--     as dep on a.role_id = dep.id 
--     left join 
--         employees e on a.manager_id = e.id;

-- Optimized 

-- SELECT
--     e.id,
--     CONCAT(e.first_name, ' ', e.last_name) AS name,
--     r.title,
--     d.department_name AS department,
--     r.salary,
--     CONCAT(m.first_name, ' ', m.last_name) AS manager
-- FROM
--     employees e
-- JOIN
--     roles r ON e.role_id = r.id
-- JOIN
--     departments d ON r.department_id = d.id
-- LEFT JOIN
--     employees m ON e.manager_id = m.id;


-- view full name, department, title, salary, employee id, manager id 
-- select employees.id, concat(first_name,' ',last_name) as name, title, department_name as department, salary, manager_id from employees join (select department_name,title,salary,roles.id as id from departments right join roles on departments.id = roles.department_id) as dep on employees.role_id = dep.id;

-- View employees and manager
-- select a.first_name,a.last_name,b.first_name as manager from employees a, employees b where a.manager_id = b.id;