import { cart, removeFromCart, calculateCartQuantity, saveToStorage, updateDeliveryOption } from "../product/cart.js";


import { products, getProduct } from "../product/product-data.js";

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

import { deliveryOptions, getDeliveryOption } from "../deliveryOptions.js"; 

import { renderPaymentSummary } from "./paymentSummary.js";

const today = dayjs();
//the below commented code can add an amount of days
//to the current day we can also make it easier to
//read using the format method abi function??? whatever...
//const deliveryDate = today.add(7, 'days')
const todayInReadableFormat = today.format('dddd');
const todayInReadableFormat1 = today.format('MMM');
const todayInReadableFormat2 = today.format('D');
console.log(todayInReadableFormat, todayInReadableFormat1, todayInReadableFormat2)
console.log(document.querySelector('.today-js').innerHTML)
document.querySelector('.today-js').innerHTML = todayInReadableFormat
document.querySelector('.today-js1').innerHTML = todayInReadableFormat1
document.querySelector('.today-js2').innerHTML = todayInReadableFormat2


export function renderOrderSummary() {
    

    
let cartSummaryHTML = '';



//we imported products because we do not have to
//create object to get the products name price...etc
//we can just compare the product id of the one in the
//cart and the one in the products page and if they are
//the same then we'll make use of the details like the
//name, price, etc

cart.forEach((cartItem)=>{
    

    const productId = cartItem.productId;


    let matchingProduct = getProduct(productId);
    updateCartQuantity();

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId)

    
    cartSummaryHTML += 
    `
    <tr class="js-cart-item-container-${matchingProduct.id}">
        <td class="center"><img src="${matchingProduct.image}" alt="" width="100"></td>
        <td class="capitalize">${matchingProduct.name}</td>
        <td><span class="naira-sign">₦</span>${matchingProduct.priceInCent / 100}</td>
        <td>
            <div class="selection-update-container">
                <div class="input-stepper">
                    <div class="plus-minus-container">
                        <i class="fa-solid fa-minus js-minus" data-matching-product-id ="${matchingProduct.id}"></i>
                    </div>
                    
                    <p class="input-stepper-display js-input-stepper js-quantity-selector-${matchingProduct.id}"  data-matching-product-id ="${matchingProduct.id}"></p>      
                    
                    <div class="plus-minus-container">
                        <i class="fa-solid fa-plus js-plus js-plus-${matchingProduct.id}"  data-matching-product-id ="${matchingProduct.id}"></i>
                    </div>
                </div>
                <button class="update-checkout-item js-update-checkout-item" 
                data-matching-product-id ="${matchingProduct.id}" id="js-show-update-button-${matchingProduct.id}">update</button>
            </div>    
        </td>
        <td>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </td>
        <td><i class="fa-solid fa-trash js-delete-link" data-matching-product-id ="${matchingProduct.id}"></i></td>
    </tr>
    `
});

document.querySelector('.js-tbody').innerHTML = cartSummaryHTML;
//document.querySelector('.js-tbody').innerHTML += cartSummaryHTML;



function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html =  '';
    deliveryOptions.forEach((deliveryOption)=>{
        //day js is an external library for days months etc
        const today = dayjs();
        //delivery date adds delivery option.delivery days of the cartItem
        //to the days
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');


        //each delivery option has priceInCent within the object so if it is 0 we display
        //free but if it is not then it displays the shipping price
        
        const priceString = deliveryOption.priceCent === 0
        ?'FREE'
        :`₦${deliveryOption.priceCent} -`;
        //console.log(cartItem)
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        
        html += `
        <div class="delivery-option js-delivery-option" data-product-id= "${matchingProduct.id}"
        data-delivery-option-id=${deliveryOption.id}>
            <input type="radio" ${isChecked ? 'checked' :''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div class="delivery-option-date-and-option-container">
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
            </div>
        </div>
        ` 
    });
    return html;
}



