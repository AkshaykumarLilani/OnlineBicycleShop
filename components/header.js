function header() {
  return `

    <div id="desktop-nav">
      <div class="left-section1">
        <a href="/"><img src="/images/images.png" class="logo1" alt="" /></a>
        <ul id="navbar1">
          <li><a class="#" href="/Pages/Category/index.html?category=mountain">MOUNTAIN</a></li>
          <li><a href="/Pages/Category/index.html?category=road">ROAD</a></li>
          <li><a href="/Pages/Category/index.html?category=active">ACTIVE</a></li>
          <li><a href="/Pages/Category/index.html?category=electric">ELECTRIC</a></li>
          <li><a href="/Pages/Category/index.html?category=kids">KIDS</a></li>

        </ul>
      </div>

      <div class="form1">
        <div class="search-bar1">
          <input type="text" placeholder="Search" id="desktop-search-input"/>
          <i class="fas fa-search search-icon"></i>
        </div>
        <div id="desktop-search-results" style="display: none;"></div>
      </div>

      <div class="right-section1">
        <div class="icons1">
          <a href="/cart.html">
            <i class="fa-solid fa-cart-shopping" style="color: #f0f0f0;"></i>
          </a>
          <a href="/signup.html">
            <i class="fa-regular fa-user" style="color: #ffffff;"></i>
          </a>
          <a href="/Pages/Wishlist/index.html">
            <i class="fa-regular fa-heart" style="color: #eeeeee;"></i>
          </a>
        </div>
      </div>
    </div>
  
    <div id="mobile-nav">
      <div id="mobile-top-nav">
        <a href="/"><img src="/images/images.png" class="logo1" alt="" /></a>
        <button id="open-burger"><img src="/images/open-burger.png"/></button>
        <button id="close-burger" style="display: none;"><img src="/images/close-burger.png"/></button>
      </div>
      <div id="mobile-nav-burger" style="display:none">
        <div class="left-section1">
    
        <ul id="navbar1">
          <li><a class="#" href="/Pages/Category/index.html?category=mountain">MOUNTAIN</a></li>
          <li><a href="/Pages/Category/index.html?category=road">ROAD</a></li>
          <li><a href="/Pages/Category/index.html?category=active">ACTIVE</a></li>
          <li><a href="/Pages/Category/index.html?category=electric">ELECTRIC</a></li>
          <li><a href="/Pages/Category/index.html?category=kids">KIDS</a></li>
        </ul>
      </div>

      <div class="form1">
        <div class="search-bar1">
          <input type="text" placeholder="Search" id="mobile-search-input"/>
          <i class="fas fa-search search-icon"></i>
        </div>
      </div>

      <div class="right-section1">
        <div class="icons1">
          <a href="/cart.html">
            <i class="fa-solid fa-cart-shopping" style="color: #f0f0f0;"></i>
          </a>
          <a href="/signup.html">
            <i class="fa-regular fa-user" style="color: #ffffff;"></i>
          </a>
          <a href="/cart.html">
            <i class="fa-regular fa-heart" style="color: #eeeeee;"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
  
  
  `;
}

export default header;
