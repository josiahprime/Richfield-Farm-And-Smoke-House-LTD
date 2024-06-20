import {deliveryOptions, getDeliveryOption } from "../deliveryOptions.js";

import { cart } from "../product/cart.js";

import { getProduct } from "../product/product-data.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCent = 0;
    //console.log(cart)
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        let test = (product.priceInCent / 100)
        test += productPriceCents 
        test = test.toFixed(2) * cartItem.quantity
        productPriceCents = test
          //console.log(cartItem.deliveryOptionId);
        //console.log(cartItem.DeliveryOptionId)
        let deliveryOption;
        const deliveryOptionId = cartItem.deliveryOptionId
        deliveryOptions.forEach((option) => {
        //console.log(option)
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
        
        });
        shippingPriceCent += deliveryOption.priceCent
        //when you return track how the get delivery option works because it is not working properly
        //const deliveryOption = getDeliveryOption(cartItem.DeliveryOptionId)
    });
    const paymentSummaryHTML = `
    <h4 class="cart-total">cart total</h4>
                <div class="delivery-method-container">
                    <p>delivery method</p>
                    <select name="shipping method" id="" class="delivery-method">
                        <option value="">Free delivery</option>
                        <option value="">Fast delivery</option>
                    </select>
                </div>
                <div class="shipping-total-container">
                    <p class="shipping-total-text">shipping and handling</p>
                    <p>$${shippingPriceCent}</p>
                </div>
                <div class="sub-total-container">
                    <p>subtotal</p>
                    <p>$215.00</p>
                </div>
                <div class="sub-total-container forced-border-top">
                    <p>total</p>
                    <p>$${productPriceCents}</p>
                </div>
                <div  class="test">
                    <BUtton class="general-button">proceed to checkout</BUtton>
                </div>`;

                document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML
    //console.log(shippingPriceCent);
    //console.log(productPriceCents);
    
}
renderPaymentSummary();