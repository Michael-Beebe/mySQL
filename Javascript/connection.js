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
var start = () => {
    console.log("----------------------------------------------")
    inquirer.prompt(
        {
            type: "list",
            name: "managerChoices",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory", 
                "Add to Inventory", 
                "Add New Product"
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
                }
        })
}

// ===================================================================================================

// FUNCTIONS
// ---------------------------------------------------------------------------------------------------

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

