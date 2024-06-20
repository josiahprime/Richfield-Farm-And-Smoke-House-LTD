// The course data
export function getProduct(productId) {
    let matchingProduct;

    products.forEach((product)=>{
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    return matchingProduct;
}

export const products = [{
    id: '6iK229-0a7V6-19qj78-40e66B',
    image: '/IMAGES/products images/1713634835908.png',
    name: 'Cow Meat',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    rating: {
        stars: 4.5,
        count: 8345,
    },
    priceInCent: 50099,
},
{   
    id: 'J54g36-0T5C9-e2153h-9l1Z61',
    image: '/IMAGES/products images/1713634835932.png',
    name: 'Fish Oil',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    rating: {
        stars: 5,
        count: 4790,
    },
    priceInCent: 300089,
},
{
    id: '021Em9-45FY0-541HG1-W808s0',
    image: '/IMAGES/products images/pngwing.com.png',
    name: 'Mangoes',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    rating: {
        stars: 5,
        count: 2809,
    },
    priceInCent: 180099,
},
{
    id: '6175FZ-sh467-8OH108-59j5s9',
    image: '/IMAGES/products images/1713730265276.png',
    name: 'Basket Of Vegetables',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    rating: {
        stars: 4,
        count: 3945
    },
    priceInCent: 500004,
}, 
{
    id: 'Z8828Q-9E2X1-M24o13-91MB83',
    image: '/IMAGES/products images/1713634835915.png',
    name: 'Tomatoes',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    rating: {
        stars: 4.5,
        count: 2658,
    },
    priceInCent: 910022,
},
{
    id: 'Z8828Q-9E2X1-M24o13-91MB53',
    image: '/IMAGES/products images/1713636830727.png',
    name: 'Banana',
    description: 'sweet melanin banana',
    rating: {
        stars: 4.5,
        count: 500,
    },
    priceInCent: 250025,
}];