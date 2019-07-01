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

// make a connection to the database and prompt the user
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  displayItems();
});


// start function
function start() {
  

  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the item_id of the item you would like to buy?",
      },

      {
        name: "amount",
        type: "input",
        message: "How many units would you like to purchase?"
      }
    ]
    )
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      var id = answer.id;
      var amount = answer.amount;
      update(id, amount);
      
      
    });
}

function displayItems() {
  console.log("\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function update(item, quanity){
  // console.log("In update()");
  // console.log(item);
  // console.log(quanity);
  connection.query("SELECT stock_quanity, price FROM products WHERE ?", {item_id: item}, function(err, res) {
    if (err) throw err;
    var product = res[0].stock_quanity;
    var price = res[0].price;
    // console.log(product);
    // console.log(price);
    
    if (quanity > product) {
      console.log("Insufficient Quanity Available, please pick another item");
      displayItems();
    }
    else {
      console.log("Your total is $" + (price * quanity));
      
      connection.query("UPDATE products SET ? WHERE ?", [{stock_quanity: (product - quanity)}, {item_id: item}], function(err, res) {
        if (err) throw err;
        
        inquirer
          .prompt({
            name: "choice",
            message: "Pick another item or quit?",
            type: "list",
            choices: ["Pick another item", "Quit"]
          }).then(function(answer) {
            if (answer.choice === "Pick another item"){
              displayItems();
            }
            else {
              connection.end();
            }
          })
      })
    }
  })
}