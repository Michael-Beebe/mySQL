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
            },
        ])
        // ****** IF STATEMENTS THAT RUN THE FUNCTION THAT THE USER CHOOSES ********
        // FIXME: make it so when node runs one command it allows the user to run another command
        .then(function(user){
            if (user.managerChoices === "View Products for Sale") {
                displayTable();
            }
            if (user.managerChoices === "View Low Inventory") {
                displayLowInventory();
            }
            if (user.managerChoices === "Add to Inventory") {
                displayProductList();
                inquirer.prompt([
                    {
                        type: "list",
                        name: "product list",
                        // FIXME: THIS NEEDS TO GIVE A LIST OF THE PRODUCTS
                        choices: [productList],
                        message: "Which product would you like to add inventory to?"
                    }
                ])
                addInventory();
                displayNewInventory();
            }
            if (user.managerChoices === "Add New Product") {
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
                addNewProduct();
                displayNewInventory();
            }
        });
    }
  });

// ========================================================================
// QUERIES
// -------------------------------------------------------------------------------------------------

// TODO: store user inputs into this variable to add values to the SQL query
var insertInto = "INSERT INTO bamazon.products" ;

// FUNCTIONS
// -------------------------------------------------------------------------------------------------
// DISPLAYS ALL PRODUCTS
var selectAllProducts = "SELECT * FROM bamazon.products";
var array = [];
var displayTable = () => {
    connection.query(selectAllProducts, function(err, response) {
        console.log("\nid | Product | Department | Price | Stock" )
        console.log("-------------------------------------------")
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].item_id + " | " + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity)        }
            console.log("\n============================================\n");
    })
}

// DISPLAYS PRODUCTS WITH STOCK LESS THAN 5
var selectLowInventory = "SELECT * FROM bamazon.products WHERE stock_quantity < 5";
var displayLowInventory = () => {
    connection.query(selectLowInventory, function(err, response) {
        console.log("\nid | Product | Department | Price | Stock" );
        console.log("-------------------------------------------")
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].item_id + " | " + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity)
        }
        console.log("\n============================================\n");
    })
}

// TODO: DISPLAY PRODUCT LIST
var selectProductNames = "SELECT product_name FROM bamazon.products";
var productList = [];
var displayProductList = () => {
    connection.query(selectProductNames, function(err, response) {
        for (var i = 0; i < response.length; i++) {
            // console.log(response[i]);
            productList[i] = response[i].product_name;
        }
        for (var j = 0; j < productList.length; j++) {
            // console.log(productList[j]);
        }
        console.log("\n============================================\n");
    })
}

// TODO: GIVES OPTION TO ADD STOCK TO A PRODUCT
var addInventory = () => {
    
}

// TODO: DISPLAYS NEW INVENTORY AFTER USER ADDS A PRODUCT TO THE TABLE
var displayNewInventory = () => {

}

// TODO: GIVES OPTION TO ADD A NEW PRODUCT
var addNewProduct = () => {

}