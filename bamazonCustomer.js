// load the inquirer npm package
var inquirer = require('inquirer');

// load the MySQL npm package
var mysql = require('mysql');

// create the mysql connection
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon"
  });