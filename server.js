var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    // username
    user: "root",

    // password
    password: "password",
    database: "employeetrackerdb"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "View All Employes by Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View All Roles",
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    viewEmployeeAll();
                    break;
                case "View All Employees by Department":
                    viewEmployeeDepartment();
                    break;
                case "View All Employes by Manager":
                    viewEmployeeManager();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Update Employee Manager":
                    updateEmployeeManager();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;

            }
        });
}

function viewEmployeeAll() {
    console.log ("View Employees")
}

function viewEmployeeDepartment() {
    console.log ("View Employee Dept.")
}

function viewEmployeeManager() {
    console.log ("View Employee Manager")
}

function addEmployee() {
    console.log("add employee")
}

function removeEmployee() {
    console.log("remove employee")
}

function updateEmployeeRole() {
    console.log ("update employee role")
}

function updateEmployeeManager () {
    console.log ("update employee manager")
}

function viewRoles() {
    console.log ("View Roles")
}