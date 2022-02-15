// when page loads or variant is changed
document.addEventListener("tomitVariantChanged", function (e) {
    // For current variant...
    // Get current variant title
    var variantTitle =
        tomitProductInventoryInfo.activeProduct.variants[
            tomitProductInventoryInfo.selectedVariantId
        ].title;

    // Get inventory quantity at each location
    var paStock =
        tomitProductInventoryInfo.activeProduct.variants[
            tomitProductInventoryInfo.selectedVariantId
        ].inventoryItem.locations[1].q;
    var mdStock =
        tomitProductInventoryInfo.activeProduct.variants[
            tomitProductInventoryInfo.selectedVariantId
        ].inventoryItem.locations[0].q;

    // Set class on body depending on current variant's availability
    if (paStock > 0) {
        document.body.classList.remove("variant--sold-out-pa");
    } else {
        document.body.classList.add("variant--sold-out-pa");
    }
    if (mdStock > 0) {
        document.body.classList.remove("variant--sold-out-md");
    } else {
        document.body.classList.add("variant--sold-out-md");
    }

    // Show inventory quantities in console
    if (variantTitle == "Default Title") {
        console.log("PA: " + paStock + ", MD: " + mdStock);
    } else {
        console.log(variantTitle + " | PA: " + paStock + ", MD: " + mdStock);
    }

    // Put inventory from user's location into a generic variable
    if (document.querySelector(".user--is-pa")) {
        quantityInStock = paStock;
    }
    if (document.querySelector(".user--is-md")) {
        quantityInStock = mdStock;
    }

    // Get quantity input field
    var quantityInputField = document.querySelector(
        ".product-form__controls-group--quantity input"
    );

    // Set max value on quantity input
    quantityInputField.setAttribute("max", quantityInStock);

    // Get element that displays the variant inventory alert
    var inventoryAlert = document.getElementById("inventoryOversellAlert");

    // Get the add to cart button
    var addToCartButton = document.querySelector(
        "button.product-form__cart-submit"
    );

    // Get element that displays the variant inventory quantity
    var inventoryAlertVariantQuantity = document.getElementById(
        "variantQuantityInStock"
    );

    function displayInventoryAlert() {
        // Display the quantity in stock in alert text
        inventoryAlertVariantQuantity.innerText = quantityInStock;

        // Shows or hides variant inventory alert and enable button
        if (quantityInputField.value > quantityInStock) {
            inventoryAlert.setAttribute("style", "display: block;");
            addToCartButton.setAttribute("disabled", "true");
        } else {
            inventoryAlert.setAttribute("style", "display: none;");
            addToCartButton.removeAttribute("disabled");
        }
    }

    displayInventoryAlert();

    // When the value in the quantity input changes...
    quantityInputField.addEventListener("input", function (e) {
        displayInventoryAlert();
    });
});

// BEGIN Zip Code Popup functions
function waitForElement(querySelector, timeout = 0) {
    const startTime = new Date().getTime();
    return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            if (document.querySelector(querySelector)) {
                clearInterval(timer);
                resolve();
            } else if (timeout && now - startTime >= timeout) {
                clearInterval(timer);
                reject();
            }
        }, 100);
    });
}

// cart page stuff
waitForElement(".tomit_inventory_list li", 100000)
    .then(function () {
        // count number of sold out and oversold items in cart
        var soldOutCounter = 0;

        var cartItems = document.querySelectorAll("[data-cart-item]");
        for (var i = 0; i < cartItems.length; i++) {
            var cartItem = cartItems[i];
            var inventoryList = cartItem.querySelector(".tomit_inventory_list");

            // get relevant inventory value based on user zone
            if (document.querySelector(".user--is-pa")) {
                var inventoryQuantity = inventoryList.querySelector(
                    "li:last-child strong"
                ).textContent;
                var inventoryQuantityNum = parseInt(inventoryQuantity);
            }
            if (document.querySelector(".user--is-md")) {
                var inventoryQuantity = inventoryList.querySelector(
                    "li:first-child strong"
                ).textContent;
                var inventoryQuantityNum = parseInt(inventoryQuantity);
            }

            // select quantity inputs
            var cartQuantityInputDesktop = cartItems[i].querySelector(
                "[data-quantity-input-desktop]"
            );
            var cartQuantityInputMobile = cartItems[i].querySelector(
                "[data-quantity-input-mobile]"
            );

            // save input values as integers
            var cartQuantityInputDesktopNumber = parseInt(
                cartQuantityInputDesktop.value
            );
            var cartQuantityInputMobileNumber = parseInt(
                cartQuantityInputMobile.value
            );

            function cartInventoryCheck() {
                // set max attribute values to in stock inventory quantity
                cartQuantityInputDesktop.setAttribute(
                    "max",
                    inventoryQuantityNum
                );
                cartQuantityInputMobile.setAttribute(
                    "max",
                    inventoryQuantityNum
                );

                // if quantity input is greater than inventory in stock...
                if (
                    cartQuantityInputDesktopNumber > inventoryQuantityNum ||
                    cartQuantityInputMobileNumber > inventoryQuantityNum
                ) {
                    // increase sold out conter by 1
                    soldOutCounter++;
                    cartItem.setAttribute("data-inventory-warning", "");
                } else {
                    cartItem.removeAttribute("data-inventory-warning", "");
                }
            }

            // When the value in the cart quantity input changes...
            // cartQuantityInputDesktop.addEventListener("input", function (e) {
            //     cartInventoryCheck();
            // });
            // cartQuantityInputMobile.addEventListener("input", function (e) {
            //     cartInventoryCheck();
            // });
            cartInventoryCheck();
        }
        var checkoutButton = document.querySelector(".cart__submit");
        var additionalCheckoutButtons = document.querySelector(
            ".additional-checkout-buttons"
        );
        var inventoryWarning = document.querySelector("#cartInventoryWarning");
        if (soldOutCounter > 0) {
            checkoutButton.setAttribute("disabled", "true");
            additionalCheckoutButtons.setAttribute("style", "display: none");
            inventoryWarning.setAttribute("style", "display: block");
        } else {
            checkoutButton.removeAttribute("disabled");
            additionalCheckoutButtons.setAttribute("style", "display: block");
            inventoryWarning.setAttribute("style", "display: none");
        }
    })
    // .then(function () {
    //     console.log(soldOutCounter);
    //     if (soldOutCounter > 0) {
    //         checkoutButton.setAttribute("disabled", "true");
    //         additionalCheckoutButtons.setAttribute("style", "display: none");
    //     } else {
    //         checkoutButton.setAttribute("disabled", "false");
    //         additionalCheckoutButtons.setAttribute("style", "display: block");
    //     }
    // })
    .catch(() => {});
