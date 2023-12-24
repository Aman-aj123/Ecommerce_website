// Setting loader animation to the page
function loaderAnimation() {
    const loader = document.querySelector("#loader");
    loader.style.visibility = "hidden";
}
// Calling all the main functions after page relaod
window.addEventListener('load', () => {
    console.log("Window loaded...");
    loaderAnimation();
    displayListItems();
    cartFunctionality();
loadSavedData()
});

//  This function is loading all the data in localStorage
function loadSavedData() {
    console.log("localSavedData called...")
    loadData('cartContainer', document.querySelector('.cart-container'));
    loadData('TotalPriceValue', document.querySelector('.total-price-value'));
    loadData('Cart heading', document.querySelector('.cartArea .cart-heading'));
    loadData('cartIconNumber', document.querySelector('.cartItemsNumber'));
    loadData('cart-action-buttons', document.querySelector('.cart-action-buttons'));
}


// showElementByCrossIcon function
function showElementByCrossIcon(showIconElement, showElement, addClassName) {
    const mainShowElement = document.querySelector(showIconElement);
    const mainElement = document.querySelector(showElement);
    mainShowElement.addEventListener("click", () => {
        mainElement.classList.add(addClassName);
    })
}
// hideElementByCrossIcon function
function hideElementByCrossIcon(crossIconElement, crossElement, removeClassName) {
    const mainCrossElement = document.querySelector(crossIconElement);
    const mainElement = document.querySelector(crossElement);
    mainCrossElement.addEventListener("click", () => {
        mainElement.classList.remove(removeClassName);
    })
}
//addToggleClass function
function addToggleClass(toggleIconElement, toggleElement, toggleClassName) {
    const mainToggleElement = document.querySelector(toggleIconElement);
    const mainElement = document.querySelector(toggleElement);
    mainToggleElement.addEventListener("click", () => {
        mainElement.classList.toggle(toggleClassName);
    })
}

// displayListItems function
function displayListItems() {
    addToggleClass('#bar', '.changeBg', 'hideChangeBg');

    const hamburgerIcon = document.querySelector('#bar');
    const header = document.querySelector(".main-items");
    hamburgerIcon.onclick = function () {
        header.classList.toggle("displayMenu");
        if (hamburgerIcon.classList.contains('fa-bars')) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-xmark')
        } else {
            hamburgerIcon.classList.remove('fa-xmark')
            hamburgerIcon.classList.add('fa-bars');
        }
    }
}


// Displaying accountBox
showElementByCrossIcon('.login-icon', '.account-box-container', 'displayAccountBox');
// Hiding accountBox
hideElementByCrossIcon('.account-box-cross-icon', '.account-box-container', 'displayAccountBox');

// Displaying cartArea
showElementByCrossIcon("#Cart-icon", ".cartArea-container", "showCartArea");
// Hiding cartArea
hideElementByCrossIcon(".cartArea-cross-icon", ".cartArea-container", "showCartArea")



// cartFunctionality function
function cartFunctionality() {
    console.log("cartFunctionality function called...")
    // Intializing important variables
    const cartActionButtons = document.querySelector('.cart-action-buttons');
    const clearCartButton = document.querySelector('.clear-cart-btn button');
    const buyCartButton = document.querySelector('.buy-cart-btn button');
    const cartContainer = document.querySelector('.cart-container');
    const cartButtons = document.querySelectorAll('.fa-cart-shopping');
    const totalPriceValue = document.querySelector('.total-price-value');
    const cartHeading = document.querySelector('.cartArea .cart-heading');
    const cartIconNumber = document.querySelector('.cartItemsNumber');

    let totalPrice = 0;

    // setting cartArea Values
    loadData('cartContainer', cartContainer);
    // setting totalPriceValue
    loadData("TotalPriceValue", totalPriceValue);
    // setting cartHeading innerHTML
    loadData('Cart heading', cartHeading);
    // setting cartIconNumber innerHTML
    loadData('cartIconNumber', cartIconNumber);
    // setting the cartActionButtons innerHTML and styles
    loadData('cart-action-buttons', cartActionButtons);

    // Iterating cartButton and adding EventListener 
    let productArr = [];
    cartButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const productImage = btn.parentNode.querySelector('.product-image img');
            const productText = btn.parentNode.querySelector('.product-main-text h4').innerHTML;
            const productPrice = parseInt(btn.parentNode.querySelector('.product-main-text h3').innerHTML.replace('$', ''));

            totalPrice += productPrice;
            totalPriceValue.innerHTML = `$${totalPrice}`;
            saveData("TotalPriceValue", totalPriceValue.innerHTML);

            cartContainer.innerHTML += `
            <div class="cart-items">
                        <div class="product-cart-image"><img src="${productImage.src}"></div>
                        <div class="product-title">${productText}</div>
                        <div class="product-price">$${productPrice}</div>
                    </div>
            `
            let availableProduct = [
                {
                    Image: productImage,
                    Text: productText,
                    Price: productPrice,
                }
            ];
            productArr.push(availableProduct)
            if (productArr.length == 0) {
                cartHeading.innerHTML = "Your cart is empty"
                buyCartButton.disabled = true;
                clearCartButton.disabled = true;
                buyCartButton.style.opacity = ".5";
                clearCartButton.style.opacity = ".5";
            } else {
                cartHeading.innerHTML = "Items in your cart"
                buyCartButton.disabled = false;
                clearCartButton.disabled = false;
                buyCartButton.style.opacity = "1";
                clearCartButton.style.opacity = "1";
            }
            cartIconNumber.innerHTML = productArr.length;

            saveData('cartIconNumber', cartIconNumber.innerHTML);
            saveData('cartContainer', cartContainer.innerHTML);
            saveData('Cart heading', cartHeading.innerHTML);
            saveData('cart-action-buttons', cartActionButtons.innerHTML);
        })
    })

    // Clearing the cartArea items by clicking on clearCartButton
    clearCartButton.addEventListener('click', () => {
        cartContainer.innerHTML = "";
        clearCartButton.textContent = "Cart cleared";
        setTimeout(() => {
            clearCartButton.textContent = "Clear cart";
        }, 6000)
        cartIconNumber.innerHTML = "0";
        cartHeading.innerHTML = "Your cart is empty"
        totalPriceValue.innerHTML = "$00";

        buyCartButton.disabled = true;
        clearCartButton.disabled = true;
        buyCartButton.style.opacity = ".5";
        clearCartButton.style.opacity = ".5";

        saveData('cartIconNumber', cartIconNumber.innerHTML);
        saveData("TotalPriceValue", totalPriceValue.innerHTML);
        saveData('cartContainer', cartContainer.innerHTML);
        saveData('Cart heading', cartHeading.innerHTML);
        saveData('cart-action-buttons', cartActionButtons.innerHTML);
    })

    // Buy cart button function
    function buyCart() {
        buyCartButton.addEventListener("click", () => {
            window.open("order.html", "_blank");
        })
    }
    buyCart()
}



