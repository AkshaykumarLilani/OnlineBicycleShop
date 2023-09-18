
const cartSection = document.getElementById("cart");
const cartTableBody = cartSection.querySelector("tbody");


function loadCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartTableBody.innerHTML = "";
  console.log(cartItems);

  cartItems.forEach((item, index) => {
    item.price = parseFloat(item.price);
    item.quantity = parseInt(item.quantity);
    console.log(`Price: ${item.price}, Quantity: ${item.quantity}`);  
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><button class="remove-item" data-index="${index}">Remove</button></td>
            <td>
              <img src="${item.large_img}" alt="${item.title}" />
              <p class="text-white">${item.title}</p>
              </td>
            <td>${item.price}</td>
            <td><input type="number" class="quantity" value="${
              item.quantity
            }" min="1"></td>
            <td class="subtotal">${(
              parseFloat(item.price) * parseInt(item.quantity)
            ).toFixed(2)}</td>
        `;
    cartTableBody.appendChild(row);
  });
  updateCart();
  updateCartCount();
}




function updateCart() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];



  let total = 0;
  cartItems.forEach((item) => {
    console.log(`Price: ${item.price}, Quantity: ${item.quantity}`);  // Add this line
    total += parseFloat(item.price) * parseInt(item.quantity);
  });
  document.getElementById("total").textContent = total.toFixed(2);
  


  const cartContents = document.querySelectorAll(".cart-content");
  const shoppingButton = document.getElementById("shopping-button");
  const rightSection = document.querySelector(".right-section");
  const emptyCartSection = document.querySelector(".empty-cart-button");

  if (cartItems.length === 0) {
    cartContents.forEach((element) => { element.style.display = "none"; });
    rightSection.style.display = "none";
    shoppingButton.style.display = "";
    emptyCartSection.style.display = "block";
  } else {
    cartContents.forEach((element) => { element.style.display = "block"; });
    rightSection.style.display = "block";
    shoppingButton.style.display = "block";
    emptyCartSection.style.display = "none";
  }

  updateCartCount();
}



cartTableBody.addEventListener("input", (event) => {
  if (event.target.classList.contains("quantity")) {
    const row = event.target.closest("tr");
    const productName = row.querySelector("td:nth-child(2) p").textContent;
    const quantity = parseInt(event.target.value);
    const price = parseFloat(row.querySelector("td:nth-child(3)").textContent);
    const subtotalElement = row.querySelector(".subtotal");

    subtotalElement.textContent = (price * quantity).toFixed(2); // Fixed this line

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = cartItems.findIndex(item => item.title === productName);
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity = quantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    updateCart();
  }
});





cartTableBody.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-item")) {
    const row = event.target.closest("tr");
    const productName = row.querySelector("td:nth-child(2) p").textContent;

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = cartItems.findIndex(item => item.title === productName);
    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    row.remove();
    updateCart();
    updateCartCount();
  }
});


loadCartItems();
updateCart();
updateCartCount();




const applyCouponButton = document.getElementById("apply-coupon");
const couponCodeInput = document.getElementById("coupon-code");
const totalElement = document.getElementById("total");
const discountElement = document.getElementById("discount");


let couponApplied = false;

applyCouponButton.addEventListener("click", () => {
  if (couponApplied) {
    return; // Coupon already applied, do not apply again
  }

  const couponCode = couponCodeInput.value;
  let total = parseFloat(totalElement.textContent);

  if (couponCode === "Masai30") {
    const discount = total * 0.3; // 30% discount
    total -= discount;

    totalElement.textContent = total.toFixed(2);
    discountElement.textContent = discount.toFixed(2);

    // Save the discounted total to localStorage
    localStorage.setItem("finalPrice", total.toFixed(2));

    couponApplied = true;

    // Disable the coupon input and apply button
    couponCodeInput.disabled = true;
    applyCouponButton.disabled = true;

    alert("Coupon successfully applied!");
  } else {
    alert("Wrong coupon code. Please enter a valid coupon code.");
  }
});

// Update cart count function
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let totalCount = 0;
  cartItems.forEach(item => {
    if (item.quantity) {
      totalCount += item.quantity;
    }
  });
  document.getElementById('cart-count').textContent = totalCount;
}





window.addEventListener('storage', (event) => {
  if (event.key === 'cartItems') {
    updateCartCount();
  }
});
