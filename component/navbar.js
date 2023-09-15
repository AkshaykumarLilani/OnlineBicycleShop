function navbar() {
    return `<div class="left-section">
    <a href="#"><img src="./images/images.png" class="logo" alt="" /></a>
    <ul id="navbar">
        <li><a class="#" href="#">MOUNTAIN</a></li>
        <li><a href="#">ROAD</a></li>
        <li><a href="#">ACTIVE</a></li>
        <li><a href="#">ELECTRIC</a></li>
        <li><a href="#">KIDS</a></li>
        
    </ul>
</div>

<div class="form">
    <div class="search-bar">
        <input type="text" placeholder="Search" />
        <i class="fas fa-search search-icon"></i>
    </div>
</div>

<div class="right-section">
    <!-- <i class="fa-solid fa-phone" style="color: #ededed;  margin-right: 9px"></i> -->
    <!-- <span style="color: white; margin-right: 38px;">7827053118</span> -->
    <div class="icons">
        <a href="cart.html">
          <i class="fa-solid fa-cart-shopping" style="color: #f0f0f0; margin-right: 50px;"></i></a>
        <i class="fa-regular fa-user" style="color: #ffffff; margin-right: 38px;"></i>
        <i class="fa-regular fa-heart" style="color: #eeeeee;"></i>
    </div>
</div>`
}
export default navbar;