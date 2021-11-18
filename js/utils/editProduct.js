import { baseUrl } from "../settings/api.js";
import { displayMessage } from "../components/displayMessage.js";
import { getToken } from "./storage.js";

const form = document.querySelector("form");
const message = document.querySelector(".message-container");
const idInput = document.querySelector("#id");


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
    const image = document.querySelector("#image");
    
    (async function () {
        try {
            const response = await fetch(productUrl);
            const details = await response.json();
    
            title.value = details.title;
            price.value = details.price;
            description.value = details.description;
            image.value = details.image.name;
            idInput.value = details.id;
    
            console.log(details);
            
        } catch (error) {
            console.log(error)
        } finally {
            loadingContainer.style.display = "none";
            productContainer.style.display = "block";
        }
    })();
    
}

export function submitEditForm() {
    form.addEventListener("submit", submitForm);

    function submitForm(event) {
        event.preventDefault();
    
        message.innerHTML = "";
    
        const titleValue = title.value.trim();
        const priceValue = parseFloat(price.value);
        const descriptionValue = description.value.trim();
        const idValue = idInput.value;
     
        if (titleValue.length === 0 || priceValue === 0 || descriptionValue === 0) {
            return displayMessage("warning", "Please supply proper values", ".message-container");
        }
    
        updateProduct(titleValue, priceValue, descriptionValue, idValue);
    
    }
}

async function updateProduct(title, price, description, id) {

    const url = baseUrl + "/products/" + id;
    const data = JSON.stringify({ title: title, price: price, description: description })

    const token = getToken();

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        
        if (json.updated_at) {
            displayMessage("success text-light text-center", "Product updated", ".message-container");
        }
        if (json.error) {
            displayMessage("danger", json.message , ".message-container");
        }

        console.log(json)
    } catch (error) {
        console.log(error)
    }
}