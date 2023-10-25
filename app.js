const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const Connection = require('mysql2/typings/mysql/lib/Connection');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '1234',
    database: 'tracker_db'
  }
  // console.log(`Connected to the tracker_db database.`)
);

// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// execute will internally call prepare and query
// function selectTest() {
//   db.execute(
//     'SELECT * FROM `employees` WHERE `manager_id` = ?',
//     ['1'],
//     function (err, results, fields) {
//       console.log(results); // results contains rows returned by server
//       // console.log(fields); // fields contains extra meta data about results, if available

//       // If you execute same statement again, it will be picked from a LRU cache
//       // which will save query preparation time and give better performance
//     }
//   );
// }

// Create a function to prompt for the main menu options
async function promptUser() {
  await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Delete a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ]).then((answers) => {
    const choice = answers.action;
    //console.log(answers)
    //console.log(choice)
    if (choice === 'View all departments') {
      return viewAllDepartments();
    } else if (choice === 'View all roles') {
      return viewAllRoles();
    } else if (choice === 'View all employees') {
      return viewAllEmployees();
    } else if (choice === 'Add a department') {
      return addDepartment();
    } else if (choice === 'Delete a department') {
      return deleteDepartment();
    } else if (choice === 'Add a role') {
      return addRole();
    } else if (choice === 'Add an employee') {
      return addEmployee();
    } else if (choice === 'Update an employee role') {
      return updateEmployeeRole();
    } else if (choice === 'Exit') {
      console.table('Goodbye');
      db.destroy()
      process.exit();
    }
  })
};

function queryDatabase(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function viewAllDepartments() {
  try {
    const results = await queryDatabase('SELECT id, department_name FROM departments');
    console.table(results);
  } catch (err) {
    console.error('Error fetching departments:', err);
  }
  promptUser();
}

async function viewAllRoles() {
  try {
    const results = await queryDatabase('SELECT roles.id as id, title, department_name as departmnet, salary FROM roles join departments on department_id = departments.id');
    console.table(results);
  } catch (err) {
    console.error('Error fetching roles:', err);
  }
  promptUser();
}

async function viewAllEmployees() {
  try {
    const results = await queryDatabase("SELECT e.id,CONCAT(e.first_name, ' ', e.last_name) AS name,r.title,d.department_name AS department,r.salary,CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e JOIN roles r ON e.role_id = r.id JOIN departments d ON r.department_id = d.id LEFT JOIN employees m ON e.manager_id = m.id;");
    console.table(results);
  } catch (err) {
    console.error('Error fetching employees:', err);
  }
  promptUser();
}

async function addDepartment() {
  try {
    const newDepartment = await inquirer.prompt([
      {
        type: 'input',
        name: 'department_name',
        message: 'Enter the name of the new department:',
      },
    ]);

    const query = `INSERT INTO departments (department_name) VALUES ('${newDepartment.department_name}')`;
    await queryDatabase(query);

    console.log(`New department '${newDepartment.department_name}' added.`);
  } catch (err) {
    console.error('Error adding department:', err);
  }
  promptUser();
}

async function deleteDepartment() {
  try {
    const departments = await queryDatabase('SELECT * FROM departments');
    
    const departmentChoices = [];
    for (let i = 0; i < departments.length; i++) {
      departmentChoices.push({
        name: departments[i].department_name,
        value: departments[i].id,
      });
    }

    const selectedDepartment = await inquirer.prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department to delete:',
        choices: departmentChoices,
      },
    ]);

    const query = `DELETE FROM departments WHERE id = ${[selectedDepartment.departmentId]}`;
    await queryDatabase(query);

    console.log('Department deleted successfully.');
  } catch (err) {
    console.error('Error deleting department:', err);
  }
  promptUser();
}

async function addRole() {
  try {
    const newRole = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the new role:',
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID for the new role:',
      },
    ]);

    const query = `INSERT INTO roles (title, salary, department_id) VALUES ('${newRole.title}', '${newRole.salary}', '${newRole.department_id}')`;
    await queryDatabase(query);

    console.log(`New role '${newRole.title}' added.`);
  } catch (err) {
    console.error('Error adding role:', err);
  }
  promptUser();
}

