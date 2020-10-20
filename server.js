var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 8080,

  // username
  user: "root",

  // password
  password: "password",
  database: "human_resourcesDB"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});