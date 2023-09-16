//TODO temporary data
const bike = {
  large_img:
    "https://m.media-amazon.com/images/I/41mXAbIYkCL._SX300_SY300_QL70_FMwebp_.jpg",
  img2: "https://m.media-amazon.com/images/I/610OAk5EolL._SY355_.jpg",
  img3: "https://m.media-amazon.com/images/I/619TG7ES60L._SY355_.jpg",
  img4: "https://m.media-amazon.com/images/I/51ZGjaThlHL._SY355_.jpg",
  img5: "https://m.media-amazon.com/images/I/61sN7RK0fKL._SY355_.jpg",
  title: "Urban Terrain UT1000 Steel MTB 27.5 Mountain Cycle",
  frame_colors: ["black"],
  front_wheel: "Traversal SL 29",
  rear_wheel: "TRAVERSE SL 29",
  Front_tire: "back",
  inner_tubes: "STANDARD, PRESTA VALVE",
  front_Wheel: "BUTCHER GRID TRAIL T7 29 * 2.3",
  description:
    "The Shimano derailleurs and shifters are made with Japanese technology for a seamless gear shifting experience and trustworthy performance. The stylish bike has a 21 speed (7 X 3) setting that allows the rider to shift gears according to his requirement. The High-quality double disc brakes on both front and rear wheels ensure stable and quick braking. The disc brakes help you navigate safely during challenging situations such as a crowded market. ",
  year: 2890,
  rating: 4.5,
  price: 11920.0,
  category: "mountain",
};
//!Data
let index = 0;

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
const slider = document.querySelector("#slider");
const imageSlider = document.querySelector("#item-image-slider");
const slideLeft = document.querySelector("#slide-left");
const slideRight = document.querySelector("#slide-right");
const sliderButtons = document.querySelector("#slider-buttons");

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
//?function to get images
function getImages() {
  const images = [];
  for (let key in bike) if (key.includes("img")) images.push(bike[key]);
  return images;
}
//? function to show image slider;
function showImageSlider() {
  slider.style.backgroundImage = `url(${images[0]})`;
  images.forEach((image, index) => {
    const imageBtn = document.createElement("button");
    imageBtn.classList.add("image-button");
    imageBtn.style.backgroundImage = `url(${image})`;
    imageBtn.name = index;
    sliderButtons.append(imageBtn);
  });
  imageSlider.append(sliderButtons);
  document
    .querySelectorAll("#slider-buttons > button")[0]
    .classList.add("image-button-active");
}
//? function to handle slide left
slideLeft.addEventListener("click", (event) => {
  const currentBtn = document.querySelectorAll("#slider-buttons > button")[
    index
  ];
  currentBtn.classList.remove("image-button-active");
  if (index == 0) index = images.length - 1;
  else index--;
  slider.style.backgroundImage = `url(${images[index]})`;
  const activeBtn = document.querySelectorAll("#slider-buttons > button")[
    index
  ];
  activeBtn.classList.add("image-button-active");
});
//? function to handle slide right
slideRight.addEventListener("click", (event) => {
  const currentBtn = document.querySelectorAll("#slider-buttons > button")[
    index
  ];
  currentBtn.classList.remove("image-button-active");
  if (index == images.length - 1) index = 0;
  else index++;
  slider.style.backgroundImage = `url(${images[index]})`;
  const activeBtn = document.querySelectorAll("#slider-buttons > button")[
    index
  ];
  activeBtn.classList.add("image-button-active");
});
//? function to manage image button click
sliderButtons.addEventListener("click", ({ target }) => {
  if (target.localName === "button") {
    const currentBtn = document.querySelectorAll("#slider-buttons > button")[
      index
    ];
    currentBtn.classList.remove("image-button-active");
    index = +target.name;
    slider.style.backgroundImage = `url(${images[index]})`;
    target.classList.add("image-button-active");
  }
});
//!function calls
showCharacterstics(bike);
showItemDescription(bike);
showRating();
showColors();
showDiscount();
const images = getImages();
showImageSlider();
//!hiding the last two characterstics
const lastTwoItems = document.querySelectorAll(
  "#item-characterstics > div > div:nth-last-child(-n+3)"
);
lastTwoItems.forEach((item) => (item.style.display = "none"));
//! setting initial Data
itemName.textContent = bike.title;
itemRating.textContent = bike.rating;
itemPrice.textContent = `₹${bike.price}`;
