"use strict";
// pulled data in local storage, from main.js
let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

//  add data in basket
let basket = JSON.parse(localStorage.getItem("Data-save basket")) || [];

// adding numbers in basket as in main JS
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

// fixing basket after refresh, cause it still shows 0.
calculation();

// adding function if basket fot something or nothing
let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        // x is an object ( we can write whatever we want not only x) using map to change separately
        // console.log(x);
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        // search is an object.
        let { img, name, price } = search;
        return `
      <div class="cart-item">
        <img width="100" src=${img} alt="" />
        <div class="details">

          <div class="title-price-x">
            <h4 class="title-price">
              <p>${name}</p>
              <p class="cart-item-price">mdl ${price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-circle"></i>
          </div>

          <div class="buttons">
              <i onclick="decrement(${id})" class="bi  bi-dash-circle"></i>
            
              <div id=${id} class="quantity">${item} 
              </div>
              <i onclick="increment(${id})" class="bi  bi-plus-circle"></i>
            </div>

          <h3>MDL ${item * search.price}</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Punga este Goala</h2>
    <a href="index.html">
      <button class="HomeBtn">Inapoi in Menu</button>
    </a>
    `;
  }
};

generateCartItems();

// adding incriment and decriment in basket

// will add items (+)
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  // search helping to "find" the basket
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  // console.log(basket);
  update(selectedItem.id);
  // adding local storage  in increment (+) (adding on the bottom for saving all the data )
  localStorage.setItem("Data-save basket", JSON.stringify(basket));
};

// will minus items (-)
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  // fixing decrement after adding style in css
  if (search === undefined) return;
  // search helping to "find" the basket
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  // console.log(basket);
  // adding to remove issue after -1 (should be removed object from basket(data))
  update(selectedItem.id);

  // after we using (-) to remove from data the position of adding (if will be 0 should be removed)
  basket = basket.filter((x) => x.item !== 0);
  // adding function for removing items after passing 0. data will gone.
  generateCartItems();
  // adding local storage for decrement (-) (adding on the bottom for saving all the data )
  localStorage.setItem("Data-save basket", JSON.stringify(basket));
};

// also need update after changes
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  // adding update of the total amount after + or -
  totalAmount();
};

// creating a function that we can delete items by our wish. we will use filter func to remove.

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  // I marking all the ID all the objects. (1st item 2nd item etc)
  basket = basket.filter((x) => x.id !== selectedItem.id);
  // adding for updating after closing by pressing X.
  generateCartItems();
  // after deleting an item to fix the price of total amount
  totalAmount();
  // after deleting an item to show right number on the basket.
  calculation();
  // adding local storage from decrement or increment   (will remove data when we will press X (close))
  localStorage.setItem("Data-save basket", JSON.stringify(basket));
};

// creating a function which remove all items by a single button also with datastorage

let clearCart = () => {
  basket = [];
  generateCartItems();
  // after clear all cart to remove from the cart icon all the numbers , should be 0
  calculation();
  localStorage.setItem("Data-save basket", JSON.stringify(basket));
};

// total amount function, 2 cases will be created also we invoke to clear all
let totalAmount = () => {
  if (basket.length !== 0) {
    // we will grab from ID (1st item) price for calculating total price
    let amount = basket
      .map((x) => {
        //separatin item and ID, we will search this ID in our database
        let { item, id } = x;
        // will search again in data.js
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
        // x is priviews number and y is the next number (adding two numbers and get the next one will be total in console of all items)
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2>Total pentru Magie: MDL ${amount} </h2>
    <button id="checkout" class="checkout">Achitare</button>
    <button onclick="clearCart()" class="removeAll">Sterge Totul</button>
    `;
  } else return;
};

totalAmount();

// adding to redirect to homepage after checkout
const achitaButton = document.querySelector("#checkout");
achitaButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
