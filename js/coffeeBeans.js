function imageButtonChanger(){  
    const buttonOfTheDay = document.querySelectorAll(".cappuccino-button-carousel");
    buttonOfTheDay.forEach((e) =>{
        e.addEventListener("click", () =>{
            document.querySelector(".activeButton").classList.remove("activeButton");
            e.classList.add("activeButton");
        });     
    });
}

function imageChanger(){
    const imameButtons = document.querySelectorAll(".article-left-panel-button-list button");
    const coffeeOfTheDay = document.getElementById("image-changer");
    imameButtons.forEach(e =>{
        e.addEventListener("click", () =>{
           coffeeOfTheDay.src = e.dataset.img;
        });     
    });
}
window.addEventListener('load', () => {
  imageButtonChanger();
  imageChanger();
});


function coffeeMonthAddToCart(){
    const coffeeMonthAddToCartBtn = document.getElementById("coffee-month-add-to-cart-btn");
    const coffeeMonthItemEl = document.getElementById("coffee-month-item");
    const coffeeMonthItemImgEl = document.getElementById("cappuccino-image");
    const coffeeMonthItemPriceEl = document.getElementById("cappuccino-price");
    const coffeeMonthItemText = document.getElementById("cappuccino-descript");
    const coffeeMonthItemShip = document.getElementById("cappuccino-shipping"); 
    if (!coffeeMonthAddToCartBtn || 
        !coffeeMonthItemEl || 
        !coffeeMonthItemImgEl || 
        !coffeeMonthItemPriceEl || 
        !coffeeMonthItemText || 
        !coffeeMonthItemShip) return;
    const coffeeMonthItem = coffeeMonthItemEl.textContent;
    const coffeeMonthItemImg = coffeeMonthItemImgEl.src;
    const coffeeMonthItemPrice = coffeeMonthItemPriceEl.textContent.replace('$', '');
    const coffeeMonthItemDescript = coffeeMonthItemText.textContent;
    const coffeeMonthItemShipping = coffeeMonthItemShip.textContent;

    coffeeMonthAddToCartBtn.addEventListener("click", () =>{   
        let cartContent = JSON.parse(localStorage.getItem("cartContent"))||{
            items: [],
            cartCounter: 0
        };
        const itemExisting = cartContent.items.find(
            cartItem => cartItem.item === coffeeMonthItem
        );
        if(itemExisting) {
            alert("Item already in the cart");
            return;
        }
        const coffeeList = [
                "Espresso",
                "Ristretto",
                "Lungo",
                "Doppio",
                "Red eye",
                "Americano",
                "Latte",
                "Cappuccino",
                "Flat white",
                "Cafe Au Lait",
                "Cortado",
                "Macchiato",
                "Mocha"
            ];
        const tax = coffeeList.includes(coffeeMonthItem) ? 0.75 : 0;
        let shippingFee;
        if(coffeeMonthItemShipping !== "Free Shipping") {
            shippingFee = coffeeMonthItemShipping.replace('$', '');
        } else {
            shippingFee = 0;
        }
        cartContent.items.push({
            item: coffeeMonthItem,
            itemImg: coffeeMonthItemImg,
            itemDescript: coffeeMonthItemDescript,
            itemShipping: coffeeMonthItemShipping,
            itemPrice: coffeeMonthItemPrice,
            itemQty: 1,
            itemSubTotal: coffeeMonthItemPrice,
            itemShipFee: shippingFee,
            itemTax: tax
        });
        //productQty += 1;
        cartContent.cartCounter = cartContent.items.reduce((total, item) => total + (item.itemQty || 0), 0);
        localStorage.setItem("cartContent", JSON.stringify(cartContent));
        document.getElementById("cart-item-counter-display").textContent = cartContent.cartCounter;            
    }); 
}
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("coffee-month-add-to-cart-btn")) {
        coffeeMonthAddToCart();
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cartContent"));
    const counterEl = document.getElementById("cart-item-counter-display");
    if (cart && counterEl) {
        counterEl.textContent = cart.cartCounter || 0;
    }
});

