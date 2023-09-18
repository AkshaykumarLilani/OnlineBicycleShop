function showMobileNav(){
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