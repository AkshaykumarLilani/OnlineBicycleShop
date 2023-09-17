export const categoryPageBicycleCard = function (data) {
    let parentDiv = document.createElement("div");
    parentDiv.classList.add("category-page-bicycle-card");

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("bicycle-image-container");
    imgContainer.classList.add("cursor-pointer");
    let img = document.createElement("img");
    img.src = data.large_img;
    img.classList.add("w-100");
    imgContainer.append(img);
    imgContainer.addEventListener("click", () => {
        localStorage.setItem("item-page-data", JSON.stringify(data));
        window.location.assign("/Pages/ItemPage/index.html");
    });
    parentDiv.append(imgContainer);

    let colorsContainer = document.createElement("div");
    colorsContainer.addEventListener("click", () => {
        localStorage.setItem("item-page-data", JSON.stringify(data));
        window.location.assign("/Pages/ItemPage/index.html");
    });
    colorsContainer.classList.add("bicycle-colors-container");
    if (data.frame_colors && Array.isArray(data.frame_colors) && data.frame_colors.length > 0) {
        data.frame_colors.forEach(d => {
            let color1 = document.createElement("div");
            color1.classList.add("bicycle-colors");
            color1.style.backgroundColor = d.toLowerCase();
            colorsContainer.append(color1);
        });
    }
    parentDiv.append(colorsContainer);

    let title = document.createElement("h3");
    title.innerText = data.title;
    title.classList.add("cursor-pointer");
    title.addEventListener("click", () => {
        localStorage.setItem("item-page-data", JSON.stringify(data));
        window.location.assign("/Pages/ItemPage/index.html");
    });
    parentDiv.append(title);

    let price = document.createElement("p");
    price.classList.add("bicycle-price")
    price.innerText = "₹ " + data.price;
    parentDiv.append(price);

    let addToCart = document.createElement("button");
    addToCart.classList.add("add-to-cart-button");
    if (isInCart(data)) {
        addToCart.innerText = "REMOVE FROM CART";
        addToCart.classList.add("background-red");
        addToCart.classList.remove("background-yellow");
    } else {
        addToCart.innerText = "ADD TO CART";
        addToCart.classList.add("background-yellow");
        addToCart.classList.remove("background-red");
    }
    addToCart.classList.add("cursor-pointer");
    addToCart.setAttribute("data-id", data.id);
    addToCart.addEventListener("click", (event) => {
        if (event.target.innerText === "ADD TO CART") {
            pushToCart(data);
            let thisB = document.querySelector("button[data-id='" + data.id + "']");
            if (thisB) {
                thisB.innerText = "REMOVE FROM CART";
                thisB.classList.remove("background-yellow");
                thisB.classList.add("background-red");
            }
        } else if (event.target.innerText === "REMOVE FROM CART"){
            removeFromCart(data);
            let thisB = document.querySelector("button[data-id='" + data.id + "']");
            if (thisB) {
                thisB.innerText = "ADD TO CART";
                thisB.classList.remove("background-red");
                thisB.classList.add("background-yellow");
            }
        }
    });
    parentDiv.append(addToCart);

    // let actionButtons = document.createElement("div");

    return parentDiv;
}

const isInCart = (data) => {
    let cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
        cartItems = JSON.parse(cartItems);
    }
    if (Array.isArray(cartItems) && cartItems.length > 0) {
        let filtered = cartItems.filter(f => f.id === data.id);
        if (filtered.length > 0) {
            return true;
        }
    }

    return false;
}

const pushToCart = (data) => {
    let cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
        cartItems = JSON.parse(cartItems);
        cartItems.push(data);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
        localStorage.setItem("cartItems", JSON.stringify([data]));
    }
}

const removeFromCart = (data) => {
    let cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
        cartItems = JSON.parse(cartItems);
        cartItems = cartItems.filter((d)=> !(d.id === data.id));
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
        // this should never happen
    }
}

/*
    Sample Data
    {
        "large_img": "https://i.ibb.co/bLcS2ZZ/cycle.jpg",
        "img2": "https://m.media-amazon.com/images/I/91yzwj5bjpL._SY355_.jpg",
        "img3": "https://m.media-amazon.com/images/I/81YJaUtm2fL._SY355_.jpg",
        "img4": "https://m.media-amazon.com/images/I/811GabfBunL._SY355_.jpg",
        "img5": "https://m.media-amazon.com/images/I/91dxKrTuQAL._SY355_.jpg",
        "title": "Lifelong Conqueror Freeride Shimano Gear Cycle",
        "frame_colors": [
            "red"
        ],
        "front_wheel": "Traversal SL 29",
        "rear_wheel": "TRAVERSE SL 29",
        "Front_tire": "back",
        "inner_tubes": "STANDARD, PRESTA VALVE",
        "front_Wheel": "BUTCHER GRID TRAIL T7 29 * 2.3",
        "description": "This Shimano 21 speed geared cycle comes with Disc Brakes and suspension for effortless Braking system built for your ease of use and maintenance, and excellent braking power. Specially designed to provide proper braking control on all terrains. The cycle has a sturdy and reliable steel frame that can brave rough riding conditions and terrains. The top-notch construction quality ensures that the bike has a long lifespan",
        "rating": 4,
        "size": "27.5T",
        "year": 4520,
        "price": 11520.00,
        "category": "active"
    }
*/