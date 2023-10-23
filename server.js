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

db.connect(function(err) {
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
async function mainMenu() {
  const choice = await inquirer.prompt([
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
  ]);

  switch (choice.action) {
    case 'View all departments':
      // Implement code to view departments
      break;
    case 'View all roles':
      // Implement code to view roles
      break;
    case 'View all employees':
      // Implement code to view employees
      break;
    case 'Add a department':
      // Implement code to add a department
      break;
    case 'Add a role':
      // Implement code to add a role
      break;
    case 'Add an employee':
      // Implement code to add an employee
      break;
    case 'Update an employee role':
      // Implement code to update an employee's role
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit(0);
  }
}

// Call the main menu function to start the application
// mainMenu();
selectTest();