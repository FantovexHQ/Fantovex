/* =========================================================
   VOLTRIX — MAIN JAVASCRIPT
   Shop Beyond Limits
========================================================= */

"use strict";

/* =========================================================
   VOLTRIX PRODUCT DATABASE
========================================================= */

const VOLTRIX_PRODUCTS = [

  {
    id: 1,
    name: "VoltGrip Gaming Accessory",
    category: "Gaming",
    price: 699,
    oldPrice: 999,
    rating: 4.7,
    reviews: 128,
    badge: "NEW",
    image: "",
    description:
      "A compact gaming accessory designed to improve your gaming setup and everyday control.",
    stock: true
  },

  {
    id: 2,
    name: "Pulse RGB Desk Hub",
    category: "Electronics",
    price: 1299,
    oldPrice: 1799,
    rating: 4.6,
    reviews: 94,
    badge: "HOT",
    image: "",
    description:
      "A stylish RGB desk accessory designed for modern gaming and workstation setups.",
    stock: true
  },

  {
    id: 3,
    name: "CoreCable Organizer",
    category: "Accessories",
    price: 399,
    oldPrice: 599,
    rating: 4.5,
    reviews: 76,
    badge: "VALUE",
    image: "",
    description:
      "Keep your charging cables and desk accessories organised with a compact cable solution.",
    stock: true
  },

  {
    id: 4,
    name: "AeroDock Headset Stand",
    category: "Gaming",
    price: 999,
    oldPrice: 1499,
    rating: 4.4,
    reviews: 63,
    badge: "SALE",
    image: "",
    description:
      "A clean and sturdy headset stand for gaming desks and everyday setups.",
    stock: true
  },

  {
    id: 5,
    name: "VoltSound Wireless Earbuds",
    category: "Electronics",
    price: 899,
    oldPrice: 1499,
    rating: 4.5,
    reviews: 211,
    badge: "POPULAR",
    image: "",
    description:
      "Wireless earbuds designed for music, gaming and everyday listening.",
    stock: true
  },

  {
    id: 6,
    name: "VoltCharge Fast Charger",
    category: "Mobiles",
    price: 599,
    oldPrice: 899,
    rating: 4.6,
    reviews: 182,
    badge: "HOT",
    image: "",
    description:
      "Compact fast charging solution for compatible smartphones and devices.",
    stock: true
  },

  {
    id: 7,
    name: "Vortex Printed T-Shirt",
    category: "Fashion",
    price: 499,
    oldPrice: 799,
    rating: 4.4,
    reviews: 87,
    badge: "NEW",
    image: "",
    description:
      "A premium-looking printed tee with a bold VOLTRIX-inspired streetwear aesthetic.",
    stock: true
  },

  {
    id: 8,
    name: "VoltFlex Mobile Stand",
    category: "Accessories",
    price: 349,
    oldPrice: 499,
    rating: 4.3,
    reviews: 55,
    badge: "VALUE",
    image: "",
    description:
      "A compact adjustable stand for smartphones and small devices.",
    stock: true
  }

];


/* =========================================================
   STORAGE
========================================================= */

const CART_KEY = "voltrix_cart";
const WISHLIST_KEY = "voltrix_wishlist";
const LOCATION_KEY = "voltrix_location";


function getCart() {

  try {

    return JSON.parse(
      localStorage.getItem(CART_KEY)
    ) || [];

  } catch (error) {

    return [];

  }

}


function saveCart(cart) {

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );

}


function getWishlist() {

  try {

    return JSON.parse(
      localStorage.getItem(WISHLIST_KEY)
    ) || [];

  } catch (error) {

    return [];

  }

}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initLoader();

    initSideNavigation();

    initCart();

    initSearch();

    initLocation();

    initNewsletter();

    initRating();

    initProductCards();

    initSmoothLinks();

    updateCartCounters();

  }
);


/* =========================================================
   PAGE LOADER
========================================================= */

function initLoader() {

  const loader =
    document.getElementById("pageLoader");

  if (!loader) return;

  window.addEventListener(
    "load",
    () => {

      setTimeout(
        () => {

          loader.classList.add("loaded");

          setTimeout(
            () => {

              loader.style.display = "none";

            },
            700
          );

        },
        500
      );

    }
  );

}


/* =========================================================
   SIDE NAVIGATION
========================================================= */