function itemInCart(){
    const cartContainer = document.getElementById("cart-item-display-container");
    if (!cartContainer) return;
    let cartContent = JSON.parse(localStorage.getItem("cartContent"));
    if (!cartContent || !Array.isArray(cartContent.items)) return;
    const ul = document.createElement("ul");
    ul.className = "cart-item-list";
    cartContent.items.forEach((item) =>{
    const itemColumn = document.createElement("li");
    itemColumn.className = "cart-item-container";
        itemColumn.innerHTML = `
        <div class="item-info">
            <img src="${item.itemImg}" alt="cart item" />
            <div class="item-cart-description">
                <h3>${item.item}</h3>
                <p>${item.itemDescript}</p>
                <span>${item.itemShipping}</span>
                <button class="delete-item-button" data-item="${item.item}">Delete</button>
            </div>
        </div>
        <div class="price">
            <h3>Price: $<span>${item.itemPrice}</span></h3>
        </div>
        <div class="quantity">
            <button class="minus-btn">-</button>
            <span class="item-qty">${item.itemQty}</span>
            <button class="add-btn">+</button>
        </div>
        <div class="total">
            <h3>Total: $<span class="total-display">${item.itemSubTotal}</span></h3>
        </div>
    `;
    ul.appendChild(itemColumn);
    });  
    cartContainer.innerHTML = "";
    cartContainer.prepend(ul);
    document.getElementById("cart-item-counter").textContent = cartContent.cartCounter;  
}
document.addEventListener("DOMContentLoaded", itemInCart);

function addToCart(){
    const addToCartBtn = document.querySelectorAll(".add-to-cart-button");
    addToCartBtn.forEach(btn => {
        btn.addEventListener("click", (e) =>{
            const itemContainer = e.target.closest(".product-sale-item-container");  
            const itemName = itemContainer.querySelector("h4").textContent;
            const itemImage = itemContainer.querySelector("img").src;
            const itemDescript = itemContainer.querySelector("p").textContent;
            const itemShipping = itemContainer.querySelector("h5").textContent;
            let Price = itemContainer.querySelector("span").textContent;
            const itemPrice = Price.replace('$', '');
            let cartContent = JSON.parse(localStorage.getItem("cartContent"))||{
                    items: [],
                    cartCounter: 0
            };
            const itemExisting = cartContent.items.find(item => item.item === itemName)
            if(itemExisting) {
                alert("Item already in the cart");
                return;
            }
            const coffeeList = [
                "Espresso",
                "Ristretto",
                "Lungo",
                "Doppio",
                "Red eye",
                "Americano",
                "Latte",
                "Cappuccino",
                "Flat white",
                "Cafe Au Lait",
                "Cortado",
                "Macchiato",
                "Mocha"
            ];
            const tax = coffeeList.includes(itemName) ? 0.75 : 0;
            let shippingFee;
            if(itemShipping !== "Free Shipping") {
                shippingFee = itemShipping.replace('Shipping Fee: $', '');
            } else {
                shippingFee = 0;
            }
            if(itemContainer) {
                cartContent.items.push({
                    item: itemName,
                    itemImg: itemImage,
                    itemDescript: itemDescript,
                    itemShipping: itemShipping,
                    itemPrice: itemPrice,
                    itemQty: 1,
                    itemSubTotal: itemPrice,
                    itemShipFee: shippingFee,
                    itemTax: tax
                });
            }
            //localStorage.setItem("cartContent", JSON.stringify(cartContent))
            cartContent.cartCounter = cartContent.items.reduce((total, item) => total + (item.itemQty || 0), 0);
            localStorage.setItem("cartContent", JSON.stringify(cartContent));
            document.getElementById("cart-item-counter-display").textContent = cartContent.cartCounter;           
        });
    });
}
document.addEventListener("DOMContentLoaded", addToCart);

