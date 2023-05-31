const inquirer = require("inquirer")
const mysql = require("mysql2")

const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '934310',
    database: 'inventory_db'
  },

);

async function viewAllEmployees() {
  const employees = await db.promise().query("SELECT * FROM Employee")
  console.table(employees[0])
  mainMenu()
}
async function addDepartment() {
  const response = await inquirer.prompt([{
    type: "input",
    message: "what department would you like to add:",
    name: "department",
  }])
  const department = await db.promise().query("INSERT INTO department(name) VALUES (?)", response.department)
  console.log("added department", department)
  mainMenu()
}

async function addRole() {
  const response = await inquirer.prompt([{
    type: "input",
    message: "what role would you like to see:",
    name: "Role",
  }])
  const role = await db.promise().query("INSERT INTO role(name) VALUES (?)", response.role)
  console.log("added role", role)
  mainMenu()
}

async function mainMenu() {
  const response = await inquirer.prompt([
    {
      type: "list",
      message: "welcome to employee tracker please select an option:",
      choices: ["view all employees", "add a department", "add a role"],
      name: "menu",

    }
  ])
  if (response.menu === "view all employees") {
    viewAllEmployees()
  }
  if (response.menu === "add a department") {
    addDepartment()
  }
  if (response.menu === "add a role") {
    addRole()
  }
}
mainMenu();







