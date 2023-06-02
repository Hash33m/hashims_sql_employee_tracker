const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function viewAllEmployees() {
  const employees = await db.promise().query("SELECT * FROM Employee");
  console.table(employees[0]);
  mainMenu();
}

async function addDepartment() {
  const response = await inquirer.prompt([
    {
      type: "input",
      message: "What department would you like to add:",
      name: "department"
    }
  ]);

  const department = await db.promise().query("INSERT INTO department(name) VALUES (?)", response.department);
  if (department[0].affectedRows > 0) {
    console.log(response.department, "has been added")
  }
  else {
    console.log("Sorry, department could not be added")
  }

  mainMenu();
}

async function addRole() {
  const departments = await db.promise().query("SELECT * FROM department");
  const departmentChoices = departments[0].map((department) => ({
    name: department.name,
    value: department.id
  }));

  const response = await inquirer.prompt([
    {
      type: "input",
      message: "What role would you like to add:",
      name: "role"
    },
    {
      type: "input",
      message: "Enter the role's salary:",
      name: "salary"
    },
    {
      type: "list",
      message: "Select the department for the role:",
      choices: departmentChoices,
      name: "departmentId"
    }
  ]);

  const role = await db.promise().query(
    "INSERT INTO roles(title, salary, department_id) VALUES (?, ?, ?)",
    [response.role, response.salary, response.departmentId]
  );

  if (role[0].affectedRows > 0) {
    console.log("Role", response.role, "has been added");
  } else {
    console.log("Sorry, role could not be added");
  }

  mainMenu();
}

async function addEmployee() {
  // Implementation for adding an employee
  mainMenu();
}

async function updateEmployeeRole() {
  // Implementation for updating an employee's role
  mainMenu();
}

async function viewAllDepartments() {
  const departments = await db.promise().query("SELECT * FROM department");
  console.table(departments[0]);
  mainMenu();
}

async function mainMenu() {
  const response = await inquirer.prompt([
    {
      type: "list",
      message: "Welcome to the employee tracker. Please select an option:",
      choices: [
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "View all departments",
        "Exit"
      ],
      name: "menu"
    }
  ]);

  switch (response.menu) {
    case "View all employees":
      viewAllEmployees();
      break;
    case "Add a department":
      addDepartment();
      break;
    case "Add a role":
      addRole();
      break;
    case "Add an employee":
      addEmployee();
      break;
    case "Update an employee role":
      updateEmployeeRole();
      break;
    case "View all departments":
      viewAllDepartments();
      break;
    case "Exit":
      console.log("Exiting...");
      return;
    default:
      console.log("Invalid option");
      break;
  }

  mainMenu();
}

// Call the mainMenu function to start the program
mainMenu();