function addToCartOther(){
    const addBtn = document.querySelectorAll(".add-to-cart-other-button");
    addBtn.forEach(btn => {
        btn.addEventListener("click", (e) =>{
            const containerEl = e.target.closest(".other-items");
            const itemNameEl = containerEl.querySelector("h4");
            const itemImageEl = containerEl.querySelector("img");
            const itemDescriptEl =containerEl.querySelector("p");
            const itemShipEl = containerEl.querySelector("h5");
            let itemPriceEl = containerEl.querySelector("span");
            if( !itemNameEl||
                !itemImageEl ||
                !itemDescriptEl ||
                !itemShipEl||
                !itemPriceEl
            ) return;

            const otherItemName = itemNameEl.textContent;
            const otherItemImage = itemImageEl.src;
            const otherItemDescript = itemDescriptEl.textContent;
            const otherItemShip = itemShipEl.textContent;
            const otherItemShipFee = otherItemShip.replace('Shipping Fee: $', '');
            const otherPrice = itemPriceEl.textContent;
            const otherItemPrice = otherPrice.replace('$', '');
            
            let cartContent = JSON.parse(localStorage.getItem("cartContent"))||{
                items: [],
                cartCounter: 0
            };
            if(!cartContent || !Array.isArray(cartContent.items)){
                return 0;
            }
            const itemExisting = cartContent.items.find(item => item.item === otherItemName);
            
            if(itemExisting){
                alert("Item already in the cart");
                return;
            }
            let tax = 0;
            switch(otherItemName){
                case "Mug":
                tax = 0.75
                break;

                case "Paper Cup":
                tax = 0.25
                break;

                case "V60 Coffee Filter":
                tax = 0.50
                break;

                case "Transparent Dripper":
                tax = 0.75
                break;
            }
            
            //if(containerEl){
                cartContent.items.push({
                    item: otherItemName,
                    itemImg: otherItemImage,
                    itemDescript: otherItemDescript,
                    itemShipping: otherItemShip,
                    itemPrice: otherItemPrice,
                    itemQty: 1,
                    itemSubTotal: otherItemPrice,
                    itemShipFee: otherItemShipFee,
                    itemTax: tax
                });
            //}

            //localStorage.setItem("cartContent", JSON.stringify(cartContent));
            cartContent.cartCounter = cartContent.items.reduce((total, item) => total + item.itemQty, 0);
            localStorage.setItem("cartContent", JSON.stringify(cartContent));
            document.getElementById("cart-item-counter-display").textContent = cartContent.cartCounter; 
        });
    });
}
document.addEventListener("DOMContentLoaded", addToCartOther);

function itemIncreaseDecrease(){   
    const cartContainer = document.getElementById("cart-item-display-container");
    if (!cartContainer) return;
    cartContainer.addEventListener("click", (e) =>{
        if( e.target.classList.contains("add-btn") ) {
            const itemContainer = e.target.closest(".cart-item-container");
            if (!itemContainer) return;
            const qtySpan = itemContainer.querySelector(".item-qty");
            const itemName = itemContainer.querySelector("h3").textContent;
            const cartContent = JSON.parse(localStorage.getItem("cartContent"));
            if(!cartContent) return;
            const itemData = cartContent.items.find(item => item.item === itemName);
            if(!itemData) return;
            itemData.itemQty = Number(qtySpan.textContent) + 1;
            itemData.itemSubTotal = (itemData.itemQty * itemData.itemPrice).toFixed(2);
            qtySpan.textContent = itemData.itemQty;
            let totalSpan = itemContainer.querySelector(".total-display");
            if(totalSpan) {
                totalSpan.textContent = itemData.itemSubTotal;
            }
            cartContent.cartCounter = cartContent.items.reduce((total, item) => total + (item.itemQty || 0), 0);
            localStorage.setItem("cartContent", JSON.stringify(cartContent));
            document.getElementById("cart-item-counter").textContent =  cartContent.cartCounter;
            
        }
        if( e.target.classList.contains("minus-btn")  ) {
            const itemContainer = e.target.closest(".cart-item-container");
            if (!itemContainer) return;
            const qtySpan = itemContainer.querySelector(".item-qty");
            const itemName = itemContainer.querySelector("h3").textContent;           
            if(qtySpan.textContent > 1){
                 const cartContent = JSON.parse(localStorage.getItem("cartContent"));
                if(!cartContent) return;
                const itemData = cartContent.items.find(item => item.item === itemName);
                if(!itemData) return;
                itemData.itemQty = Number(qtySpan.textContent) - 1;             
                itemData.itemSubTotal = (itemData.itemSubTotal - itemData.itemPrice).toFixed(2);
                qtySpan.textContent = itemData.itemQty;
                let totalSpan = itemContainer.querySelector(".total-display");
                if(totalSpan) {
                    totalSpan.textContent = itemData.itemSubTotal;
                }
                cartContent.cartCounter = cartContent.items.reduce((total, item) => total + (item.itemQty || 0), 0);
                localStorage.setItem("cartContent", JSON.stringify(cartContent));
                document.getElementById("cart-item-counter").textContent =  cartContent.cartCounter;
                
            }   
        }
        displaySubTotal(); 
        displayShipFeeTotal(); 
        displayGrandTotal();
        displayTax();
        cartPageCounter();
    });   
}
window.addEventListener("DOMContentLoaded", itemIncreaseDecrease);

