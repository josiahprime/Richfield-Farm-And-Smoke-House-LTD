import { saveToStorage } from "./product/cart.js";


export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCent: 0
},
{
    id: '2',
    deliveryDays: 3,
    priceCent: 499
}
];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        //console.log(option)
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
            //console.log(deliveryOption)
        }
        
    });
    //console.log(deliveryOption)
    
    return deliveryOption || deliveryOptions[0]
    
}