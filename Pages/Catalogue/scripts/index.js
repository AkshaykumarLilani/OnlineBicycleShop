//* data
const bikeTypes = [
  {
    img_url:
      "https://m.media-amazon.com/images/I/41mXAbIYkCL._SX300_SY300_QL70_FMwebp_.jpg",
    name: "MOUNTAIN",
  },
  {
    img_url: "https://m.media-amazon.com/images/I/41lLhlWRwTL._SY355_.jpg",
    name: "ROAD",
  },
  {
    img_url: "https://m.media-amazon.com/images/I/61BHUGgu62L._SY355_.jpg",
    name: "ACTIVE",
  },
  {
    img_url:
      "https://rukminim2.flixcart.com/image/612/612/kw104nk0/cycle/f/w/p/torfin-26t-mtb-bicycle-without-gear-single-speed-with-fs-dd-original-imag8shx8mkcew9p.jpeg?q=70",
    name: "ELECTRIC",
  },
  {
    img_url:
      "https://m.media-amazon.com/images/I/81ZiDYhYLvL._AC_UL600_FMwebp_QL65_.jpg",
    name: "KIDS",
  },
];

//* elements
const container = document.querySelector("#container");

//? function to display bike Types
function displayBikeTypes() {
  bikeTypes.forEach((type) => {
    const typeCard = createCard(type);
    container.append(typeCard);
  });
}
//? function to create type card
function createCard({ img_url, name }) {
  const card = document.createElement("div");
  card.classList.add("catalogue-card");

  const image = document.createElement("img");
  image.src = img_url;
  image.alt = `${name}-bike-image`;

  const title = document.createElement("h3");
  title.textContent = name;

  card.addEventListener("click", () => handleCardClick(name));

  card.append(image, title);
  return card;
}
//? function to handle cardClick
function handleCardClick(name) {
  console.log(name);
}
displayBikeTypes();
