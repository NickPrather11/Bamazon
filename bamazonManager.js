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
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What action would you like to perform?",
      choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products":
          viewProducts();
          break;
        case "View Low Inventory":
          viewLowInv();
          break;
        case "Add to Inventory":
          addInv();
          break;
        case "Add New Product":
          addProduct();
          break;
      }
    });
}

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) console.log(err);

    for (i = 0; i < results.length; i++) {
      console.log("\r\nItem ID #: " + results[i].item_id);
      console.log("Item: " + results[i].product_name);
      console.log("Department: " + results[i].department_name);
      console.log("Price: $" + results[i].price);
      console.log("In Stock: " + results[i].stock_quantity + "\r\n");
    }
    continueQ();
  });
}

function viewLowInv() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) console.log(err);

    for (i = 0; i < results.length; i++) {
      if (results[i].stock_quantity < 5) {
        console.log("\r\nItem ID #: " + results[i].item_id);
        console.log("Item: " + results[i].product_name);
        console.log("Department: " + results[i].department_name);
        console.log("Price: $" + results[i].price);
        console.log("In Stock: " + results[i].stock_quantity + "\r\n");
      }
    }
    continueQ();
  });
}

function addInv() {
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
          name: "stockItem",
          message: "Enter the Item ID # for the item you would like to stock: "
        },
        {
          name: "stockAdd",
          message: "How many units would you like to add to stock? "
        }
      ])
      .then(function(answer) {
        console.log("\r\nUpdating stock for Item ID # " + answer.stockItem + "...\r\n");
        for (i = 0; i < results.length; i++) {
          if (results[i].item_id === parseInt(answer.stockItem)) {
            var oldStock = results[i].stock_quantity,
              addStock = parseInt(answer.stockAdd),
              newStock = oldStock + addStock;
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: newStock
                },
                {
                  item_id: answer.stockItem
                }
              ],
              function(err) {
                if (err) console.log(err);
                console.log("\r\nStock added succesfully!\r\n");
                continueQ();
              }
            );
          }
        }
      });
  });
}

function addProduct() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "What is the name of the item? "
      },
      {
        name: "categ",
        message: "What is the item's category? "
      },
      {
        name: "price",
        message: "What is the price? "
      },
      {
        name: "quant",
        message: "How many are you adding to stock? "
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.name,
          department_name: answer.categ,
          price: answer.price,
          stock_quantity: answer.quant
        },
        function(err) {
          if (err) throw err;
          console.log("\r\nYour item was added successfully!\r\n");
          // re-prompt the user for if they want to bid or post
          continueQ();
        }
      );
    });
}

function continueQ() {
  inquirer
    .prompt({
      name: "continue",
      type: "confirm",
      message: "Would you like to continue?"
    })
    .then(function(answer) {
      if (answer.continue === true) start();
      else {
        console.log("\r\nGoodbye!");
        connection.end();
      }
    });
}
