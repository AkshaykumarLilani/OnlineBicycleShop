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
fetch("footer.html").then((res) => res.text()).then((data) => footer.innerHTML = data);
