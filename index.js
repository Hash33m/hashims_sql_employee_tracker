const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '934310',
  database: 'inventory_db'
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
  console.log("Added department", department);
  mainMenu();
}

async function addRole() {
  const response = await inquirer.prompt([
    {
      type: "input",
      message: "What role would you like to add:",
      name: "role"
    }
  ]);

  const role = await db.promise().query("INSERT INTO role(name) VALUES (?)", response.role);
  console.log("Added role", role);
  mainMenu();
}

async function addEmployee() {
  const response = await inquirer.prompt([
    {
      type: "input",
      message: "Enter the employee's first name:",
      name: "firstName"
    },
    {
      type: "input",
      message: "Enter the employee's last name:",
      name: "lastName"
    },
    {
      type: "input",
      message: "Enter the employee's role:",
      name: "role"
    },
    {
      type: "input",
      message: "Enter the employee's manager:",
      name: "manager"
    },
    {
      type: "input",
      message: "Enter the employee's salary:",
      name: "salary"
    }
  ]);

  const employee = await db.promise().query(
    "INSERT INTO Employee(first_name, last_name, role, manager, salary) VALUES (?, ?, ?, ?)",
    [response.firstName, response.lastName, response.role, response.manager, response.salary]
  );
  console.log("Added employee", employee);
  mainMenu();
}

async function updateEmployeeRole() {
  const employees = await db.promise().query("SELECT * FROM Employee");
  const employeeChoices = employees[0].map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id
  }));

  const response = await inquirer.prompt([
    {
      type: "list",
      message: "Select an employee to update:",
      choices: employeeChoices,
      name: "employeeId"
    },
    {
      type: "input",
      message: "Enter the employee's new role:",
      name: "newRole"
    }
  ]);

  const updateResult = await db.promise().query(
    "UPDATE Employee SET role = ? WHERE id = ?",
    [response.newRole, response.employeeId]
  );
  console.log("Updated employee role", updateResult);
  mainMenu();
}

async function mainMenu() {
  const response = await inquirer.prompt([
    {
      type: "list",
      message: "Welcome to the employee tracker. Please select an option:",
      choices: ["View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
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
    default:
      console.log("Invalid option");
      mainMenu();
      break;
  }
}

mainMenu();
