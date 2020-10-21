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
                    viewEmployeeRole();
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
    start();
}



function viewEmployeeDepartment() {
    console.log("View Employee Dept.")
    const departmentArr = [];
    connection.query("SELECT name FROM department", function (err, res) {
        if (err) throw err;
        res.forEach(function (element) {
            departmentArr.push(element.name);
        });

        inquirer.prompt(
            {
                name: "department",
                type: "list",
                message: "Which department do you want to view?",
                choices: departmentArr,
            }
        ).then(function (answer) {
            let selectDept = "SELECT first_name, last_name FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (role.department_id = department.id) WHERE (department.name = ? AND employee.role_id = role.id AND role.department_id = department.id)";

            connection.query(selectDept, [answer.department], function (err, res) {
                if (err) throw err;
                console.table(res);
                start();
            });
        });
    })
}


function viewEmployeeRole() {

    console.log("View Employee Role")
}

// function addEmployee() {
//     const roleList = [];
//     const managerList = ["No management"];

//     connection.query("SELECT title FROM role", function (err, res) {
//         if (err) throw err;
//         res.forEach(function (element) {
//             roleList.push(element.title);
//         });
//     });

//     connection.query("SELECT first_name, last_name FROM employees WHERE (employees.manager_id = 0)", function (err, res) {
//         if (err) throw err;
//         res.forEach(function (element) {
//             const managerString = element.first_name + " " + element.last_name;
//             managerList.push(managerString); 0
//         });
//     });

//     inquirer
//         .prompt([
//             {
//                 name: "firstName",
//                 type: "input",
//                 message: "What is the first name of the employee?",
//             },
//             {
//                 name: "lastName",
//                 type: "input",
//                 message: "What is the last name of the employee?",
//             },
//             {
//                 name: "selectRole",
//                 type: "list",
//                 message: "What is the employee role?",
//                 choices: roleList,
//             },
//             {
//                 name: "managerSelect",
//                 type: "list",
//                 message: "Who is the employee's manager?",
//                 choices: managerList,
//             },

//         ]).then connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, role, manager)", const NAMEARRAY = (first_name, last_name))

//             connection.query("Select name From Department", function (err, res) {
//                 if (err) throw err;

//             })
//     console.log("add employee")
// }

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
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}