import { getExistingCart, removeCart } from "./storage.js";

export function renderCart() {
    // Her er feilen, function blir kalt fra removeCart() men getExistingCart var utenfor.
    const shoppingCart = getExistingCart();
    const container = document.querySelector(".product-container");

    if (shoppingCart.length === 0) {
        container.innerHTML = `<p>No items in cart</p>`;
    } else {
        shoppingCart.forEach((product) => {
            container.innerHTML += `
    <div>
    <span>${product.name}</span>
    <span>${product.price}</span>
    <button class="btn-danger" data-id="${product.id}">Remove</button>
    </div>
    `;
        });
    }
}
renderCart();


const removeBtn = document.querySelectorAll(".btn-danger");

removeBtn.forEach((button) => {

    button.addEventListener("click", removeCart);
});
