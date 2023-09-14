import { categoryPageBicycleCard } from "../../components/categoryPageBicycleCard.js";
import { baseUrl } from "../../constants.js";

let category = "";

let pageNumber = 1;

const getSearchParams = () => {
    let obj = {};

    if (window.location.search) {
        let search = window.location.search;
        if (search.includes("?")) {
            search = search.replaceAll("?", "");
            search = search.split("&");
            if (search.length > 0) {
                search.forEach((s) => {
                    let keyValue = s.split("=");
                    if (keyValue.length === 2) {
                        obj[keyValue[0]] = keyValue[1];
                    }
                });
            }
        }
    }
    return obj;
}

const searchParams = getSearchParams();
console.log({ searchParams });

if (searchParams.category) {
    category = searchParams.category;
} else {
    window.location.assign(window.location.href + "?category=mountain");
}

console.log({ category });

if (category) {
    let categoryTitleHTMLElement = document.querySelector("#category-title");
    let htmlHeadTitleElement = document.querySelector("title");
    if (categoryTitleHTMLElement) {
        categoryTitleHTMLElement.innerText = category;
    }
    if (htmlHeadTitleElement){
        htmlHeadTitleElement.innerText = category[0].toUpperCase() + category.slice(1) + " Bicycles";
    }
}

const generateFilter = () => {

}

const fetchBicycleData = async (page) => {
    try {
        const url = baseUrl + "/bikes" + "?_page=" + page + "&_limit=12" + "&category=" + category;
        const response = await fetch(url);
        const json = await response.json();
        console.log({ json });
        appendDataToUI(json);
    } catch (error) {
        console.error({ "fetchBicycleData Error": error });
    }
}

const appendDataToUI = (data) => {
    let container = document.getElementById("category-products");
    if (container) {
        data.forEach((d) => {
            container.append(categoryPageBicycleCard(d));
        });
    }
}

fetchBicycleData(1);