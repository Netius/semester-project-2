import { baseUrl } from "../settings/api.js";

export function renderData(dataToRender) {
    const container = document.querySelector("tbody");

    container.innerHTML = "";
    
    dataToRender.forEach(function (product) {
        container.innerHTML += `
        <tr>
        <th scope="row">${product.id}</th>
        <td>${product.title}</td>
        <td>${product.price},-</td>
        <td class="d-none d-md-block">${product.image.name}</td>
        <!-- Add deletebutton here -->
        `;

    });
}