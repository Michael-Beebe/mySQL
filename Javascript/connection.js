var mysql = require("mysql");
var inquirer = require("inquirer");

// ESTABLISHING CONNECTION TO DATABASE
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
        queryAllProducts();
    }
  });
// ========================================================================

// queries stored in vars
var selectAllProducts = "SELECT * FROM bamazon.products"

// 
var queryAllProducts = () => {
    connection.query(selectAllProducts, function(err, response) {
        console.log("id | Product | Department | Price | Stock" )
        console.log("-------------------------------------------")
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].item_id + " | " + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity)
        }
        console.log("\n============================================\n");
    })
}

// inquirer code
inquirer.prompt([
    {
        type: "list",
        name: "managerChoices",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
]).then(function(){

});