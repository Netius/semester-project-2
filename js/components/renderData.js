import { baseUrl } from "../settings/api.js";

export function renderData(dataToRender) {
    const container = document.querySelector(".product-container");

    container.innerHTML = "";
    
    dataToRender.forEach(function (product) {
        container.innerHTML += `
        <div class="card mt-3 mx-auto" style="width: 18rem;">
            <a href="products.html?id=${product.id}&${product.title}" class="text-decoration-none text-dark">
            <img src="${baseUrl}${product.image.url}" alt="Picture of ${product.title}" class="card-img-top">
                <div class="card-body">
                    <h4 class="card-title text-start">${product.title}</h4>
                    <div class="d-flex justify-content-between">
                        <h5 class="card-text text-start fs-1" id="price">${product.price},-</h5>
                        <span class="card-text text-end text-success fs-1"><i class="fas fa-cart-plus"></i></span>
                    </div>
                </div>
            </a>
        </div>`;

    });
}