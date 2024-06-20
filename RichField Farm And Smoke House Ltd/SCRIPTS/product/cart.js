
export let cart = JSON.parse(localStorage.getItem('cart'))

if (!cart) {
    cart = [{
        productId: '6iK229-0a7V6-19qj78-40e66B',
        quantity: 2,
        deliveryOptionId : '1'
    },{
        productId: 'J54g36-0T5C9-e2153h-9l1Z61',
        quantity: 1,
        deliveryOptionId : '2'
    }
    ]
}


export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity() {
    let cartQuantity = 0
    cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity
    })
    return cartQuantity;
}
//the more fucking info is that there is no info fuck off!!!
//well so i don't get mad in future... we get the id of the item we
//want to delete and run this function on it...
//this function checks for ids in the cart that does'nt match the
//ids of the items we deleted and adds them to new cart and then
//it makes new cart the current cart...dumb future me... i hope you understand
//jose... ignore all of these ha-ha...
export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem)=>{
        if (cartItem.productId !== productId) {
            newCart.push(cartItem)
        }
    });
    cart = newCart;


    saveToStorage();
}


export function updateDeliveryOption(productId, deliveryOptionId) {

    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
        
    });
    
    console.log(matchingItem.deliveryOptionId)
    matchingItem.deliveryOptionId = deliveryOptionId;
    console.log(deliveryOptionId)

    saveToStorage();
}