async function addEmployee() {
  try {
    const employeeData = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of the new employee:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of the new employee:',
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'Enter the role ID of the new employee:',
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Enter the manager ID of the new employee (if applicable):',
      },
    ]);

    const query = `
      INSERT INTO employees (first_name, last_name, role_id, manager_id)
      VALUES ('${employeeData.first_name}', '${employeeData.last_name}', ${parseInt(employeeData.role_id)}, ${
      parseInt(employeeData.manager_id) || null
    })
    `;

    await queryDatabase(query);

    console.log(`New employee '${employeeData.first_name} ${employeeData.last_name}' added.`);
  } catch (err) {
    console.error('Error adding employee:', err);
  }
  promptUser();
}

const updateEmployeeRole = async () => {
  try {
    const employeeChoices = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Whose role are we updating?',
        choices: employees.map(employee => ({ name: employee.name, value: employee.id })),
      },
      {
        type: 'list',
        name: 'role',
        message: 'What is their new role?',
        choices: roles.map(role => ({ name: role.title, value: role.id })),
      },
    ]);

    const query = `
      UPDATE employees
      SET role_id = ${employeeChoices.role}
      WHERE id = ${employeeChoices.employee}
    `;

    await queryDatabase(query);

    console.log('Employee role updated successfully.');
  } catch (err) {
    console.error('Error updating employee role:', err);
  }

  promptUser();
};
// async function updateEmployeeManager() {
//   try {
//     const results = await queryDatabase('');
//     console.table(results);
//   } catch (err) {
//     console.error('Error updating employee manager:', err);
//   }
//   promptUser();
// }

// async function viewEmployeesByManager() {
//   try {
//     const results = await queryDatabase('');
//     console.table(results);
//   } catch (err) {
//     console.error('Error fetching employees by manager:', err);
//   }
//   promptUser();
// }

// async function viewEmployeesByDepartment() {
//   try {
//     const results = await queryDatabase('');
//     console.table(results);
//   } catch (err) {
//     console.error('Error fetching employees by department:', err);
//   }
//   promptUser();
// }

// async function deleteRole() {
//   try {
//     const results = await queryDatabase('');
//     console.table(results);
//   } catch (err) {
//     console.error('Error deleting role:', err);
//   }
//   promptUser();
// }

// async function deleteEmployee() {
//   try {
//     const results = await queryDatabase('');
//     console.table(results);
//   } catch (err) {
//     console.error('Error deleting employee:', err);
//   }
//   promptUser();
// }

// async function viewDepartmentBudget() {
//   try {
//     const results = await queryDatabase('');
//     console.table(results);
//   } catch (err) {
//     console.error('Error fetching department budget:', err);
//   }
//   promptUser();
// }

function init() {

  // Call the main function to start the application
  const banner = [
    "  ______         _     _                     ",
    " |___  /        | |   ( )                    ",
    "    / / ___  ___| |__ |/ ___                 ",
    "   / / / _ \\/ __| '_ \\  / __|                ",
    "  / /_|  __/| (_| | | | \\__ \\                ",
    " /____\\____|\\___|_| |_| |___/                ",
    " |  __ \\      | |      | |                   ",
    " | |  | | __ _| |_ __ _| |__   __ _ ___  ___ ",
    " | |  | |/ _` | __/ _` | '_ \\ / _` / __|/ _ \\",
    " | |__| | (_| | || (_| | |_) | (_| \\__ \\  __/",
    " |____/  \\__,_|\\__\\__,_|_.__/ \\__,_|___/\\___|",
    "      /\\                                    ",
    "     /  \\   _ __  _ __                       ",
    "    / /\\ \\ | '_ \\| '_ \\                      ",
    "   / ____ \\| |_) | |_) |                     ",
    "  /_/    \\_\\ .__/| .__/                      ",
    "           | |   | |                         ",
    "           |_|   |_|                         "
  ];

  banner.forEach(line => console.log(line));
  console.log('\n')
  promptUser();
}

init()