import { displayMessage } from "../components/displayMessage.js";
import { getToken } from "../utils/storage.js";
import { baseUrl } from "../settings/api.js";

const form = document.querySelector("form");
const title = document.querySelector("#productTitle");
const price = document.querySelector("#productPrice");
const description = document.querySelector("#productDescription");
const image = document.querySelector("#productImage");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imageValue = image.value.trim();

    if (titleValue.length === 0 || priceValue === 0 || descriptionValue === 0 || imageValue === 0) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    addProduct(titleValue, priceValue, descriptionValue, imageValue);

}

async function addProduct(title, price, description, image) {
    const url = baseUrl + "/products";

    const data = JSON.stringify({ title: title, price: price, description: description, image: image });

    const token = getToken();

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json;

        console.log(json)
    } catch (error) {
        console.log(error)
    }


}