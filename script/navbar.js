import { baseUrl } from "/constants.js";

import footer1 from "/components/footer.js"
let footerContainer = document.getElementById('mainFooter');
footerContainer.innerHTML = footer1();

import header1 from "/components/header.js"
let headerContainer = document.getElementById("header1");
headerContainer.innerHTML = header1();

import topSection from "/components/top.js"
let topContainer = document.getElementById("top1");
topContainer.innerHTML = topSection();

function showMobileNav() {
    let open_burger = document.getElementById("open-burger");
    let close_burger = document.getElementById("close-burger");

    let mobile_navbar = document.getElementById("mobile-nav-burger");

    open_burger.style.display = "none";
    close_burger.style.display = "block";
    mobile_navbar.style.display = "flex";
}

function hideMobileNav() {
    let open_burger = document.getElementById("open-burger");
    let close_burger = document.getElementById("close-burger");

    let mobile_navbar = document.getElementById("mobile-nav-burger");

    open_burger.style.display = "block";
    close_burger.style.display = "none";
    mobile_navbar.style.display = "none";
}

function showDataInUI(json, message) {
    let desktopSearchResults = document.getElementById("desktop-search-results");
    if (desktopSearchResults) {
        desktopSearchResults.style.display = "block";
        desktopSearchResults.innerHTML = null;
        if (json && Array.isArray(json) && json.length > 0) {
            json.forEach(jd => {
                let div = document.createElement("div");
                div.classList.add("search-result-container");

                let p = document.createElement("p");
                p.innerText = jd.title;
                p.addEventListener("click", () => {
                    localStorage.setItem("item-page-data", JSON.stringify(jd));
                    window.location.assign("/Pages/ItemPage/index.html");
                });
                div.append(p);
                desktopSearchResults.append(div);
            });
        } else {
            if (json && Array.isArray(json) && json.length === 0) {
                desktopSearchResults.innerHTML = null;
                if (!message) {
                    message = "0 results found!"
                }
                desktopSearchResults.innerHTML = `
                    <div class="search-result-container">
                        <p>${message}</p>
                    </div>
                    `;
            }
        }
    }
}

function hideDesktopSearchResults() {
    let desktopSearchResults = document.getElementById("desktop-search-results");
    if (desktopSearchResults) {
        desktopSearchResults.innerHTML = null;
        desktopSearchResults.style.display = "none";
    }
}

async function search(event) {
    let searchTerm = event.target.value;
    console.log({ searchTerm });
    if (searchTerm) {
        try {
            const response = await fetch(baseUrl + "/bikes?q=" + searchTerm + "&_limit=5");
            const json = await response.json();
            console.log({ json });
            showDataInUI(json);
        } catch (err) {
            console.log(err);
            showDataInUI([], "Something went wrong!");
        }
    } else {
        hideDesktopSearchResults();
    }
}

function getDebounce(func, delay) {
    let timer;

    return function (event) {
        clearTimeout(timer);
        timer = setTimeout(() => func(event), delay);
    };
}

const debounceSearch = getDebounce(search, 300);

let desktopSearchInput = document.getElementById("desktop-search-input");
if (desktopSearchInput) {
    desktopSearchInput.addEventListener("input", debounceSearch);
}
let mobileSearchInput = document.getElementById("mobile-search-input");
if (mobileSearchInput) {
    mobileSearchInput.addEventListener("input", debounceSearch);
}
window.addEventListener("scroll", ()=>{
    hideDesktopSearchResults();
});