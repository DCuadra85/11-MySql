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
                    songSearch();
                    break;
                case "Remove Employee":
                    songAndAlbumSearch();
                    break;
                case "Update Employee Role":
                    songAndAlbumSearch();
                    break;
                case "Update Employee Manager":
                    songAndAlbumSearch();
                    break;
                case "View All Roles":
                    songAndAlbumSearch();
                    break;

            }
        });
}
