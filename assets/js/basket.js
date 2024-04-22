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

let tBody = document.querySelector("tbody");
let total = document.querySelector(".total");
let BASE_URL = "http://localhost:8080";

async function getData() {
  let res = await axios(`${BASE_URL}/products`);
  let data = res.data;
}
getData();

let basket = getdataFromLocaleBasket();

function drawtable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${element.product.id}</td>
        <td><img src="${element.product.imgUrl}"></td>
        <td>${element.product.name}</td>
        <td>${element.product.price}</td>
        <td class="sub-total">${element.product.price * element.count} $</td>
        <td class="qiymet">
            <i onclick=minusCount("${
              element.product.id
            }",this) class="fa-solid fa-minus"></i>
            <span class="count">${element.count}</span>
            <i onclick=plusCount("${
              element.product.id
            }",this) class="fa-solid fa-plus"></i>
        </td>
        <td><i onclick=deleteToData("${
          element.product.id
        }",this) class="fa-regular fa-trash-can"></i>
        </td>
    `;
    tBody.append(tr);
  });
}
drawtable(basket);

function minusCount(id, btn) {
  let product = basket.find((item) => item.product.id === id);
  --product.count;
  btn.closest("td").querySelector(".count").textContent = product.count;

  btn.closest("tr").querySelector(".sub-total").textContent = `${
    product.product.price * product.count
  } $`;
  totalCount() 
  setDataTOLocaleBasket(basket);
}
function plusCount(id, btn) {
  let product = basket.find((item) => item.product.id === id);
  ++product.count;
  btn.closest("td").querySelector(".count").textContent = product.count;
  btn.closest("tr").querySelector(".sub-total").textContent = `${
    product.product.price * product.count
  } $`;
  totalCount() 
  setDataTOLocaleBasket(basket);
}
function deleteToData(id, btn) {
  let product = basket.find((item) => item.product.id === id);
  basket = basket.filter((item) => item.product.id !== id);
  btn.closest("tr").remove();
  totalCount() 
  setDataTOLocaleBasket(basket);
}
function totalCount() {
  total.textContent = basket.reduce(
    (sum, item) => sum + item.count * item.product.price,0
  );
  setDataTOLocaleBasket(basket)
}
totalCount() 
function setDataTOLocaleBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function getdataFromLocaleBasket() {
  return JSON.parse(localStorage.getItem("basket")) || [];
}