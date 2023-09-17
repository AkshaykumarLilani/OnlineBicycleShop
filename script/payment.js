function displayDeliveryAddress() {
    const deliveryData = JSON.parse(localStorage.getItem('formData'));
    if (deliveryData) {
        const addressBox = document.getElementById('deliveryAddressBox');

        // Display full name (first name and last name) on the same line with space
        const fullName = `${deliveryData.firstName} ${deliveryData.lastName}`;
        const pName = document.createElement('p');
        pName.textContent = `Name: ${fullName}`;
        addressBox.appendChild(pName);

        // Display phone number on the next line
        const pPhone = document.createElement('p');
        pPhone.textContent = `Phone: ${deliveryData.phoneNumber}`;
        addressBox.appendChild(pPhone);

        // Display address lines, city, state, postal code, and country on the same line
        const fullAddress = `${deliveryData.address1}, ${deliveryData.address2}, ${deliveryData.city}, ${deliveryData.state}, ${deliveryData.postalCode}, ${deliveryData.country}`;
        const pAddress = document.createElement('p');
        pAddress.textContent = `Address: ${fullAddress}`;
        addressBox.appendChild(pAddress);
    }
    // Clear the localStorage item after using it
    localStorage.removeItem('formData');
}

// Calling the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", displayDeliveryAddress);




