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
        start();
    }
})
// ===================================================================================================

// INITIAL STARTUP FUNCTION THAT PROVIDES THE USER WITH OPTIONS. WHICH OPTION THE USER CHOOSES WILL DETERMINE WHICH FUNCTION IS TO BE RUN
// FIXME: WHEN THIS FUNCTIONS RUN IT ERASES THE BOTTOM LINE IN THE OUTPUT OF THE PREVIOUSLY RUN FUNCTION
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
                        exit();
                        break;
                }
        })
}
// ===================================================================================================

// FUNCTIONS
// ---------------------------------------------------------------------------------------------------

// FUNCTION THAT DISPLAYS WHOLE TABLE
var viewProductsForSale = () => {
    var selectAllProducts = "SELECT * FROM bamazon.products";
    connection.query(selectAllProducts, function(err, response) {
        console.log("\nid | Product | Department | Price | Stock")
        console.log("-------------------------------------------")
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].item_id + " | " + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity)
        }
        console.log("\n============================================\n");
    })
    start();
}

// FUNCTION THAT DISPLAYS INVENTORY WITH A QUANTITY LESS THAN 5
var viewLowInventory = () => {
    var selectLowInventory = "SELECT * FROM bamazon.products WHERE stock_quantity < 5"
    connection.query(selectLowInventory, function(err, response) {
        console.log("\nid | Product | Department | Price | Stock" );
        console.log("-------------------------------------------")
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].item_id + " | " + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity)
        }
        console.log("\n============================================\n");
    })
    start();
}

// TODO: FUNCTION THAT ALLOWS USER TO ADD INVENTORY TO A PRODUCT
var addToInventory = () => {
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
            message: "Price: "
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "Stock Quantity: "
        }
    ])
}

// TODO: FUNCTION THAT ALLOWS USER TO ADD A WHOLE NEW PROJECT TO THE DB

// TODO: EXIT FUNCTION