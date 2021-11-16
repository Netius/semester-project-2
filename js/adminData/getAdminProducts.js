import { baseUrl } from "../settings/api.js";
import { renderData } from "./renderAdminData.js";

export function getData() {
    const productsUrl = baseUrl + "/products";

    (async function () {

        try {
            const response = await fetch(productsUrl);
            const products = await response.json();

            renderData(products);


        } catch (error) {
            console.log(error);
        }
    })();
}