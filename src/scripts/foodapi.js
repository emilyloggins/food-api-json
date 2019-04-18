console.log("food API");

foodFactory = (foodItem, productInfo) => {
    return `<h2>${foodItem.name}</h2>
    <p>${productInfo.product.nutriments.sugars}</p>
    `;
};

addFoodToDom = (foodAsHTML) => {
    const el = document.querySelector("#container");
    el.innerHTML += foodAsHTML;
};
function getData() {
    fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food);
        fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
        .then(response => response.json())
        .then(productInfo => {
            food.ingredients = productInfo.product.ingredients;
            console.log(food.ingredients);
            const foodAsHTML = foodFactory(food, productInfo);


            addFoodToDom(foodAsHTML);
         });
    });
});
}
getData();