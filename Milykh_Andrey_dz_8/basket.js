"use strict";

const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});

const basket = {
  /*
  1: {
    id: 3,
    price: 123,
    name: 'abcdef',
    count: 2,
  }
  */ 
};

document.querySelector('.featuredItems').addEventListener('click', event => {
  // если не будет ближайшего элемента, у которого ест класс 'addToCart',
  // то уходим из функции 
  if(!event.target.closest('.addToCart')) {
    return;
  }
  const featuredItem = event.target.closest('.featuredItem');
  const id = +featuredItem.dataset.id;
  const name = featuredItem.dataset.name;
  const price = +featuredItem.dataset.price;
 // console.log(id, name, price);
 addToCart(id, name, price);

});

function addToCart(id, name, price) {
  if(!(id in basket)) {
    basket[id] = {
      id: id,
      name: name,
      price: price,
      count: 0
    };
  }
  basket[id].count++; 

  // сколько товаров куплено
  basketCounterEl.textContent = getTotalBasketCount().toString();

  basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);

  renderProductInBasket(id);
}

function getTotalBasketCount() {    
  return Object.values(basket).reduce(
    (accumulator, currentProduct) => accumulator + currentProduct.count, 0);  
 /*
 let count = 0;
 const productsArr = Object.values(basket);
 for(const product of productsArr) {
  count += product.count;
 }
 return count;
 */
}

function getTotalBasketPrice() {  
  return Object
    .values(basket)
    .reduce(
      (accumulator, currentProduct) => 
        accumulator + currentProduct.count * currentProduct.price, 0);
}

function renderNewProductInBasket(productId) {  
  const productRow = `   
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId]
          .price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
  `;
  basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
}

function renderProductInBasket(productId) {
  // Получение строки в корзине, отвечающей за данный продукт
  const basketRowEl = basketEl
    .querySelector(`.basketRow[data-id="${productId}"]`);
  if (!basketRowEl) {  // если не находим элемент, то будем работать с новым
    renderNewProductInBasket(productId);
    return;
  }  

  const product = basket[productId];

  // увеличение число имеющегося в корзине товара
  basketRowEl
    .querySelector('.productCount')
    .textContent = product.count;

  // Итоговая цена по данному товару в корзине
  basketRowEl
  .querySelector('.productTotalRow')
  .textContent = (product.count *  product.price).toFixed(2);
}