function initSideNavigation() {

  const menuButton =
    document.getElementById("menuButton");

  const closeButton =
    document.getElementById("closeNav");

  const sideNav =
    document.getElementById("sideNav");

  const overlay =
    document.getElementById("navOverlay");

  if (!sideNav) return;


  function openNavigation() {

    sideNav.classList.add("open");

    if (overlay) {

      overlay.classList.add("active");

    }

    document.body.classList.add(
      "nav-open"
    );

    sideNav.setAttribute(
      "aria-hidden",
      "false"
    );

    if (menuButton) {

      menuButton.setAttribute(
        "aria-expanded",
        "true"
      );

    }

  }


  function closeNavigation() {

    sideNav.classList.remove("open");

    if (overlay) {

      overlay.classList.remove("active");

    }

    document.body.classList.remove(
      "nav-open"
    );

    sideNav.setAttribute(
      "aria-hidden",
      "true"
    );

    if (menuButton) {

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  }


  if (menuButton) {

    menuButton.addEventListener(
      "click",
      openNavigation
    );

  }


  if (closeButton) {

    closeButton.addEventListener(
      "click",
      closeNavigation
    );

  }


  if (overlay) {

    overlay.addEventListener(
      "click",
      closeNavigation
    );

  }


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeNavigation();

      }

    }
  );


  /* Close navigation after selecting a link */

  sideNav
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          closeNavigation();

        }
      );

    });

}


/* =========================================================
   CART SYSTEM
========================================================= */

function initCart() {

  document.addEventListener(
    "click",
    event => {

      const addButton =
        event.target.closest(
          "[data-add-cart]"
        );

      if (!addButton) return;

      event.preventDefault();

      const id =
        Number(
          addButton.dataset.addCart
        );

      addToCart(id);

    }
  );

}


function addToCart(productId) {

  const product =
    VOLTRIX_PRODUCTS.find(
      item => item.id === productId
    );

  if (!product) {

    showToast(
      "Product not found"
    );

    return;

  }


  const cart = getCart();


  const existing =
    cart.find(
      item => item.id === productId
    );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({

      id: productId,

      quantity: 1

    });

  }


  saveCart(cart);

  updateCartCounters();

  showToast(
    `${product.name} added to cart`
  );

}


function removeFromCart(productId) {

  let cart = getCart();

  cart =
    cart.filter(
      item => item.id !== productId
    );

  saveCart(cart);

  updateCartCounters();

}


function updateCartQuantity(
  productId,
  quantity
) {

  const cart = getCart();

  const item =
    cart.find(
      item => item.id === productId
    );

  if (!item) return;


  item.quantity =
    Math.max(
      1,
      Number(quantity)
    );


  saveCart(cart);

  updateCartCounters();

}


function getCartCount() {

  const cart = getCart();

  return cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

}


function updateCartCounters() {

  const count =
    getCartCount();


  const counters = [

    document.getElementById(
      "navCartCount"
    ),

    document.getElementById(
      "headerCartCount"
    ),

    document.getElementById(
      "bottomCartCount"
    )

  ];


  counters.forEach(
    counter => {

      if (!counter) return;

      counter.textContent =
        count;

    }
  );

}


/* =========================================================
   SEARCH
========================================================= */

function initSearch() {

  const desktopForm =
    document.getElementById(
      "desktopSearchForm"
    );

  const mobileForm =
    document.getElementById(
      "mobileSearchForm"
    );

  const desktopInput =
    document.getElementById(
      "desktopSearch"
    );

  const mobileInput =
    document.getElementById(
      "mobileSearch"
    );

  const clearButton =
    document.getElementById(
      "desktopSearchClear"
    );


  function performSearch(
    value
  ) {

    const query =
      value.trim();


    if (!query) {

      showToast(
        "Type a product name first"
      );

      return;

    }


    window.location.href =
      "search.html?q=" +
      encodeURIComponent(query);

  }


  if (desktopForm) {

    desktopForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        performSearch(
          desktopInput
            ? desktopInput.value
            : ""
        );

      }
    );

  }


  if (mobileForm) {

    mobileForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        performSearch(
          mobileInput
            ? mobileInput.value
            : ""
        );

      }
    );

  }


  if (clearButton && desktopInput) {

    clearButton.addEventListener(
      "click",
      () => {

        desktopInput.value = "";

        desktopInput.focus();

      }
    );

  }


  /* Enter key support */

  [desktopInput, mobileInput]
    .filter(Boolean)
    .forEach(input => {

      input.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter"
          ) {

            event.preventDefault();

            performSearch(
              input.value
            );

          }

        }
      );

    });

}


/* =========================================================
   LOCATION
========================================================= */

