import { categoryPageBicycleCard } from "../../components/categoryPageBicycleCard.js";
import { baseUrl } from "../../constants.js";
import { getSpinnerElement } from "../../components/spinner.js";
import { addFiltersToUI, filtersObj, showCurrentFilters } from "./generateFilters.js";
import { getSearchParams } from "../../script/getSearchParams.js";

let category = "";

let pageNumber = 1;
let perPageLimit = 12;

let sortObj = {
    _sort: "",
    _order: "asc",
}

const searchParams = getSearchParams();
console.log({ searchParams });

if (searchParams.category) {
    category = searchParams.category;
} else {
    window.location.assign(window.location.href + "?category=active");
}

console.log({ category });

function highlightNavbarElement(){
    let navbarElements = document.querySelectorAll("#navbar1>li");
    console.log({navbarElements});
    if (navbarElements && navbarElements.length > 0){
        for (const li of navbarElements){
            if (li.innerText.toLowerCase() === category.toLowerCase()){
                for (let a of li.childNodes){
                    a.classList.add("navbar-active");
                }
            }
        }
    }
}

highlightNavbarElement();   

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

const addSpinner = (id, text) => {
    removeNoProductsMessage();
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

export const fetchBicycleData = async (page, doNotRenderFilters) => {
    try {
        removeExistingProducts();
        removeExistingPagination();
        if (!doNotRenderFilters) addSpinner("category-filters", "Filters");
        showAppliedFilters();
        addSpinner("category-products-and-pagination", "Products");
        let url = baseUrl + "/bikes" + "?_page=" + page + "&_limit=" + perPageLimit + "&category=" + category;

        if (sortObj._sort) {
            url += `&_sort=${sortObj._sort}&_order=${sortObj._order}`;
        }

        if (Array.isArray(filtersObj.filters)) {
            filtersObj.filters.forEach((fo) => {
                if (fo.field && fo.value) url += `&${fo.field}_like=${fo.value}`;
            });
        }

        const response = await fetch(url);
        const totalCount = Number(response.headers.get("X-Total-Count"));
        const json = await response.json();
        console.log({ totalCount, json });

        if (json.length > 0) {
            removeNoProductsMessage();
            appendDataToUI(json);
            addPagination(totalCount);
        } else {
            showNoProductsAvailable();
        }
        if (!doNotRenderFilters) addFilters();
        showCurrentFilters()
    } catch (error) {
        console.error({ "fetchBicycleData Error": error });
    }
}

const showAppliedFilters = () => {
    let existingFilters = document.getElementById("current-filters");
    console.log({ existingFilters, filtersObj });
    existingFilters.innerHTML = null;
    if (filtersObj.filters.length > 0) {
        filtersObj.filters.forEach((f) => {
            let div = document.createElement("div");
            div.style.display = "flex";
            div.style.gap = "10px";
            div.style.alignItems = "center";

            let button = document.createElement("button");
            button.innerText = "x";
            button.style.backgroundColor = "transparent";
            button.style.color = "white";
            button.style.border = "none";
            button.style.fontSize = "24px";
            button.style.cursor = "pointer";
            button.style.fontWeight = "bold";
            button.addEventListener("click", ()=>{
                filtersObj.remove(f.field, f.value);
                if(f.field === "year"){
                    let checkbox = document.getElementById(f.value);
                    checkbox.checked = false;
                }
                fetchBicycleData(1, true);
            })
            div.append(button);

            let p = document.createElement("p");
            let x = {filter: "", value: f.value};
            if (f.field === "frame_colors"){
                x.filter = "color";
            } else {
                x.filter = f.field;
            }
            p.innerText = `${x.filter} : ${f.value}`;
            p.style.color = "white";
            p.style.fontSize = "16px";
            p.style.margin = "0px";
            div.append(p);

            existingFilters.append(div);
        });
    }
}

const appendDataToUI = (data) => {
    let container = document.getElementById("category-products");
    container.innerHTML = null;
    console.log({ data: data.length });
    if (data.length > 0) {
        data.forEach((d) => {
            container.append(categoryPageBicycleCard(d));
        });
    }
}

const showNoProductsAvailable = () => {
    removeSpinner("category-products-and-pagination");
    let container = document.getElementById("category-products-and-pagination");
    let ps = document.getElementsByClassName("no-products-message");
    if (ps.length === 0) {
        console.log("No Products Available", container);
        container.style.minHeight = "30vh";
        let p = document.createElement("p");
        p.className = "no-products-message";
        p.style.color = "white";
        p.style.textAlign = "center";
        p.innerText = "No Products Available for this filter";
        container.append(p);
    }
}

const removeNoProductsMessage = () => {
    let ps = document.getElementsByClassName("no-products-message");
    for (let p of ps) {
        p.remove();
    }
}

const removeExistingPagination = () => {
    let paginationWrapper = document.querySelector("#category-products-pagination-wrapper");
    if (paginationWrapper) {
        paginationWrapper.innerHTML = null;
    }
}

const addPagination = (totalCount) => {
    removeExistingPagination();
    let paginationWrapper = document.querySelector("#category-products-pagination-wrapper");
    let totalPages = Math.ceil(totalCount / perPageLimit);
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
}

const addFilters = () => {
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