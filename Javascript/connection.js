var mysql = require("mysql");
var inquirer = require("inquirer");


// ESTABLISHING CONNECTION TO DATABASE
// ---------------------------------------------------------------------------------------------------
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
})

connection.connect(function(err, response) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("\nconnected as id " + connection.threadId);
        console.log("============================================")
        start();
    }
})
// ===================================================================================================
 
// INITIAL STARTUP FUNCTION THAT PROVIDES THE USER WITH OPTIONS. WHICH OPTION THE USER CHOOSES WILL DETERMINE WHICH FUNCTION IS TO BE RUN
var start = () => {
    console.log("\n----------------------------------------------")
    inquirer.prompt(
        {
            type: "list",
            name: "managerChoices",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory", 
                "Add to Inventory", 
                "Add New Product",
                "Exit"
            ]
        })
        .then(function(answer) {
                // SWITCH STATEMENT THAT WILL DECIDE WHICH FUNCTION TO RUN
                switch(answer.managerChoices) {
                    case "View Products for Sale":
                        viewProductsForSale();
                        break;
                
                    case "View Low Inventory":
                        viewLowInventory();
                        break;

                    case "Add to Inventory":
                        addToInventory();
                        break;
                    
                    case "Add New Product":
                        addNewProduct();
                        break;

                    case "Exit":
                        connection.end();
                        break;
                }
        })
}
// ===================================================================================================

// FUNCTIONS
// ---------------------------------------------------------------------------------------------------

// FUNCTION THAT DISPLAYS WHOLE TABLE
var viewProductsForSale = () => {
    var query = "SELECT * FROM bamazon.products";
    connection.query(query, function(err, response) {
        console.log("\nid | Product | Department | Price | Stock")
        console.log("-------------------------------------------")
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].item_id + " | " + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity)
        }
        start();
    })
}

// FUNCTION THAT DISPLAYS INVENTORY WITH A QUANTITY LESS THAN 5
var viewLowInventory = () => {
    var query = "SELECT * FROM bamazon.products WHERE stock_quantity < 5";
    connection.query(query, function(err, response) {
        console.log("\nid | Product | Department | Price | Stock" );
        console.log("-------------------------------------------")
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].item_id + " | " + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity)
        }
        start();
    })
}

// FUNCTION THAT ALLOWS USER TO ADD INVENTORY TO A PRODUCT
var addToInventory = () => {
    console.log("----------------------------------------------")
    var query = "SELECT * FROM bamazon.products";
    connection.query(query, function(err, response){
        if (err) throw err;
        inquirer.prompt([
            {
                name: "product_name",
                type: "rawlist",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < response.length; i++) {
                      choiceArray.push(response[i].product_name);
                    }
                    return choiceArray;
                  },
                message: "Which product would you like to add inventory to?"
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "How much inventory would you like to add?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
            }
        ]).then(function(answer){
                var chosenItem;
                for (var i = 0; i < response.length; i++) {
                if (response[i].product_name === answer.product_name) {
                    chosenItem = response[i];
                    }
                }

                var oldStock = chosenItem.stock_quantity;
                var addedStock = parseInt(answer.stock_quantity);
                var newStock = oldStock + addedStock;
                console.log("New Stock: " + newStock);
                var query = "UPDATE bamazon.products SET stock_quantity = " + newStock + " WHERE product_name = " + "'" + answer.product_name + "'" + ";";

                connection.query(query, function(err){
                    if (err) throw err;
                    console.log("----------------------------------------------")
                    console.log("You added " + answer.stock_quantity + " to " + answer.product_name + ".");
                    console.log("New stock quantity for " + answer.product_name + ": " + newStock);
                    start();
                })
            })
        })
}

// FUNCTION THAT ALLOWS USER TO ADD A WHOLE NEW PRODUCT TO THE DB
var addNewProduct = () => {
    inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message: "Product Name: "
        },
        {
            name: "department_name",
            type: "input",
            message: "Department: "
        },
        {
            name: "price",
            type: "input",
            message: "Price: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                  console.log("Must be a number")
                }
                return false;
              }
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "Stock Quantity: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                  console.log("Must be a number")
                }
                return false;
              }
        }
    ]).then(function(answer) {
        var query = "INSERT INTO products SET ?";
        connection.query(query, {
            product_name: answer.product_name,
            department_name: answer.department_name,
            price: answer.price || 0,
            stock_quantity: answer.stock_quantity || 0
          },
          function(err) {
            if (err) throw err;
            console.log("----------------------------------------------")
            console.log("You added: " + answer.product_name);
            start();
          })
        })
}