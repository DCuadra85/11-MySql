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

//Start connection to DB

connection.connect(function (err) {
    if (err) throw err;
    start();
});

//Main Selection List

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
        })
        .catch((err) => {
            if (err) {
                console.log("Error:", err)
            }
        })
}

// View All Employees

function viewEmployeeAll() {
    console.log("View Employees")
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res)
    })

}

function viewEmployeeDepartment() {
    console.log("View Employee Dept.")
    // const viewEmployeeDepartment = function() {
    //     const departmentArr = [];
    connection.query("Select name From Department", function (err, res) {
        if (err) throw err;
        res.forEach(function (list) {

        })
    })
}


function viewEmployeeManager() {
    console.log("View Employee Manager")
}

function addEmployee() {
    // inquirer
    //     .prompt([{
    //         name: "newemployee",
    //         type: "input",
    //         message: "What is the name of the employee?",
    //         when: 
    //             not a manager, then select manager from choice prompt
    //     },
    //     {
    //     }]).then connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, role, manager)", const NAMEARRAY = (first_name, last_name))

    connection.query("Select name From Department", function (err, res) {
        if (err) throw err;

    })
    console.log("add employee")
}

function removeEmployee() {
    console.log("remove employee")
}

function updateEmployeeRole() {
    console.log("update employee role")
}

function updateEmployeeManager() {
    console.log("update employee manager")
}

function viewRoles() {
    console.log("View Roles")
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}