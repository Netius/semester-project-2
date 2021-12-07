import { getUsername, removeFromStorage } from "../utils/storage.js";

const username = getUsername();

export function loggedIn() {
    if (username) {
        document.querySelector("#logoutBtn").className = "nav-item";
    } else {
        document.querySelector("#logoutBtn").className = "nav-item d-none";
    }

    document.querySelector("#logoutBtn").addEventListener("click", removeFromStorage);   
}