incrementAndDecrease();
//selected all of the select buttons on the page
document.querySelectorAll('.js-input-stepper').forEach((item)=>{
    //got their ids by using dataset
    const selectId = item.dataset.matchingProductId;
    let checkId;

    cart.forEach((cartItem2)=>{
        const productId = cartItem2.productId;
        if (productId === selectId ) {
        checkId = item
        item.innerHTML = cartItem2.quantity
    }
    });    
})


//first we get all of the ids by using the query selector all then
//for each of them we add an event listener that makes it get the
//id of the deleted item for more fucking info check the cart.js
document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
        const productId = link.dataset.matchingProductId;
        removeFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        //the .remove is a special command that can be used to remove items with
        //a specific class that we have selected using the DOM.
        container.remove();
        renderPaymentSummary();
        updateCartQuantity();
    });
})


//explaining this function... what happens is that each time 
//the page loads it makes cart quantity to be zero
//for each item in the cart...
//it checks the quantity of all items in the page and adds them
//to cartQuantity...
//same thing happens when we delete any item from the cart
//it checks the quantity of items in the cart then re-updates the cart.

function updateCartQuantity() {
    //remember that the return function returns something
    //so after we calculate what cart quantity is we return
    //it into cart quantity and we make cart the counter = whatever was returned
    //seems complex but when we think of it...it should work fine
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-items-counter').innerHTML = `${cartQuantity}`
}










//jose this function is copied a-lot of times i challenge you to make it work
//with export and also de-clutter the code if you can.
//you forged this shitty function yourself so if you`re wondering how it
//works you'll figure it out yourself
function incrementAndDecrease() {
    document.querySelectorAll('.js-plus').forEach((plusButton)=>{
        plusButton.addEventListener('click', ()=>{
            //don't think this product name dataset is'nt useful its dataset is what makes 
            //everything here works
            function increment() {
                const productName = plusButton.dataset.matchingProductId;
                const show = document.getElementById(`js-show-update-button-${productName}`).style.display = 'flex';
                let currentSelection = document.querySelector(`.js-quantity-selector-${productName}`);
                let convert = Number(currentSelection.innerHTML)
                convert += 1;
                currentSelection.innerHTML = convert;
            }
            increment();
            document.querySelectorAll('.js-update-checkout-item').forEach((updateButton)=>{
                updateButton.addEventListener('click', ()=>{

                    function updateCartFromCheckout() {
                        cart.forEach((cartItem2)=>{
                            const productId2 = updateButton.dataset.matchingProductId;
                            const quantitySelector = document.querySelector(`.js-quantity-selector-${productId2}`);
                            const productId = cartItem2.productId;

                            if (productId === productId2 ) {
                                cartItem2.quantity = Number(quantitySelector.innerHTML);
                                saveToStorage();
                                console.log(cartItem2.quantity);
                                console.log(cart);
                                renderOrderSummary();
                            }
                        });
                    };
                    updateCartFromCheckout();          
                });
            })
        });
    });
    //even though as a programmer im not supposed to repeat my codes...
    //im not strong enough to make this function work as an export so
    //ill just copy it and paste it in the checkout.js and make the changes
    //to make it work *sighs*

    document.querySelectorAll('.js-minus').forEach((minusButton)=>{
        minusButton.addEventListener('click', ()=>{
            function decrement() {
                const productName = minusButton.dataset.matchingProductId;
                const show = document.getElementById(`js-show-update-button-${productName}`).style.display = 'flex';
                const updateButton = document.querySelector(`js-show-update-button-${productName}`)
                let quantitySelector = document.querySelector(`.js-quantity-selector-${productName}`)

                let currentSelection = document.querySelector(`.js-quantity-selector-${productName}`);
                let convert = Number(currentSelection.innerHTML)
                convert -= 1
                if (convert < 1) {
                    convert = 1;
                }
                console.log(convert)
                currentSelection.innerHTML = convert;
                console.log(updateButton)
            }
            decrement();
        })
    })    
}


document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
        const productId = element.dataset.productId
        const deliveryOptionId = element.dataset.deliveryOptionId
        updateDeliveryOption(productId, deliveryOptionId)
        renderOrderSummary();
        renderPaymentSummary();
    })
})
}
renderOrderSummary();