function deleteFromCart(){
    const cartContainer = document.getElementById("cart-item-display-container");
    if(!cartContainer) return;  
    cartContainer.addEventListener("click", (e) =>{
        const btn = e.target.closest(".delete-item-button");
        if(!btn) return;
        const itemName = btn.dataset.item;
        let cartContent = JSON.parse(localStorage.getItem("cartContent"));
        if (!cartContent || typeof cartContent !== "object") return;
        if (!Array.isArray(cartContent.items)) {
            cartContent.items = [];
        }
        cartContent.items = cartContent.items.filter(item => item.item !== itemName);
        cartContent.cartCounter = cartContent.items.reduce((total, item) => total + (item.itemQty || 0), 0); 
        localStorage.setItem("cartContent", JSON.stringify(cartContent));
        document.getElementById("cart-item-counter").textContent =  cartContent.cartCounter;
        itemInCart();
        displayGrandTotal();
        displayTax();
        cartPageCounter();
    });
}
document.addEventListener("DOMContentLoaded", deleteFromCart);

function cartPageCounter(){
    
    let cartContent = JSON.parse(localStorage.getItem("cartContent"));
    if(!cartContent) {
        return ;
    }
    const count = cartContent.cartCounter || 0;
    
    const itemCount = document.getElementById("cart-item-counter");
    const itemLabel = document.getElementById("cart-item-label");

    if(!itemCount || !itemLabel) return;

    itemCount.textContent = count;
    itemLabel.textContent = count === 1 ? "item" : "items";
}

function subTotalCalc(){
    let cartContent = JSON.parse(localStorage.getItem("cartContent"));
    if (!cartContent || !Array.isArray(cartContent.items)){
        return 0;
    }
    return cartContent.items.reduce((sum, item) => {
        return sum + (Number(item.itemPrice) * Number(item.itemQty));
    }, 0);
}
function displaySubTotal(){
    let subTotal = document.getElementById("sub-total");
    if (subTotal) {
        subTotal.textContent = subTotalCalc().toFixed(2);
    }
}
document.addEventListener("DOMContentLoaded", displaySubTotal);

function itemTax(){
    let cartContent = JSON.parse(localStorage.getItem("cartContent"));
    if(!cartContent || !Array.isArray(cartContent.items)) {
        return 0;
    }
    return cartContent.items.reduce((sum, item) =>{
        return sum + (Number(item.itemTax || 0) * item.itemQty);
    }, 0);
}
function displayTax(){
    let taxTotal = document.getElementById("tax");
    if (taxTotal) {
        const cartContent = JSON.parse(localStorage.getItem("cartContent"));
        if(!cartContent) return;       
        taxTotal.textContent = itemTax().toFixed(2);
    }
}
document.addEventListener("DOMContentLoaded", displayTax);

function shippingFee(){
    let cartContent = JSON.parse(localStorage.getItem("cartContent"));
    if(!cartContent || !Array.isArray(cartContent.items)) {
        return 0;
    }
    return cartContent.items.reduce((sum, item) =>{
        return sum + Number(item.itemShipFee * item.itemQty);
    }, 0);
}
function displayShipFeeTotal(){
    let shipFeeTotal = document.getElementById("shipping-fee");
    if(shipFeeTotal){
        const cartContent = JSON.parse(localStorage.getItem("cartContent"));
        if(!cartContent) return;
        shipFeeTotal.textContent = shippingFee().toFixed(2);
    }
}
document.addEventListener("DOMContentLoaded", displayShipFeeTotal);

