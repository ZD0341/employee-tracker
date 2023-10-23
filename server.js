const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// execute will internally call prepare and query
function selectTest() {
  db.execute(
    'SELECT * FROM `employees` WHERE `manager_id` = ?',
    ['1'],
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      // console.log(fields); // fields contains extra meta data about results, if available

      // If you execute same statement again, it will be picked from a LRU cache
      // which will save query preparation time and give better performance
    }
  );
}

// Create a function to prompt for the main menu options
const promptUser = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ])

  .then((answers) => {
    const { choices } = answers;

    if (choices === 'View all departments') {
      viewAllDepartments();
    }
    if (choices === 'View all roles') {
      viewAllRoles();
    }

    if (choices === 'View all employees') {
      viewAllEmployees();
    }

    if (choices === 'Add a department') {
      viewAllDepartments();
    }
    if (choices === 'Add a role') {
      viewAllRoles();
    }

    if (choices === 'Add an employee') {
      viewAllEmployees();
    }
    if (choices === 'Update an employee role') {
      updateAnEmployeeRole();
    }
    if (choices === 'Exit') {
      Connection.end();
    }
  });
};

// Call the main menu function to start the application
// mainMenu();
selectTest();