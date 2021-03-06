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
                "View All Employees by Role",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
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
                case "View All Employees by Role":
                    viewEmployeeRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Department":
                    addEmployeeDepartment();
                    break;
                case "Add Role":
                    addEmployeeRole();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
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
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res)
    })
    console.log("View Employee Role")
    start();
}

//add functions
function addEmployee() {
    const roleList = [];
    const managerList = ["No management"];

    connection.query("SELECT title FROM role", function (err, res) {
        if (err) throw err;
        res.forEach(function (element) {
            roleList.push(element.title);
        });
    });

    connection.query("SELECT first_name, last_name FROM employees WHERE (employees.manager_id = 0)", function (err, res) {
        if (err) throw err;
        res.forEach(function (element) {
            const managerString = element.first_name + " " + element.last_name;
            managerList.push(managerString); 0
        });
    });

    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the first name of the employee?",
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the last name of the employee?",
            },
            {
                name: "selectRole",
                type: "list",
                message: "What is the employee role?",
                choices: roleList,
            },
            {
                name: "managerSelect",
                type: "list",
                message: "Who is the employee's manager?",
                choices: managerList,
            },

        ])
        .then(function (answer) {
            function findRoleID() {
                for (var i = 0; i < roleList.length; i++) {
                    if (answer.selectRole === roleList[i]) {
                        return i + 1;
                    }
                }
            }
            const roleID = findRoleID();
        });

    connection.query("INSERT INTO employee SET ?",
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: roleID,
        },
        function (err) {
            if (err) throw err;
            console.log("Employee Added");
            start();
        })

    // console.log("add employee")
}

function addEmployeeDepartment() {
    console.log("Add Department")
    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "What is the new department?"
        },
    ]).then(function (res) {
        connection.query("INSERT INTO department SET ?", [{ department: res.deptName }]);
        start();
    })
}

function addEmployeeRole() {
    console.log("Add Role")
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
    })

    const deptName = res.map((dept) => dept.deptName);
    const deptList = res;

    inquirer.prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "What is the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the role salary?",
        },
        {
            type: "input",
            name: "roleDepartment",
            message: "Choose a department.",
            choices: deptName,
        },
    ])
    .then(function(answer) {
        const dept = deptList.find(
            (department) => department.deptName === answer.roleDepartment
        );
        connection.query("INSERT INTO role SET ?", [
            {
                title: answer.roleTitle,
                salary: answer.salary,
                dept_id: answer.id,
            }
        ]);
        start();
    })
}

function updateEmployeeRole() {
    connection.query("SELECT * FROM employee", function (err, res) {
        console.log(res);
        const names = res.map((name) => name.last_name);
        inquirer.prompt(
            {
                type: "list",
                name: "employeeName",
                message: "Who's role do you want to update?",
                choices: names,
            }
        ).then(function (answer) {
            let employeeChoiceID = res.find((lastName) => lastName.last_name === answer.employeeName
            );
            connection.query("SELECT * FROM role", function (err, response) {
                const updateRole = response.map((role) => role.title);

                inquirer.prompt(
                    {
                        type: "list",
                        name: "updateRole",
                        message: "What is the new role?",
                        choices: updateRole,
                    }
                ).then(function (choice) {
                    employeeChoiceID = employeeChoiceID.id;
                    let roleID = response.find(
                        (title) = title.title === choice.updateRole
                    );
                    roleID = roleID.id;
                    connection.query(
                        "UPDATE employee SET role_ID = ? WHERE id = ?",
                        [roleID, employeeChoiceID]
                    );
                    start();
                });
            });
        });
    });
    console.log("update employee role")
}

function updateEmployeeManager() {
    console.log("update employee manager")
    start();
}

function viewRoles() {
    console.log("View Roles")
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}