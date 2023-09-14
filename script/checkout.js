document.addEventListener("DOMContentLoaded", () => {
  const addressForm = document.getElementById("myform");
  addressForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phoneNumber: document.getElementById("phone").value,

      address: document.getElementById("address").value,
    //   newFirstName: document.getElementById("newfirstname").value,
    //   newLastName: document.getElementById("newlastname").value,
    //   newAddress: document.getElementById("newaddress").value,

    };

    localStorage.setItem("formData", JSON.stringify(data));
    alert("Shipping address saved! Proceeding to payment.");
    window.location.href = "./payment.html";
  });
});
