import { getData } from "./components/getProducts.js";
import { searchData } from "./utils/productSearch.js";
import createMenu from "./components/createMenu.js";

createMenu();


getData();
searchData();