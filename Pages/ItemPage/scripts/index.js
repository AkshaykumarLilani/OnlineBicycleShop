//TODO temporary data
const bike = {
  large_img: "https://m.media-amazon.com/images/I/61BHUGgu62L._SY355_.jpg",
  img2: "https://m.media-amazon.com/images/I/61Q4ioZf00L._SY355_.jpg",
  img3: "https://m.media-amazon.com/images/I/61Z-RxhIsEL._SY355_.jpg",
  img4: "https://m.media-amazon.com/images/I/51R3CK0PaZL._SY355_.jpg",
  img5: "https://m.media-amazon.com/images/I/5143C+uCBwL._SS75_.jpg",
  title: "Urban Terrain UT3012S27.5, Steel MTB 27.5 Mountain Cycle",
  frame_colors: ["Green", "white"],
  front_wheel: "Traversal SL 29",
  rear_wheel: "TRAVERSE SL 29",
  Front_tire: "back",
  inner_tubes: "STANDARD, PRESTA VALVE",
  front_Wheel: "BUTCHER GRID TRAIL T7 29 * 2.3",
  description:
    "The Shimano derailleurs and shifters are made with Japanese technology for a seamless gear shifting experience and trustworthy performance. The stylish bike has a 21 speed (7 X 3) setting that allows the rider to shift gears according to his requirement. The bike comes packed with light and strong double walled alloy rims along with 27.5 inches wide tyres that supports comfortable riding and a major performance advantage on the road.",
  year: 2090,
  rating: 3.3,
  price: 10620.0,
  category: "active",
};

//*elements
const itemCharactersticsContainer = document.querySelector(
  "#item-characterstics > div"
);
const itemDescription = document.querySelector("#item-description");
const itemName = document.querySelector("#item-name");
const itemRating = document.querySelector(".rating-value");
const itemColor = document.querySelector("#item-color > div");
const itemSize = document.querySelector("#item-size > div");
const strikedOffPrice = document.querySelector(".striked-off");
const itemDiscount = document.querySelector("#item-discount");
const itemPrice = document.querySelector("#item-price");

//?function to show characterstics of bike
function showCharacterstics(bike) {
  itemCharactersticsContainer.innerHTML = null;
  const {
    front_wheel,
    frame_colors,
    rear_wheel,
    Front_tire,
    inner_tubes,
    front_Wheel,
  } = bike;
  const characterstics = {
    front_wheel,
    frame_colors,
    rear_wheel,
    Front_tire,
    inner_tubes,
    front_Wheel,
  };
  for (let key in characterstics) {
    const characterstic = document.createElement("div");
    characterstic.classList.add("characterstic");
    const charactersticTitle = document.createElement("h5");
    charactersticTitle.textContent = toStandardCase(key);
    const charactersticValue = document.createElement("h5");
    if (Array.isArray(characterstics[key]))
      charactersticValue.textContent = characterstics[key].join(", ");
    else charactersticValue.textContent = characterstics[key];
    characterstic.append(charactersticTitle, charactersticValue);
    itemCharactersticsContainer.append(characterstic);
  }
  const toggleViewBtn = document.createElement("button");
  toggleViewBtn.classList.add("golden-button");
  toggleViewBtn.textContent = "⬇Show More";
  toggleViewBtn.addEventListener("click", handleToggleView);
  itemCharactersticsContainer.append(toggleViewBtn);
}
//? function to handle showMore/Less
function handleToggleView({ target }) {
  const { textContent } = target;

  switch (textContent) {
    case "⬇Show More":
      target.textContent = "⬆Show Less";
      lastTwoItems.forEach((item) => (item.style.display = "flex"));
      break;
    case "⬆Show Less":
      target.textContent = "⬇Show More";
      lastTwoItems.forEach((item) => (item.style.display = "none"));

      break;
  }
}
//? function to show characterstics of item
function toStandardCase(key) {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
//? function to show Item description
function showItemDescription({ description }) {
  const desc = document.createElement("p");
  desc.textContent = description;
  itemDescription.append(desc);
}
//? function to show rating of item
function showRating() {
  const { rating } = bike;
  const stars = document.querySelectorAll(".star");
  let i;
  for (i = 0; i < Math.floor(rating); i++)
    stars[i].style.backgroundColor = "#c68409";
  if (rating - i > 0) {
    const percentage = Math.floor((rating - i) * 100);
    stars[
      i
    ].style.backgroundImage = `linear-gradient(to right, #c68409 ${percentage}%,#fff ${
      100 - percentage
    }%)`;
  }
}
//?function to show color:
function showColors() {
  bike.frame_colors.forEach((color) => {
    const colorBtn = document.createElement("button");
    colorBtn.style.backgroundColor = color;
    colorBtn.classList.add("color-button");
    itemColor.append(colorBtn);
  });
}
//? function to show discount and striked off price;
function showDiscount() {
  const discount = Math.floor(Math.random() * 11) + 10;
  itemDiscount.textContent = `${discount}%`;
  const markedUpPrice = Math.floor(bike.price * (100 / (100 - discount)));
  strikedOffPrice.textContent = `₹${markedUpPrice}`;
}

//!function calls
showCharacterstics(bike);
showItemDescription(bike);
showRating();
showColors();
showDiscount();
//!hiding the last two characterstics
const lastTwoItems = document.querySelectorAll(
  "#item-characterstics > div > div:nth-last-child(-n+3)"
);
lastTwoItems.forEach((item) => (item.style.display = "none"));
//! setting initial Data
itemName.textContent = bike.title;
itemRating.textContent = bike.rating;
itemPrice.textContent = `₹${bike.price}`;
