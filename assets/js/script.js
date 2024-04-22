'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [overlay, navCloseBtn, navOpenBtn];

/**
 * close navbar when click on any navbar link
 */

for (let i = 0; i < navbarLinks.length; i++) { navElemArr.push(navbarLinks[i]); }

/**
 * addd event on all elements for toggling navbar
 */

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });
}



/**
 * header active state
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 400 ? header.classList.add("active")
    : header.classList.remove("active");
}); 



let products = document.querySelector(".products");
let BASE_URL = "http://localhost:8080";
let dataCopy = [];
async function getData() {
  let res = await axios(`${BASE_URL}/products`);
  let data = res.data;
  dataCopy = data;
  drawCard(data);
}
getData();

function drawCard(data) {
  products.innerHTML = "";
  data.forEach((element) => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="img-div">
          <img src="${element.imgUrl}" alt="" />
       </div>
       <div class="icons">
       <i onclick=addToFavs("${
         element.id
       }",this) class="${favs.find((item)=>item.id===element.id) ? "fa-solid fa-heart" :"fa-regular fa-heart"}"></i>
       <i onclick=addToBasket("${
        element.id
      }") class="fa-solid fa-bag-shopping"></i>
       <a href="./details.html?id=${element.id}" class="fa-solid fa-eye"></a>
     </div>
       <div class="content">
        <h3>${element.name}</h3>
        <h5>Summer collection</h5>
        <div class="price">
          <h3>${element.price} $</h3>
          <h3 class="old-price">${
            element.oldPrice ? element.oldPrice : ""
          } </h3> 
        </div>
       </div>
      
        `;
    products.append(card);
  });
}
let basket = getdataFromLocaleBasket();

function addToBasket(id) {
  console.log("ss");
  let product = dataCopy.find((item) => item.id === id);
  let index = basket.findIndex((item) => item.product.id === id);
  console.log(index);
  if (index === -1) {
    basket.push({ count: 1, product: product });
  } else {
    basket[index].count++;
  }
  setDataTOLocaleBasket(basket);
}
function setDataTOLocaleBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function getdataFromLocaleBasket() {
  return JSON.parse(localStorage.getItem("basket")) || [];
}
// ===========================================================
let favs = getdataFromLocaleFavs();

function addToFavs(id, btn) {
  btn.className === "fa-regular fa-heart"
    ? btn.className = "fa-solid fa-heart"
    : btn.className = "fa-regular fa-heart";
  let productFavs = dataCopy.find((item) => item.id === id);
  let index = favs.findIndex((item) => item.id === id);
  console.log(index);
  if (index === -1) {
    favs.push(productFavs);
  } else {
    favs = favs.filter((item) => item.id !== id);
  }
  setDataTOLocaleFavs(favs);
}

function setDataTOLocaleFavs(favs) {
  localStorage.setItem("favs", JSON.stringify(favs));
}

function getdataFromLocaleFavs() {
  return JSON.parse(localStorage.getItem("favs")) || [];
}