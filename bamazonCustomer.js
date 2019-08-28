var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  // "home page" function that lists items available for sale, asks customer for ID# of the item they'd like to purchase,
  // followed by a prompt for the quantity they'd like to purchase.
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) console.log(err);

    for (i = 0; i < results.length; i++) {
      console.log("\r\nItem ID #: " + results[i].item_id);
      console.log("Item: " + results[i].product_name);
      console.log("Department: " + results[i].department_name);
      console.log("Price: $" + results[i].price);
      console.log("In Stock: " + results[i].stock_quantity + "\r\n");
    }
    inquirer
      .prompt([
        {
          name: "id",
          message: "Please enter the ID of the item you would like to purchase"
        },
        {
          name: "quantity",
          message: "How many would you like to buy?"
        }
      ])
      .then(function(answer) {
        var newQuantity, price;

        for (i = 0; i < results.length; i++) {
          var num = parseInt(answer.quantity);
          var stock = parseInt(results[i].stock_quantity);
          if (results[i].item_id === parseInt(answer.id)) {
            if (stock > num) {
              price = results[i].price * num;
              newQuantity = stock - num;
              console.log("\r\nChecking Stock... \r\n");
              purchase(answer.id, newQuantity, price);
              break;
            } else {
              console.log("\r\nWe don't have that much in stock!\r\n");
              continueQ();
              break;
            }
          }
        }
      });
  });
}

// function update the table
function purchase(id, newQuantity, price) {
  connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newQuantity }, { item_id: id }], function(err) {
    if (err) throw err;
    console.log("\r\nYour total is $" + price + "\r\n");
    // check to see if they want to continue
    continueQ();
  });
}

function continueQ() {
  inquirer
    .prompt({
      name: "continue",
      type: "confirm",
      message: "Would you like to continue shopping?"
    })
    .then(function(answer) {
      if (answer.continue === true) start();
      else {
        console.log("\r\nGoodbye!");
        connection.end();
      }
    });
}