// Save Elements in localStorage
// saveData function
function saveData(key, value) {
    localStorage.setItem(key, value)
}
// loadData function
function loadData(key, value) {
    const getItem = localStorage.getItem(key);
    if (getItem) {
        value.innerHTML = getItem;
    }
}




// accountBoxValidation 
function accountBoxValidation(event) {
    const userInput = document.querySelector('.user-input');
    const emailInput = document.querySelector('.email-input');
    const passowordInput = document.querySelector('.passoword-input');
    const confirmPassowordInput = document.querySelector('.confirmPassoword-input');

    // validation for userInput
    if (userInput.value.trim().length < 6) {
        showErrorMessages(".user-error", "Username is too short");
        showErrorBorder('.user');
        return false;;
    }
    else if (userInput.value.trim().length > 20) {
        showErrorMessages(".user-error", "Username is too long")
        showErrorBorder('.user');
        return false;
    }
    else {
        showErrorMessages(".user-error", "")
        showSucessBorder('.user');
    }

    // validation for passoword
    if (passowordInput.value.trim().length < 6) {
        showErrorMessages(".passoword-error", "Passoword is too short");
        showErrorBorder('.passoword');
        return false;
    }
    else if (passowordInput.value.trim().length > 18) {
        showErrorMessages(".passoword-error", "Passoword is too long")
        showErrorBorder('.passoword');
        return false;
    }
    else {
        showErrorMessages(".passoword-error", "")
        showSucessBorder('.passoword');
    }

    // validation for confirm passoword
    if (passowordInput.value.trim() !== confirmPassowordInput.value.trim()) {
        showErrorMessages(".confirmPassoword-error", "Passoword dosen't match");
        showErrorBorder('.confirmPassoword');
        return false;
    }
    else {
        showErrorMessages(".confirmPassoword-error", "");
        showSucessBorder('.confirmPassoword');
    }

    event.preventDefault();

    // Hiding accountBox
    hideElementByCrossIcon('.account-box-cross-icon', '.account-box-container', 'displayAccountBox');

    const userProfile = document.querySelector('.user-profile');
    // Showing userProfile
    userProfile.classList.add('show-user-profile')

    // Hiding signIn box
    const accountButton = document.querySelector('#account-btn');
    accountButton.classList.add('hide-account-button');

    // Hiding account box
    const hideAccountBox = document.querySelector('.account-box-container')
    hideAccountBox.classList.remove("displayAccountBox");

    // Setting the first letter of user-profile 
    const firstUserProfileLetter = userInput.value.trim()[0];
    userProfile.innerHTML = firstUserProfileLetter;

    // loading accountButton and user-profile 
    loadData("user-profile-text", userProfile);
    loadData("accountButton", accountButton);


    // showErrorMessages function 
    function showErrorMessages(element, errorMessage) {
        const inputElement = document.querySelector(element);
        inputElement.innerHTML = errorMessage;
    }

    // showSucessMessage function
    function showSucessBorder(sucessElement) {
        const mainSucessElement = document.querySelector(sucessElement);
        mainSucessElement.style.border = "2px solid green";
    }
    // showSucessMessage function
    function showErrorBorder(errorElement) {
        const mainErrorElement = document.querySelector(errorElement);
        mainErrorElement.style.border = "2px solid red";
    }
    // loading user-profile and accountButton
    // loadData("user-profile-text", userProfile);
    // loadData("accountButton", accountButton);

    // saving user-profile and accountButton
    // saveData("user-profile-text", userProfile.innerHTML);
    // saveData("accountButton", accountButton.innerHTML);

}


// showErrorMessages function 
function showErrorMessages(element, errorMessage) {
    const inputElement = document.querySelector(element);
    inputElement.innerHTML = errorMessage;
}

// showSucessMessage function
function showSucessBorder(sucessElement) {
    const mainSucessElement = document.querySelector(sucessElement);
    mainSucessElement.style.border = "2px solid green";
}
// showSucessMessage function
function showErrorBorder(errorElement) {
    const mainErrorElement = document.querySelector(errorElement);
    mainErrorElement.style.border = "2px solid red";
} 