function initLocation() {

  const button =
    document.getElementById(
      "locationButton"
    );

  const modal =
    document.getElementById(
      "locationModal"
    );

  const form =
    document.getElementById(
      "locationForm"
    );

  const input =
    document.getElementById(
      "locationPincode"
    );

  const message =
    document.getElementById(
      "locationMessage"
    );


  if (!button || !modal) return;


  function openModal() {

    modal.classList.add(
      "active"
    );

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    setTimeout(
      () => {

        if (input) input.focus();

      },
      150
    );

  }


  function closeModal() {

    modal.classList.remove(
      "active"
    );

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  button.addEventListener(
    "click",
    openModal
  );


  modal
    .querySelectorAll(
      "[data-close-modal], .modal"
    )
    .forEach(element => {

      element.addEventListener(
        "click",
        event => {

          if (
            event.target === element
          ) {

            closeModal();

          }

        }
      );

    });


  if (form) {

    form.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const pincode =
          input.value.trim();


        if (
          !/^[0-9]{6}$/.test(
            pincode
          )
        ) {

          if (message) {

            message.textContent =
              "Please enter a valid 6-digit pincode.";

            message.classList.add(
              "error"
            );

          }

          return;

        }


        localStorage.setItem(
          LOCATION_KEY,
          pincode
        );


        if (message) {

          message.textContent =
            `Delivery available for ${pincode}.`;

          message.classList.remove(
            "error"
          );

          message.classList.add(
            "success"
          );

        }


        setTimeout(
          () => {

            closeModal();

            showToast(
              `Delivery location set: ${pincode}`
            );

          },
          900
        );

      }
    );

  }


  /* Load previously saved location */

  const savedLocation =
    localStorage.getItem(
      LOCATION_KEY
    );


  if (
    savedLocation &&
    button
  ) {

    button.innerHTML =
      `${savedLocation} <span>›</span>`;

  }

}


/* =========================================================
   NEWSLETTER
========================================================= */

function initNewsletter() {

  const form =
    document.getElementById(
      "newsletterForm"
    );

  const input =
    document.getElementById(
      "newsletterEmail"
    );


  if (!form || !input) return;


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const email =
        input.value.trim();


      if (!email) {

        showToast(
          "Enter your email address"
        );

        return;

      }


      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
          .test(email)
      ) {

        showToast(
          "Please enter a valid email"
        );

        return;

      }


      localStorage.setItem(
        "voltrix_newsletter_email",
        email
      );


      input.value = "";


      showToast(
        "You're on the VOLTRIX list ⚡"
      );

    }
  );

}


/* =========================================================
   RATE US
========================================================= */

function initRating() {

  const link =
    document.getElementById(
      "rateUsLink"
    );


  if (!link) return;


  link.addEventListener(
    "click",
    event => {

      event.preventDefault();


      const rating =
        window.prompt(
          "Rate VOLTRIX from 1 to 5:"
        );


      if (rating === null) return;


      const number =
        Number(rating);


      if (
        !Number.isInteger(number) ||
        number < 1 ||
        number > 5
      ) {

        showToast(
          "Please choose a rating from 1 to 5."
        );

        return;

      }


      localStorage.setItem(
        "voltrix_rating",
        number
      );


      showToast(
        `Thanks for rating VOLTRIX ${"★".repeat(number)}`
      );

    }
  );

}


/* =========================================================
   PRODUCT CARDS
========================================================= */

function initProductCards() {

  const grid =
    document.getElementById(
      "homeProductGrid"
    );


  if (!grid) return;


  /*
     If script.js is loaded, replace
     fallback cards with real cards.
  */

  renderProductGrid(
    grid,
    VOLTRIX_PRODUCTS.slice(
      0,
      4
    )
  );

}


function renderProductGrid(
  container,
  products
) {

  if (!container) return;


  container.innerHTML =
    products
      .map(
        product =>
          createProductCard(
            product
          )
      )
      .join("");

}


