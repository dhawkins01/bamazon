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

// make a connection to the database and display the menu
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    displayMenu();
  });

// main menu
  function displayMenu() {
      console.log("///////////////***Welcome to the Bamzon Manager Dashboard***///////////////");
      inquirer
        .prompt(
            {
                name: "choice",
                type: "list",
                message: "What would you like to do?",
                choices: ["View products for sale", "View low inventory", "Add stock to current inventory", "Add a new product", "Exit"]
            }
        )
        .then(function(answer) {
            switch(answer.choice) {
                case "View products for sale":
                    console.log("test: view products");
                    viewProducts();
                    break;
                case "View low inventory":
                    console.log("test: low inventory");
                    lowInventory();
                    break;
                case "Add stock to current inventory":
                    console.log("test: add stock");
                    displayMenu();
                    break;
                case "Add a new product":
                    console.log("test: add new product");
                    displayMenu();
                    break;
                case "Exit":
                    console.log("test: exiting...");
                    connection.end();
                    break;
            }
        })
  } // end of displayMenu()

  function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        displayMenu();
      });
  } // end of viewProducts()

  function lowInventory() {
      
      // query the database to find all items with low stock
      connection.query("SELECT product_name, stock_quanity FROM products", function(err, res) {
          if (err) throw err;
          //console.log(res);
          for (i = 0; i < res.length; i++) {
              if (res[i].stock_quanity < 10) {
                  console.log("Item : " + res[i].product_name + " | Stock Left: " + res[i].stock_quanity + "\n");
              }
          }
          displayMenu();
          
      })
  }



