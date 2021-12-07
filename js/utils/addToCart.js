import { getExistingCart, saveCart } from "./storage.js";
import { displayItemsInCart } from "../utils/displayCart.js"

export function addToCart() {
    const cartButtons = document.querySelectorAll(".addToCart");

    cartButtons.forEach((cart) => {
        cart.addEventListener("click", handleClick);
    });


    function handleClick() {
        console.log(event)
        const id = this.dataset.id;
        const name = this.dataset.name;
        let qty = 1;
        const currentCart = getExistingCart();
        const productExists = currentCart.find(cart => cart.id === id);

        const product = { id: id, name: name, qty: qty};
        currentCart.push(product);
        saveCart(currentCart);
        displayItemsInCart()
    }      
    displayItemsInCart()
};
