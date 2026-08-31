/* =========================================================
   VOLTRIX — SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    var menuBtn = document.getElementById("menuBtn");
    var closeNav = document.getElementById("closeNav");
    var navOverlay = document.getElementById("navOverlay");
    var sideNav = document.getElementById("sideNav");

    var searchInput = document.getElementById("searchInput");
    var searchButton = document.getElementById("searchButton");
    var searchResults = document.getElementById("searchResults");

    var addCartButtons = document.querySelectorAll(".add-cart");


    /* =====================================================
       HAMBURGER NAVIGATION
    ===================================================== */

    function openNavigation() {

        if (!navOverlay) {
            return;
        }

        navOverlay.classList.add("open");

        if (menuBtn) {
            menuBtn.setAttribute(
                "aria-expanded",
                "true"
            );
        }

        document.body.style.overflow = "hidden";
    }


    function closeNavigation() {

        if (!navOverlay) {
            return;
        }

        navOverlay.classList.remove("open");

        if (menuBtn) {
            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        document.body.style.overflow = "";
    }


    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openNavigation();

            }
        );

    }


    if (closeNav) {

        closeNav.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeNavigation();

            }
        );

    }


    /* Close when clicking outside the menu */

    if (navOverlay) {

        navOverlay.addEventListener(
            "click",
            function (event) {

                if (event.target === navOverlay) {

                    closeNavigation();

                }

            }
        );

    }


    /* =====================================================
       CLOSE NAV WHEN A NAVIGATION LINK IS CLICKED
    ===================================================== */

    var navLinks = document.querySelectorAll(
        ".nav-item"
    );


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeNavigation();

            }
        );

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeNavigation();

            }

        }
    );


    /* =====================================================
       SWIPE TO OPEN NAVIGATION
       Swipe RIGHT from the left side
    ===================================================== */

    var touchStartX = 0;
    var touchStartY = 0;

    document.addEventListener(
        "touchstart",
        function (event) {

            if (!event.touches.length) {
                return;
            }

            touchStartX =
                event.touches[0].clientX;

            touchStartY =
                event.touches[0].clientY;

        },
        {
            passive: true
        }
    );


    document.addEventListener(
        "touchend",
        function (event) {

            if (!event.changedTouches.length) {
                return;
            }

            var touchEndX =
                event.changedTouches[0].clientX;

            var touchEndY =
                event.changedTouches[0].clientY;


            var differenceX =
                touchEndX - touchStartX;

            var differenceY =
                Math.abs(
                    touchEndY - touchStartY
                );


            /*
             * Only activate if:
             * - swipe starts near left edge
             * - swipe moves right
             * - horizontal movement is larger
             */

            if (
                touchStartX < 45 &&
                differenceX > 70 &&
                differenceY < 80
            ) {

                openNavigation();

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       SWIPE LEFT TO CLOSE NAVIGATION
    ===================================================== */

    navOverlay.addEventListener(
        "touchend",
        function (event) {

            if (!event.changedTouches.length) {
                return;
            }

            var endX =
                event.changedTouches[0].clientX;

            var difference =
                endX - touchStartX;


            if (difference < -80) {

                closeNavigation();

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       PARTICLES
    ===================================================== */

    var particleContainer =
        document.getElementById("particles");


    function createParticles() {

        if (!particleContainer) {
            return;
        }


        var numberOfParticles =
            window.innerWidth < 600
                ? 35
                : 65;


        for (
            var i = 0;
            i < numberOfParticles;
            i++
        ) {

            var particle =
                document.createElement("div");


            particle.className =
                "particle";


            particle.style.left =
                Math.random() * 100 + "%";


            particle.style.setProperty(
                "--move-x",
                (
                    Math.random() * 160 - 80
                ) + "px"
            );


            particle.style.animationDuration =
                (
                    7 +
                    Math.random() * 13
                ) + "s";


            particle.style.animationDelay =
                (
                    Math.random() * -15
                ) + "s";


            particle.style.width =
                (
                    1 +
                    Math.random() * 3
                ) + "px";


            particle.style.height =
                particle.style.width;


            particleContainer.appendChild(
                particle
            );

        }

    }


    createParticles();


    /* =====================================================
       SEARCH
    ===================================================== */

    var products =
        document.querySelectorAll(
            ".product-card"
        );


    function performSearch() {

        if (!searchInput) {
            return;
        }


        var searchText =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!searchText) {

            products.forEach(function (product) {

                product.style.display = "";

            });


            if (searchResults) {

                searchResults.style.display =
                    "none";

            }

            return;

        }


        var found = 0;


        products.forEach(function (product) {

            var productText =
                product.textContent.toLowerCase();


            var productData =
                (
                    product.getAttribute(
                        "data-product"
                    ) || ""
                ).toLowerCase();


            if (
                productText.indexOf(searchText) !== -1 ||
                productData.indexOf(searchText) !== -1
            ) {

                product.style.display = "";

                found++;

            } else {

                product.style.display = "none";

            }

        });


        if (searchResults) {

            searchResults.style.display =
                "block";


            if (found > 0) {

                searchResults.textContent =
                    found +
                    " product" +
                    (
                        found === 1
                            ? ""
                            : "s"
                    ) +
                    " found";

            } else {

                searchResults.textContent =
                    "No products found.";

            }

        }

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    performSearch();

                }

            }
        );

    }


    /* =====================================================
       ADD TO CART
    ===================================================== */

    function getCart() {

        try {

            var savedCart =
                localStorage.getItem(
                    "voltrixCart"
                );


            if (!savedCart) {

                return [];

            }


            var parsed =
                JSON.parse(savedCart);


            if (
                Array.isArray(parsed)
            ) {

                return parsed;

            }


            return [];

        } catch (error) {

            return [];

        }

    }


    function saveCart(cart) {

        try {

            localStorage.setItem(
                "voltrixCart",
                JSON.stringify(cart)
            );

        } catch (error) {

            console.log(
                "Could not save cart."
            );

        }

    }


    addCartButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    var productId =
                        button.getAttribute(
                            "data-product-id"
                        );


                    if (!productId) {
                        return;
                    }


                    var cart =
                        getCart();


                    var existingProduct =
                        cart.find(
                            function (item) {

                                return (
                                    item.id ===
                                    productId
                                );

                            }
                        );


                    if (existingProduct) {

                        existingProduct.quantity += 1;

                    } else {

                        cart.push({

                            id: productId,

                            quantity: 1

                        });

                    }


                    saveCart(cart);


                    /* Button feedback */

                    var originalText =
                        button.textContent;


                    button.textContent =
                        "✓ ADDED TO CART";


                    button.style.background =
                        "rgba(0,245,160,0.25)";


                    setTimeout(
                        function () {

                            button.textContent =
                                originalText;

                            button.style.background =
                                "";

                        },
                        1200
                    );

                }
            );

        }
    );


    /* =====================================================
       PREVENT LONG-PRESS CONTEXT MENU
       Product cards should not react to hold.
    ===================================================== */

    var productCards =
        document.querySelectorAll(
            ".product-card"
        );


    productCards.forEach(
        function (card) {

            card.addEventListener(
                "contextmenu",
                function (event) {

                    event.preventDefault();

                }
            );


            card.addEventListener(
                "dragstart",
                function (event) {

                    event.preventDefault();

                }
            );

        }
    );


    /* =====================================================
       LOG
    ===================================================== */

    console.log(
        "VOLTRIX initialized successfully."
    );

});