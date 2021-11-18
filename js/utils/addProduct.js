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
        const imageValue = image.value.trim(); //newline
    
        if (titleValue.length === 0 || priceValue === 0 || descriptionValue === 0) {
            return displayMessage("warning", "Please supply proper values", ".message-container");
        }

        addProduct(titleValue, priceValue, descriptionValue, imageValue); //newline

    };

    async function addProduct(title, price, description, image ) { //newline
        const url = baseUrl + "/products";
        const imgUrl = baseUrl + "/upload"; //newline

        const image_url = image.url;

        const data = JSON.stringify({ title: title, price: price, description: description, image_url: image }); //newline

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
            const response = await fetch(url && imgUrl, options); //newline
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



// Tester Upload file during entry creation fra strapi documentation
    
/* form.addEventListener('submit', (e) => {
  e.preventDefault();

  const request = new XMLHttpRequest();

  const formData = new FormData();

  const formElements = form.elements;

  const data = {};

  for (let i = 0; i < formElements.length; i++) {
    const currentElement = formElements[i];
    if (!['submit', 'file'].includes(currentElement.type)) {
      data[currentElement.title] = currentElement.value;
    } else if (currentElement.type === 'file') {
      for (let i = 0; i < currentElement.files.length; i++) {
        const file = currentElement.files[i];
        formData.append(`files.${currentElement.title}`, file, file.title);
      }
    }
  }

  formData.append('data', JSON.stringify(data));

  request.open('POST', `${baseUrl}/upload`);

  request.send(formData);
});
 */



}