function createProductCard(
  product
) {

  const discount =
    product.oldPrice
      ? Math.round(
          (
            1 -
            product.price /
            product.oldPrice
          ) * 100
        )
      : 0;


  const placeholder =
    product.name
      .split(" ")
      .map(word =>
        word.charAt(0)
      )
      .slice(0, 2)
      .join("");


  return `

    <a
      href="product.html?id=${product.id}"
      class="product-card"
      data-product-id="${product.id}"
    >

      <div class="product-image">

        ${
          product.badge
            ? `
              <span class="product-badge">
                ${product.badge}
              </span>
            `
            : ""
        }


        ${
          product.image
            ? `
              <img
                src="${product.image}"
                alt="${escapeHTML(product.name)}"
                loading="lazy"
              >
            `
            : `
              <div class="product-placeholder">
                ${placeholder}
              </div>
            `
        }

      </div>


      <div class="product-info">

        <span class="product-category">
          ${escapeHTML(product.category)}
        </span>


        <h3>
          ${escapeHTML(product.name)}
        </h3>


        <div class="product-rating">

          ★ ${product.rating}

          <small>
            (${product.reviews})
          </small>

        </div>


        <div class="product-price">
          ₹${product.price.toLocaleString("en-IN")}

          ${
            product.oldPrice
              ? `
                <del>
                  ₹${product.oldPrice.toLocaleString("en-IN")}
                </del>
              `
              : ""
          }

        </div>


        ${
          discount > 0
            ? `
              <span class="product-discount">
                ${discount}% OFF
              </span>
            `
            : ""
        }

      </div>

    </a>

  `;

}


/* =========================================================
   SMOOTH LINK BEHAVIOUR
========================================================= */

function initSmoothLinks() {

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute(
              "href"
            );


          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) return;


          event.preventDefault();


          target.scrollIntoView({

            behavior: "smooth",

            block: "start"

          });

        }
      );

    });

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;


function showToast(
  message
) {

  const toast =
    document.getElementById(
      "toast"
    );


  if (!toast) {

    console.log(
      "VOLTRIX:",
      message
    );

    return;

  }


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2600
    );

}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(
  productId
) {

  let wishlist =
    getWishlist();


  const exists =
    wishlist.includes(
      productId
    );


  if (exists) {

    wishlist =
      wishlist.filter(
        id => id !== productId
      );

    showToast(
      "Removed from wishlist"
    );

  } else {

    wishlist.push(
      productId
    );

    showToast(
      "Added to wishlist ♥"
    );

  }


  localStorage.setItem(
    WISHLIST_KEY,
    JSON.stringify(
      wishlist
    )
  );


  return !exists;

}


/* =========================================================
   PRODUCT HELPERS
========================================================= */

function getProductById(
  id
) {

  return VOLTRIX_PRODUCTS.find(
    product =>
      product.id === Number(id)
  );

}


function getProductsByCategory(
  category
) {

  return VOLTRIX_PRODUCTS.filter(
    product =>
      product.category
        .toLowerCase() ===
      category.toLowerCase()
  );

}


/* =========================================================
   HTML SAFETY
========================================================= */

function escapeHTML(
  value
) {

  return String(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


/* =========================================================
   PAGE TRANSITION
========================================================= */

document.addEventListener(
  "click",
  event => {

    const link =
      event.target.closest(
        "a"
      );


    if (!link) return;


    const href =
      link.getAttribute(
        "href"
      );


    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("javascript:") ||
      href.startsWith("http") ||
      link.target === "_blank"
    ) {

      return;

    }


    /*
      Only animate actual internal
      HTML page navigation.
    */

    if (
      href.endsWith(".html") ||
      href.includes(".html?")
    ) {

      const loader =
        document.getElementById(
          "pageLoader"
        );


      if (!loader) return;


      event.preventDefault();


      loader.style.display =
        "flex";

      loader.classList.remove(
        "loaded"
      );


      setTimeout(
        () => {

          window.location.href =
            href;

        },
        280
      );

    }

  }
);


/* =========================================================
   MOBILE BACK BUTTON SUPPORT
========================================================= */

window.addEventListener(
  "pageshow",
  () => {

    const loader =
      document.getElementById(
        "pageLoader"
      );


    if (loader) {

      loader.classList.add(
        "loaded"
      );

    }

  }
);


/* =========================================================
   GLOBAL VOLTRIX API
   Useful for product.html,
   cart.html and category pages.
========================================================= */

window.VOLTRIX = {

  products:
    VOLTRIX_PRODUCTS,

  getProduct:
    getProductById,

  getProductsByCategory:
    getProductsByCategory,

  getCart,

  saveCart,

  addToCart,

  removeFromCart,

  updateCartQuantity,

  getCartCount,

  updateCartCounters,

  toggleWishlist,

  getWishlist,

  showToast

};


/* =========================================================
   CONSOLE BRAND MESSAGE
========================================================= */

console.log(
  "%c VOLTRIX ",
  "background:#00ff9c;color:#03120c;font-size:20px;font-weight:900;padding:8px 14px;border-radius:8px;"
);

console.log(
  "%c SHOP BEYOND LIMITS ",
  "color:#00ff9c;font-size:12px;font-weight:bold;"
);