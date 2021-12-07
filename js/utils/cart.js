import { getExistingCart } from "./storage.js";

const shoppingCart = getExistingCart()
const container = document.querySelector(".product-container");

shoppingCart.sort(function (a, b) {
    var nameA = a.name;
    var nameB = b.name;
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    return 0;
})

shoppingCart.forEach(element => {
    
});

console.log(shoppingCart)

shoppingCart.forEach(product => {
    container.innerHTML += `
    <div>
    <span>${product.name}</span>
    </div>
    `
});