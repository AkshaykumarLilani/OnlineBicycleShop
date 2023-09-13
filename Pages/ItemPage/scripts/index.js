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
  rating: 4.9,
  price: 10620.0,
  category: "active",
};

//*elements
const itemCharactersticsContainer = document.querySelector(
  "#item-characterstics > div"
);
const itemDescription = document.querySelector("#item-description");
console.log(itemDescription);

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

  console.log(lastTwoItems);
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

//!function calls
showCharacterstics(bike);
showItemDescription(bike);
//!hiding the last two characterstics
const lastTwoItems = document.querySelectorAll(
  "#item-characterstics > div > div:nth-last-child(-n+3)"
);
lastTwoItems.forEach((item) => (item.style.display = "none"));
