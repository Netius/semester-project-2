import { baseUrl } from "../settings/api.js";

const productContainer = document.querySelector(".product-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const paramId = params.get("id");
const productId = baseUrl + "/products/" + paramId;

async function getProduct() {
    try {
        const response = await fetch(productId);
        const product = await response.json();

        createHTML(product);
    } catch (error) {
        console.log(error);
    }
}

getProduct()

function createHTML(product) {
    console.log(product)

    productContainer.innerHTML = `
    <h2 class="display-5 fw-bold">${product.title}</h2>
    <img src="${baseUrl}${product.image.url}" alt="Picture of ${product.title}" class="card-img-top">
    <div class="card-body px-0 py-3">
        <p class="">${product.description}</p>
        <h5 class="card-text text-start fs-1 mb-4" id="price">${product.price},-</h5>
        <span class="card-text text-end text-white fs-5 align-self-center bg-success rounded-pill px-4 py-2"><i class="fas fa-cart-plus pe-3"></i>Add to cart</span>
    </div>

    `
}