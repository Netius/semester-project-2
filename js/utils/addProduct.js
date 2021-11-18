import { baseUrl } from "../settings/api.js";
import { getToken } from "./storage.js";
import { displayMessage } from "../components/displayMessage.js";

const form = document.querySelector("form");
const message = document.querySelector(".message-container");


export function submitAddForm() {
    form.addEventListener("submit", submitForm);

    function submitForm(event) {
        event.preventDefault();

        message.innerHTML = "";

        const titleValue = title.value.trim();
        const priceValue = parseFloat(price.value);
        const descriptionValue = description.value.trim();
        const imageValue = image.value.trim(); 
    
        if (titleValue.length === 0 || priceValue === 0 || descriptionValue === 0) {
            return displayMessage("warning", "Please supply proper values", ".message-container");
        }

        addProduct(titleValue, priceValue, descriptionValue, imageValue);

    };

  
  
    async function addProduct(title, price, description, image ) {
        const url = baseUrl + "/products";

        const data = JSON.stringify({ title: title, price: price, description: description, image_url: image }); // adds the image to C:\fakepath\"filename..."

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
            const json = await response.json();

            if (json.created_at) {
                displayMessage("success text-light text-center", "Product added", ".message-container");
            }
            if (json.error) {
                displayMessage("danger", json.message , ".message-container");
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }

}