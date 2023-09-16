document.addEventListener("DOMContentLoaded", () => {
  const addressForm = document.getElementById("myform");
  addressForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form values
    const data = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phoneNumber: document.getElementById("phone").value,
      address1: document.getElementById("address1").value,
      address2: document.getElementById("address2").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      postalCode: document.getElementById("postal-code").value,
      country: document.getElementById("country").value,
    };

    // Store data in local storage
    localStorage.setItem("formData", JSON.stringify(data));
    alert("Shipping address saved! Proceeding to payment.");
    window.location.href = "./payment.html";
  });
});
