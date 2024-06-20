import { products } from "./product/product-data.js";
import { cart, saveToStorage, calculateCartQuantity } from "./product/cart.js";


let productHTML = '';

products.forEach((product) => {
    productHTML +=
    `
    <div class="product-card">
        <img src="${product.image}">
        <h1>${product.name}</h1>
        <p>${product.description}</p>

        <div class="product-rating">
            <img src="/IMAGES/ratings/rating-${product.rating.stars * 10}.png" alt="product-rating">
            <p>${product.rating.count}</p>
        </div>
        <div class="input-stepper">
            <div class="plus-minus-container">
                <i class="fa-solid fa-minus js-minus" data-product-id ="${product.id}"></i>
            </div>
            <p class="input-stepper-display js-quantity-selector js-quantity-selector-${product.id}">1</p>      
            <div class="plus-minus-container">
                <i class="fa-solid fa-plus js-plus js-plus-${product.id}"  data-product-id ="${product.id}"></i>
            </div>
        </div>

        <h2>₦${(product.priceInCent / 100).toFixed(2)}</h2>

        <div class="added-to-cart js-added-${product.id}">
            <img src="/IMAGES/icons/checkmark.png">
            Added
        </div>

        <a class="add-to-cart" data-product-id ="${product.id}">Add to Cart</a>
    </div>
    `
});

document.querySelector('.js-product-flex').innerHTML = productHTML;



//this works with the added to cart popup function on
//line 99
const addedMessageTimeouts = {};

//this function adds whatever cart item quantity we have
//to the cart counter or we can say it updates the counter
//visually
export function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity()
    document.querySelector('.js-shopping-cart-counter').innerHTML = cartQuantity;
}


//once we click the add to cart button it adds it to cart
//by checking the dropdown selection and making it to be the
//current quantity
//if we click it again...it checks to see if that item is 
//in the cart then if it is...it'll increment the quantity
//else it will save it as a new item in the cart
//and gives it a name productName


//you forged this shitty function yourself so if you`re wondering how it
//works you'll figure it out yourself
export function incrementAndDecrease() {
    document.querySelectorAll('.js-plus').forEach((plusButton)=>{
        plusButton.addEventListener('click', ()=>{
            //don't think this product name dataset is'nt useful its dataset is what makes 
            //everything here works
            function increment(customForEachPage) {
                const productName = customForEachPage;
                let currentSelection = document.querySelector(`.js-quantity-selector-${productName}`);
                let convert = Number(currentSelection.innerHTML)
                convert += 1
                console.log(convert)
                currentSelection.innerHTML = convert
            }
            increment(plusButton.dataset.productId);
        })
    })
    //even though as a programmer im not supposed to repeat my codes...
    //im not strong enough to make this function work as an export so
    //ill just copy it and paste it in the checkout.js and make the changes
    //to make it work *sighs*

    document.querySelectorAll('.js-minus').forEach((minusButton)=>{
        minusButton.addEventListener('click', ()=>{
            function decrement(customForEachPage) {
                const productName = customForEachPage;
                let currentSelection = document.querySelector(`.js-quantity-selector-${productName}`);
                let convert = Number(currentSelection.innerHTML)
                convert -= 1
                if (convert < 1) {
                    convert = 1;
                }
                console.log(convert)
                currentSelection.innerHTML = convert
            }
            decrement(minusButton.dataset.productId);
        })
    })    
}

//just wanted to tell me that i'm doing a good job and
//who would've thought i would be writing my own codes
//without help from anyone as im doing now? he-he
incrementAndDecrease();

function addToCart(productName, quantity) {
let matchingItem;

cart.forEach((cartItem) => {
    if (productName === cartItem.productId) {
        matchingItem = cartItem;
    }
});
//MORE EXPLANATION
//this variable matching-item checks for matching items
//in the cart if we find a matching item we will save it
//in matching item

//once matching item becomes true or once it finds
// a duplicate item it will increment its quantity
// then it updates its quantity counter
if (matchingItem) {
    matchingItem.quantity += quantity;
}else{
    cart.push({
        productId: productName,
        quantity : quantity,
        deliveryOptionId : '1'
    });
}
//local storage makes the default cart not show up
saveToStorage();
}
//this part selects all of the buttons add to cart and add
//an event listener click to them

//about updating the cart quantity one happens when page
//is loading and one happens when we add to cart
//reason for one happening when page is loading is so that 
//the counter next to the cart icon does'nt starts at zero.
updateCartQuantity();
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
    //this part gets the dataset on the add to cart button
    //and gives it a name productName
    const productName = button.dataset.productId;


    //this part of the code makes gets the select class using the dom
    //we used this to get the select value and make it the number of 
    //quantity

    //whoever is working on this code except me...this part of the code
    //is completely useless ignore it...but something tells me to
    //just leave it here for fun? maybe
    function uselessFunction() {
        document.body.innerHTML = 'fuck you......'
        }
        
        //document.querySelectorAll('.js-plus')
    
    //incrementProduct();
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productName}`);
    //const quantity = Number(quantitySelector.value);
    const quantity = Number(quantitySelector.innerHTML);
    addToCart(productName, quantity);
    updateCartQuantity(); 
    
    //this part of the code makes the added display when 
    //we click the button add to cart is clicked
    const added = document.querySelector(`.js-added-${productName}`);

    const addedMessage = document.querySelector(
        `.js-added-${productName}`
    );

    //this gets every add to cart visible image of the 
    //item we clicked add to cart to;
    addedMessage.classList.add('added-to-cart-visible');

    const previousTimeoutId = addedMessageTimeouts[productName];
    if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
    }, 2000);

    addedMessageTimeouts[productName] = timeoutId;
    
    
    //THIS IS SOME OLD DIRTY CODES
    // let checkTimer = false;
    // if (checkTimer === false) {
    //     added.setAttribute('style', 'opacity:1');
    //     setTimeout(()=>{
    //     added.setAttribute('style', 'opacity:0');
    //     }, 2000);   
    //     }
    });
});

