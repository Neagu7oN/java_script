"use strict";

//reg
function register() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let confirm_password = document.getElementById("confirm_password").value;

  if (username == "" || password == "" || confirm_password == "") {
    alert("Completați spațiile libere");
    return false;
  }

  if (password != confirm_password) {
    alert("Parole nu se potrivesc");
    return false;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
  alert("Inregistrarea reusita");
  window.location.href = "login.html";
}

// login
function login() {
  let username = document.getElementById("rightuser").value;
  let password = document.getElementById("rightpassword").value;

  if (username == "" || password == "") {
    alert("Completați spațiile libere");
    return false;
  }

  let stored_username = localStorage.getItem("username");
  let stored_password = localStorage.getItem("password");

  if (username != stored_username || password != stored_password) {
    alert("Parola sau numele incorect");
    return false;
  }

  alert("Logare reusita");
  window.location.href = "./index.html";
}

// shop !!!

let shop = document.getElementById("shop");

// adding functionality, after refreshing the page the data and the numberss will be saved.
let basket = JSON.parse(localStorage.getItem("Data-save basket")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      // for fixing, saving and pinning numbers on (+ & -) & data in local storage after refresh
      let search = basket.find((x) => x.id === id) || [];
      return `
      <div id=produc-id-${id} class="item">
        <img width="320" src=${img}  alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>MDL ${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-circle"></i>
              <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-circle"></i>
            </div>
          </div>
          <div class="buy-button">
            <a href="cart.html">
              <button class="buttons-buy button-hover">Cumpără-mă</button>
            </a> 
          </div>
        </div>
      </div>
      `;
    })
    .join(""));
};

generateShop();

// will add items (+)
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  // search will help to "find" the basket
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
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

  // adding to remove issue after -1 (should be removed object from basket(data))
  update(selectedItem.id);

  // after we using (-) to remove from data the position of adding (if will be 0 should be removed)
  basket = basket.filter((x) => x.item !== 0);

  // adding local storage for decrement (-) (adding on the bottom for saving all the data)
  localStorage.setItem("Data-save basket", JSON.stringify(basket));
};

// define the numbers when we press + or -
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

// adding numbers in basket
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

// fixing basket after refresh, cause it still shows 0.
calculation();

// creating toggle with eveniment mouseout
