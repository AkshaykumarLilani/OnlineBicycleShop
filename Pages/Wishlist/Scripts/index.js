const container = document.querySelector("#container");

//? function to create item card
function createCard(item) {
  const { large_img, category, title, price } = item;
  const card = document.createElement("div");
  card.classList.add("card");
  const cardImage = document.createElement("img");
  cardImage.classList.add("card-image");
  cardImage.src = large_img;
  cardImage.alt = "bike-image";
  const bikeName = document.createElement("h3");
  bikeName.classList.add("card-name");
  bikeName.textContent = title;
  const bikeDesc = document.createElement("div");
  bikeDesc.classList.add("card-description");
  const bikeCategory = document.createElement("h4");
  bikeCategory.textContent = `CATEGORY : ${category}`;
  const bikePrice = document.createElement("h4");
  bikePrice.textContent = `PRICE : ₹${price}`;
  bikeDesc.append(bikeCategory, bikePrice);
  const buttons = document.createElement("div");
  buttons.classList.add("card-buttons");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "DELETE";
  deleteBtn.classList.add("delete-btn");
  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "ADD TO CART";
  addToCartBtn.classList.add("add-to-cart-btn");
  buttons.append(deleteBtn, addToCartBtn);
  card.append(cardImage, bikeName, bikeDesc, buttons);
  return card;
}
//? function to add items to container
function showWishListItems() {
  container.innerHTML = null;
  const wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
  console.log(wishlist);
  if (wishlist.length == 0) showEmptyWishlistMessage();
  else {
    wishlist.forEach((item) => {
      const card = createCard(item);
      card.addEventListener("click", (event) => {
        switch (event.target.textContent) {
          case "DELETE":
            handleDelete(item);
            break;
          case "ADD TO CART":
            handleAddToCart(item);
            break;
          default:
            showItemPage(item);
        }
      });
      container.append(card);
    });
  }
}
//? function to notify that wishlist is empty
function showEmptyWishlistMessage() {
  alert("wishlist is empty");
}
//? function to delete wishlist item
function handleDelete(bike) {
  let wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
  wishlist = wishlist.filter((item) => item.id !== bike.id);
  localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
  showWishListItems();
}
//?function to handle add to cart
function handleAddToCart(bike) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push(bike);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  handleDelete(bike);
}
function showItemPage(item) {
  localStorage.setItem("item-page-data", JSON.stringify(item));
  window.location.href = "../ItemPage/index.html";
}
//! showing wishlist items
showWishListItems();
