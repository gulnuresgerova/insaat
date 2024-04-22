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






let total = document.querySelector(".total");
let products = document.querySelector(".products");
let favsCount = document.querySelector(".favs-count");
let BASE_URL = "http://localhost:8080";

async function getData() {
  let res = await axios(`${BASE_URL}/products`);
  let data = res.data;
}
getData();

let favs = getdataFromLocaleFavs();

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
         <i class="fa-solid fa-heart" onclick=addToFavs("${element.id}",this)>
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
drawCard(favs);
function favsCountProduct(){
    favsCount.textContent = favs.lenght
}
favsCountProduct()
function addToFavs(id, btn) {
  btn.closest(".card").remove();
  favs = favs.filter((item) => item.id !== id);
  setDataTOLocaleFavs(favs);
}

function setDataTOLocaleFavs(favs) {
  localStorage.setItem("favs", JSON.stringify(favs));
}

function getdataFromLocaleFavs() {
  return JSON.parse(localStorage.getItem("favs")) || [];
}