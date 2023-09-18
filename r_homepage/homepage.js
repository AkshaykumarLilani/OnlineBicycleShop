const baseUrl = "https://bicycle-shop-json-server.cyclic.app";

function leftScroll() {
    const left = document.querySelector(".hom-4b");
    left.scrollBy(-200, 0);
}
function rightScroll() {
    const right = document.querySelector(".hom-4b");
    right.scrollBy(200, 0);
}
nav = document.getElementById("navbar_import");
footer = document.getElementById("footer_import");

fetch("navbar.html").then((res) => res.text()).then((data) => nav.innerHTML = data);
// fetch("footer.html").then((res) => res.text()).then((data) => footer.innerHTML = data);

async function homeToItemPage(event, index) {
    console.log({ event, index });
    try {
        const response = await fetch(baseUrl + "/bikes/?id=" + index);
        const json = await response.json();
        console.log({ json });
        if (json.length > 0){
            localStorage.setItem("item-page-data", JSON.stringify(json[0]));
            window.location.assign("/Pages/ItemPage/index.html");
        }
    } catch (err) {
        console.error({ "homeToItemPage": err });
    }
}