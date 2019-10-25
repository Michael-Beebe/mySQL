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
        console.log("============================================\n")

        // INQUIRER CODE
        inquirer.prompt([
            {
                type: "list",
                name: "managerChoices",
                message: "What would you like to do?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            }
        ])
        // ****** IF STATEMENTS THAT RUN THE FUNCTION THAT THE USER CHOOSES ********

        // FIXME: all functions are running when user picks an option, need to add some validation to only run the function that the user selects
        .then(function(){
            if ("View Products for Sale") {
                viewProductsForSale();
            }
            if ("View Low Inventory") {
                viewLowInventory();
            }
            if ("Add to Inventory") {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "product",
                        message: "Product: "

                    },
                    {
                        type: "input",
                        name: "department",
                        message: "Department: "
                    },
                    {
                        type: "input",
                        name: "price",
                        message: "Price: "
                    },
                    {
                        type: "input",
                        name: "stock",
                        message: "Stock: "
                    }
                ])
            }
            if ("Add New Product") {
                addNewProduct();
            }
        });
    }
  });


// ========================================================================

// QUERIES
// -------------------------------------------------------------------------------------------------
var selectAllProducts = "SELECT * FROM bamazon.products";
var selectLowInventory = "SELECT * FROM bamazon.products WHERE stock_quantity < 5";
// TODO: store user inputs into this variable to add values to the SQL query
var insertInto = "INSERT INTO bamazon.products" ;
// FUNCTIONS
// -------------------------------------------------------------------------------------------------
// DISPLAYS ALL PRODUCTS
var viewProductsForSale = () => {
    connection.query(selectAllProducts, function(err, response) {
        console.log("\nid | Product | Department | Price | Stock" )
        console.log("-------------------------------------------")
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].item_id + " | " + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity)
        }
        console.log("\n============================================\n");
    })
}

// TODO: DISPLAYS PRODUCTS WITH STOCK LESS THAN 5
var viewLowInventory = () => {
    connection.query(selectLowInventory, function(err, response) {
        console.log("\nid | Product | Department | Price | Stock" );
        console.log("-------------------------------------------")
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].item_id + " | " + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity)
        }
        console.log("\n============================================\n");
    })
}

// TODO: GIVES OPTION TO ADD STOCK TO A PRODUCT
var addToInventory = () => {

}

// TODO: GIVES OPTION TO ADD A NEW PRODUCT
var addNewProduct = () => {

}