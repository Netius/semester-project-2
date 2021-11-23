import { baseUrl } from "../settings/api.js";
import { getUsername } from "../utils/storage.js";


export function renderData(dataToRender) {
    const container = document.querySelector(".product-container");

    const username = getUsername();

    
    container.innerHTML = "";
    
    dataToRender.forEach(function (product) {
        
        let editBtn = `<a href="edit.html?id=${product.id}"><span class="card-text text-end text-primary fs-1"><i class="fas fa-tools"></i></span></a>`
    
        if (!username) {
            editBtn = "";
        }

        
        container.innerHTML += `
        <div class="card mt-3 mx-auto" style="width: 18rem;">
            <a href="products.html?id=${product.id}&${product.title}" class="text-decoration-none text-dark">
            <img src="${baseUrl}${product.image.url}" alt="Picture of ${product.title}" class="card-img-top">
                <div class="card-body">
                    <h4 class="card-title text-start">${product.title}</h4>
                    <div class="d-flex justify-content-between">
                        <h5 class="card-text text-start fs-1" id="price">${product.price},-</h5>
                        ${editBtn}
                        <span class="card-text text-end text-success fs-1"><i class="fas fa-cart-plus"></i></span>
                    </div>
                </div>
            </a>
        </div>`;

    });
}

export function renderDataInput() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const paramId = params.get("id");
    
    if (!id) {
        document.location.href = "/";
    }
    
    const productUrl = baseUrl + "/products/" + paramId;
    
    const productContainer = document.querySelector(".product-container");
    const loadingContainer = document.querySelector(".spinner-border")
    const title = document.querySelector("#title");
    const price = document.querySelector("#price");
    const description = document.querySelector("#description");
    const previewImg = document.querySelector("#prewImg");
    const featured = document.querySelector("#productFeature");
    const idInput = document.querySelector("#id");
    
    (async function () {
        try {
            const response = await fetch(productUrl);
            const details = await response.json();

            title.value = details.title;
            price.value = details.price;
            description.value = details.description;
            featured.value = details.feature;
            idInput.value = details.id;

             if (details.featured === true) {
                featured.checked = true;
            } else {
                featured.checked = false;
            } 
             
            previewImg.src = baseUrl + details.image.url;
    
            
        } catch (error) {
            console.log(error)
        } finally {
            loadingContainer.style.display = "none";
            productContainer.style.display = "block";
        }
    })();
    
}
