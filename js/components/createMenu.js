import { getUsername } from "../utils/storage.js";


export default function createMenu() {

    
    const container = document.querySelector(".menu-container");
    const { pathname } = document.location;
    const username = getUsername();
    
    
    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""} nav-link">Login</a>`;
    
    if (username) {

        authLink = `<a href="/" class="${pathname === "/" ? "active" : ""} nav-link">Logout</a> 
        </li>
        <li class="nav-item">
        <a href="add.html" class="${pathname === "/add.html" ? "active" : ""} nav-link">Add product</a>
        `;
        //Needs to add a logout confirmation to logout button, this needs to call the removeFromStorage()...
    };
    

    container.innerHTML = `
        <div class="container-fluid">
            <a href="index.html" class="navbar-brand">The shoe shop</a>
            <div class="nav-group">
                <a href="cart.html" class="navbar-item">
                    <i class="fas fa-shopping-cart fs-3 text-success position-relative">
                        <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger" style="font-size: .75rem;">1
                            <span class="visually-hidden">
                                unread messages
                            </span>
                        </span>
                    </i>
                </a>
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="navbar-nav me-auto mb-2 mb-md-2">
                        <li class="nav-item">
                            <a href="shop.html" class="${pathname === "/shop.html" ? "active" : ""} nav-link">Shop</a>
                        </li>
                        <li class="nav-item">
                            ${authLink}
                        </li>
                        <li class="nav-item">
                            <a href="cart.html" class="${pathname ===  "/cart.html" ? "active" : ""} nav-link">Shopping Cart</a>
                        </li>
                        <li class="nav-item">
                            <a href="customer-service.html" class="${pathname ===  "/customer-service.html" ? "active" : ""} nav-link">Customer Service</a>
                        </li>
                    </div>
                </div>
            </div>
        </div>

    `;


}