import { categoryPageBicycleCard } from "../../components/categoryPageBicycleCard.js";
import { baseUrl } from "../../constants.js";
import { getSpinnerElement } from "../../components/spinner.js";
import { addFiltersToUI, filtersObj } from "./generateFilters.js";

let category = "";

let pageNumber = 1;

let sortObj = {
    _sort: "",
    _order: "asc",
}

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
    window.location.assign(window.location.href + "?category=active");
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
    // console.log(ele);
    ele.remove();
}

const removeExistingProducts = () => {
    let container = document.getElementById("category-products");
    if (container) container.innerHTML = null;
}

const fetchBicycleData = async (page) => {
    try {
        removeExistingProducts();
        removeExistingPagination();
        addSpinner("category-filters", "Filters");
        addSpinner("category-products-and-pagination", "Products");
        let url = baseUrl + "/bikes" + "?_page=" + page + "&_limit=12" + "&category=" + category;

        if (sortObj._sort) {
            url += `&_sort=${sortObj._sort}&_order=${sortObj._order}`;
        }
        
        if (Array.isArrray(filtersObj.filters)){
          filtersObj.filters.forEach((fo)=>{
            if(fo.field && fo.value) url += `&${fo.field}=${fo.value}`;
          });
        }

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

const removeExistingPagination = () => {
    let paginationWrapper = document.querySelector("#category-products-pagination-wrapper");
    if (paginationWrapper){
        paginationWrapper.innerHTML = null;
    }
}

const addPagination = (totalCount) => {
    removeExistingPagination();
    let paginationWrapper = document.querySelector("#category-products-pagination-wrapper");
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
setTimeout(() => {
    fetchBicycleData(1);
}, 500);

const sortEvent = (event) => {
    let value = event.target.value;
    console.log({ event, value });
    if (value === "phl") {
        sortObj._sort = "price";
        sortObj._order = "desc";
    } else if (value === "plh") {
        sortObj._sort = "price";
        sortObj._order = "asc";
    } else if (value === "tasc") {
        sortObj._sort = "title";
        sortObj._order = "asc";
    } else if (value === "tdsc") {
        sortObj._sort = "title";
        sortObj._order = "desc";
    } else if (value === "select") {
        sortObj._sort = "";
    }
    fetchBicycleData(1);
}

let sortSelect = document.getElementById("products-sort-by");
console.log(sortSelect)
sortSelect.addEventListener("change", sortEvent);