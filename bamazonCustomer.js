var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "BobbyBooks7569",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId + "\r\n");
  start();
});

function start() {
  // "home page" function that lists items available for sale, asks customer for ID# of the item they'd like to purchase,
  // followed by a prompt for the quantity they'd like to purchase.
  // If the entered quantity is available, update the database with the subtracted quantity of that item
  // and display the cost to the customer.
  // If the entered quantity is not available, display "Insufficient Quantity!"
}

function purchase() {
  // This function updates the database, subtracting the quantity purchased from the item specified.
}
