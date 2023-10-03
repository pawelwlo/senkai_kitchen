const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const list = document.querySelector('.list');
const listCard = document.querySelector('.listCard');
const body = document.querySelector('body');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');

if (openShopping) {
    openShopping.addEventListener('click', () => {
        body.classList.add('active');
    });
}

if (closeShopping) {
    closeShopping.addEventListener('click', () => {
        body.classList.remove('active');
    });
}

let products = [
    {
        key: 1,
        name: 'Mango Sago',
        image: 'Mango-sago.jpeg',
        price: 20000 
    },
    {
        key: 2,
        name: 'Roasted Milk Tea Original',
        image: 'roasted-milk-tea.webp',
        price: 13000
    },
    {
        key: 3,
        name: 'Roasted Milk Tea With Grass Jelly',
        image: 'milk-tea-grass.jpeg',
        price: 20000
    },
    {
        key: 4,
        name: 'Boba Smoothie',
        image: 'boba-smoothie.jpeg',
        price: 22000 
    },
    {
        key: 5,
        name: 'Matcha Bubble Tea',
        image: 'matcha-bubble-tea.jpeg',
        price: 13000
    },
    {
        key: 6,
        name: 'Strawberry Milk Tea',
        image: 'strawberry-milk-tea.jpg',
        price: 20000
    }
];
let listCards  = [];

function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()} IDR </div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    });

    try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            listCards = JSON.parse(storedCart);
        }
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
    }

    reloadCard();
}

initApp();

function addToCard(key) {
    // Check if the key is valid and it exists in the products array
    if (key >= 0 && key < products.length) {
        if (!listCards[key]) {
            // Copy product from the list to the cart
            listCards[key] = JSON.parse(JSON.stringify(products[key]));
            listCards[key].quantity = 1;
        } else {
            // If the item already exists, increment its quantity
            listCards[key].quantity++;
        }
        // Save the updated cart data to localStorage
        saveCartToLocalStorage();
        reloadCard();
    }
}

function saveCartToLocalStorage() {
    try {
        localStorage.setItem('cart', JSON.stringify(listCards));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
}

function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if (value) { // Check if the item exists
            const itemPrice = value.price * value.quantity;
            totalPrice += itemPrice;
            count += value.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${itemPrice.toLocaleString()} IDR</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity} </div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = "Total Price: " + totalPrice.toLocaleString() + " IDR";
    quantity.innerText = count;
}

function changeQuantity(key, quantity){
    if (quantity <= 0) {
        // Remove the item from the listCards array
        delete listCards[key];
        // Save the updated cart data to localStorage
        saveCartToLocalStorage();
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
        // Save the updated cart data to localStorage
        saveCartToLocalStorage();
    }
    reloadCard();
}




// const openShopping = document.querySelector('.shopping');
// const closeShopping = document.querySelector('.closeShopping');
// const list = document.querySelector('.list');
// const listCard = document.querySelector('.listCard');
// const body = document.querySelector('body');
// const total = document.querySelector('.total');
// const quantity = document.querySelector('.quantity');

// if (openShopping) {
//     openShopping.addEventListener('click', () => {
//         body.classList.add('active');
//     });
// }

// if (closeShopping) {
//     closeShopping.addEventListener('click', () => {
//         body.classList.remove('active');
//     });
// }

// let products = [
//     {
//         key: 1,
//         name: 'Mango Sago',
//         image: 'Mango-sago.jpeg',
//         price: 20000 
//     },
//     {
//         key: 2,
//         name: 'Roasted Milk Tea Original',
//         image: 'roasted-milk-tea.webp',
//         price: 13000
//     },
//     {
//         key: 3,
//         name: 'Roasted Milk Tea With Grass Jelly',
//         image: 'milk-tea-grass.jpeg',
//         price: 20000
//     },
//     {
//       key: 4,
//       name: 'Boba Smoothie',
//       image: 'boba-smoothie.jpeg',
//       price: 22000 
//   },
//   {
//       key: 5,
//       name: 'Matcha Bubble Tea',
//       image: 'matcha-bubble-tea.jpeg',
//       price: 13000
//   },
//   {
//       key: 6,
//       name: 'Strawberry Milk Tea',
//       image: 'strawberry-milk-tea.jpg',
//       price: 20000
//   }
// ];

// // Check if there's cart data in localStorage
// const storedCart = localStorage.getItem('cart');

// // Initialize listCards with stored data or an empty array
// let listCards = storedCart ? JSON.parse(storedCart) : [];

// function initApp() {
//     products.forEach((value, key) => {
//         let newDiv = document.createElement('div');
//         newDiv.classList.add('item');
//         newDiv.innerHTML = `
//             <img src="${value.image}">
//             <div class="title">${value.name}</div>
//             <div class="price">${value.price.toLocaleString()} IDR </div>
//             <button onclick="addToCard(${key})">Add To Card</button>`;
//         list.appendChild(newDiv);
//     });

//     // Populate the cart with stored data
//     if (listCards.length > 0) {
//         listCards.forEach((value, key) => {
//             addToCard(key);
//         });
//     }
// }

// initApp();

// function addToCard(key) {
//     if (listCards[key] == null) {
//         // Copy product from the list to the cart
//         if (key < products.length) { // Check if the key is valid
//             listCards[key] = JSON.parse(JSON.stringify(products[key]));
//             listCards[key].quantity = 1;
//         }
//     }
//     // Save the updated cart data to localStorage
//     localStorage.setItem('cart', JSON.stringify(listCards));
//     reloadCard();
// }
// function reloadCard() {
//     listCard.innerHTML = '';
//     let count = 0;
//     let totalPrice = 0;

//     listCards.forEach((value, key) => {
//         const itemPrice = value.price * value.quantity;
//         totalPrice += itemPrice;
//         count += value.quantity;

//         if (value != null) {
//             let newDiv = document.createElement('li');
//             newDiv.innerHTML = `
//                 <div><img src="${value.image}"/></div>
//                 <div>${value.name}</div>
//                 <div>${itemPrice.toLocaleString()} IDR</div>
//                 <div>
//                     <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
//                     <div class="count">${value.quantity} </div>
//                     <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
//                 </div>`;
//             listCard.appendChild(newDiv);
//         }
//     });

//     total.innerText = "Total Price: " + totalPrice.toLocaleString() + " IDR";
//     quantity.innerText = count;
// }

// function changeQuantity(key, quantity) {
//     if (quantity <= 0) {
//         // Remove the item from the listCards array
//         delete listCards[key];
//         // Remove the corresponding item from the DOM
//         listCard.children[key].remove();
//     } else {
//         listCards[key].quantity = quantity;
//     }

//     // Save the updated cart data to localStorage
//     localStorage.setItem('cart', JSON.stringify(listCards));
//     reloadCard();
// }
