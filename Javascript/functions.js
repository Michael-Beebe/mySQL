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
var addInventory = () => {

}

// TODO: GIVES OPTION TO ADD A NEW PRODUCT
var addNewProduct = () => {

}

// TODO: DISPLAYS NEW INVENTORY AFTER USER ADDS A PRODUCT TO THE TABLE
var displayNewInventory = () => {

}