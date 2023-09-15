import { categoryPageBicycleCard } from "../../components/categoryPageBicycleCard.js";
import { baseUrl } from "../../constants.js";
import { getSpinnerElement } from "../../components/spinner.js";
import { addFiltersToUI } from "./generateFilters.js";

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
    if (htmlHeadTitleElement) {
        htmlHeadTitleElement.innerText = category[0].toUpperCase() + category.slice(1) + " Bicycles";
    }
}

const generateFilter = () => {

}

const addSpinner = (id, text) => {
    let filtersElSpinner = document.getElementById(id + "-spinner");
    if (!filtersElSpinner) {
        let filtersEl = document.getElementById(id);
        if (filtersEl) {
            filtersEl.append(getSpinnerElement("yellow", id + "-spinner", `Loading ${text}...`));
        }
    }
}

const removeSpinner = (containerId) => {
    let ele = document.getElementById(containerId + "-spinner");
    console.log(ele);
    ele.remove();
}

const fetchBicycleData = async (page) => {
    try {
        addSpinner("category-filters", "Filters");
        addSpinner("category-products-and-pagination", "Products");
        const url = baseUrl + "/bikes" + "?_page=" + page + "&_limit=12" + "&category=" + category;
        const response = await fetch(url);
        const totalCount = Number(response.headers.get("X-Total-Count"));
        const json = await response.json();
        console.log({ totalCount, json });

        appendDataToUI(json);
        addPagination(totalCount);
    } catch (error) {
        console.error({ "fetchBicycleData Error": error });
    }
}

const appendDataToUI = (data) => {
    let container = document.getElementById("category-products");
    container.innerHTML = null;
    if (container) {
        data.forEach((d) => {
            container.append(categoryPageBicycleCard(d));
        });
    }
}

const addPagination = (totalCount) => {
    let paginationWrapper = document.querySelector("#category-products-pagination-wrapper");
    paginationWrapper.innerHTML = null;
    let totalPages = Math.ceil(totalCount / 12);
    for (let i = 0; i < totalPages; i++) {
        let div = document.createElement("div");
        div.className = "pagination-page";
        if (pageNumber === i + 1) {
            div.classList.add("active");
        }
        div.innerText = i + 1;
        div.addEventListener("click", (event) => {
            pageNumber = i + 1;
            fetchBicycleData(pageNumber);
        })
        paginationWrapper.append(div);
    }
    scrollUpToTop();
    removeSpinner("category-products-and-pagination");
    try {
        addFiltersToUI();
        removeSpinner("category-filters");
    } catch (err) {
        console.log("Error while adding filters to UI", err);
    }
}

const scrollUpToTop = () => {
    let top = document.documentElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}

addSpinner("category-filters", "Filters");
addSpinner("category-products-and-pagination", "Products");
setTimeout(()=>{
    fetchBicycleData(1);
}, 500);