function grandTotal(){
    let cartContent = JSON.parse(localStorage.getItem("cartContent"));
    if(!cartContent || !Array.isArray(cartContent.items)) {
        return 0;
    }
    let subTotal = Number(subTotalCalc());
    let totalTax = Number(itemTax());
    let totalShipFee = Number(shippingFee());
    if(isNaN(subTotal) || isNaN(totalTax) || isNaN(totalShipFee)) {
        return 0;
    }
    return subTotal + totalTax + totalShipFee;
}
function displayGrandTotal(){
    let grandTotalEl = document.getElementById("grand-total");
    if(! grandTotalEl) return;
    const cartContent = JSON.parse(localStorage.getItem("cartContent"));
    if(!cartContent) return;
    grandTotalEl.textContent = grandTotal().toFixed(2);
}
document.addEventListener("DOMContentLoaded", displayGrandTotal);




const carouselWrapper = document.querySelector(".product-sale-list-item-container");
const coffeeSlides = document.querySelectorAll(".product-sale-item-container");

const coffeeVisibleSlides = 4;
let coffeeCurrentIndex = 0;
let coffeeSlideWidth;

function updateCoffeeSlideWidth(){
    //coffeeSlideWidth = coffeeSlides[0].offsetWidth + 20;
  const first = coffeeSlides[0];
  const second = coffeeSlides[1];
  if(!first || !second) return;
  const firstRect = first.getBoundingClientRect();
  const secondRect = second.getBoundingClientRect();

  coffeeSlideWidth = secondRect.left - firstRect.left;
}

function updateCoffeeCarousel(){
    if(!carouselWrapper) return;
    carouselWrapper.style.transform = `translateX(${-coffeeCurrentIndex * coffeeSlideWidth}px)`;
    updateCoffeeDot();
}
window.addEventListener("resize", () =>{
    updateCoffeeSlideWidth();
    updateCoffeeCarousel();
});

function addMinusQty(){
    
const coffeePrevBtn = document.querySelector(".coffeePrev");
const coffeeNextBtn = document.querySelector(".coffeeNext");
const coffeeMaxIndex = coffeeSlides.length - coffeeVisibleSlides;

if(!coffeePrevBtn || !coffeeNextBtn) return;
coffeePrevBtn.addEventListener("click", () =>{
    if ( coffeeCurrentIndex <= 0 ) {
        coffeeCurrentIndex = coffeeMaxIndex;
    } else {
        coffeeCurrentIndex--;
    }
    updateCoffeeCarousel();
});

coffeeNextBtn.addEventListener("click", () =>{
    if ( coffeeCurrentIndex >= coffeeMaxIndex ) {
        coffeeCurrentIndex = 0;
    } else {
        coffeeCurrentIndex++;
    }
    updateCoffeeCarousel();
});
}
addMinusQty();


const coffeeDots = document.querySelector(".coffee-dots");
const coffeeTotalDots = coffeeSlides.length - coffeeVisibleSlides + 1;

function coffeeDot(){
    coffeeDots.innerHTML = "";
    for ( let i = 0; i < coffeeTotalDots; i++) {
        const dot = document.createElement("button");

        dot.addEventListener("click", () =>{
            coffeeCurrentIndex = i;
            updateCoffeeCarousel();
        });
       coffeeDots.appendChild(dot);
    }
     updateCoffeeDot();
}

function updateCoffeeDot(){
    if(!coffeeDots) return;
    const dots = coffeeDots.querySelectorAll("button");
    if(!dots) return;
    dots.forEach((dot, coffeeIndex) =>{
        dot.classList.toggle("coffeeActive", coffeeIndex === coffeeCurrentIndex);
    });
}

window.addEventListener('load', () => {
  if (!coffeeDots) return;
  updateCoffeeSlideWidth();
  updateCoffeeCarousel();
  updateCoffeeDot();
});
