import {products,getProduct} from '../../data/products.js';
import {formatMoney} from '../money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cheakoutHtml = '';
let totalQuantity = 0;
cart.forEach((a) => {
const product = getProduct(a.productId);
let img = product.image;
let name = product.name;
let price = (a.quantity * product.priceCents / 100).toFixed(2);    
totalQuantity += a.quantity;
cheakoutHtml += `<div class="cart-item-container">
            <div class="delivery-date"></div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${img}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${name}
                </div>
                <div class="product-price">
                  $${price}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${a.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary" data-product-id="${a.productId}">
                    Update
                  </span>
                  <input 
                    type="number" 
                    class="js-quantity-input" 
                    min="1" 
                    value="${a.quantity}" 
                    style="display: none; width: 60px; margin-left: 8px; padding: 4px; border: 1px solid #ccc; border-radius: 4px;"
                  >
                  <span class="delete-quantity-link link-primary" data-product-id="${a.productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${a.productId}" value = "0">
                  <div>
                    <div class="delivery-option-date">
                      ${dayjs().add(7, 'day').format('dddd, MMMM D')}
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${a.productId}" value="499">
                  <div>
                    <div class="delivery-option-date">
                      ${dayjs().add(3, 'day').format('dddd, MMMM D')}
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${a.productId}"
                    value="999">
                  <div>
                    <div class="delivery-option-date">
                      ${dayjs().add(1, 'day').format('dddd, MMMM D')}
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `});


document.querySelector('.order-summary').innerHTML = cheakoutHtml;
document.querySelector('.return-to-home-link').innerHTML = `${totalQuantity} item`;


document.querySelectorAll('.delete-quantity-link').forEach((link) => {

  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
  })
});

document.querySelectorAll('.update-quantity-link').forEach((link) => {

  link.addEventListener('click', () => {
  const productId = link.dataset.productId;
  const container = link.closest('.cart-item-container');
  const input = container.querySelector('.js-quantity-input');
  const cartItem = cart.find(item => item.productId === productId);
  input.style.display = 'inline-block';
    input.focus();
    input.select(); 
    input.addEventListener('keydown', (event) => {

      if (event.key === 'Enter') {
        const newQuantity = Number(input.value);
        const currentQuantity = cartItem.quantity ;
        //will work the same as the dlt button
          if (newQuantity ===0 ){
          cart = cart.filter(item => item.productId !== productId);
          localStorage.setItem('cart', JSON.stringify(cart));
          location.reload();
        } 
        if (newQuantity !== currentQuantity) {
          cartItem.quantity = newQuantity;
          localStorage.setItem('cart', JSON.stringify(cart));
          location.reload();
        }
      }
  })
  })
});
let totalShipping;
document.querySelectorAll('.cart-item-details-grid').forEach(grid => {
  
  const deliveryDate = grid.parentElement.querySelector('.delivery-date'); 
  const radios = grid.querySelectorAll('.delivery-option-input');
  function updateDeliveryAndShippingTotal() {
    const selectedRadio = grid.querySelector('.delivery-option-input:checked');
    if (!selectedRadio) return;
    const value = selectedRadio.value;
    let daysToAdd;
    value === '0'?daysToAdd = 7 : value === '499' ? daysToAdd = 3 :  daysToAdd = 1  ;
    if(! daysToAdd){return}; 
    
    const newDate = dayjs().add(daysToAdd, 'day').format('dddd, MMMM D');
    deliveryDate.textContent = `Delivery date: ${newDate}`;
    
    totalShipping = 0;
    document.querySelectorAll('.cart-item-details-grid').forEach(otherGrid => {
      const otherSelected = otherGrid.querySelector('.delivery-option-input:checked');
      if (otherSelected) {
        totalShipping += Number(otherSelected.value);
      }
    });
    document.querySelector('.shipping-fee').textContent = `${formatMoney(totalShipping)}`;
    
    let itemtotal = calculateItemTotal();
    let totalWithShipping = itemtotal + totalShipping;
    let tex = totalWithShipping*0.1;
    let total = totalWithShipping + tex;
    document.querySelector('.totalcost-item').textContent = `${formatMoney(itemtotal)}`;
    document.querySelector('.total-with-shipping').textContent = `${formatMoney(totalWithShipping)}`;
    document.querySelector('.tax-money').textContent = `${formatMoney(tex)}`;
    document.querySelector('.total').textContent = `${formatMoney(total)}`;
  }

  radios.forEach(radio => radio.addEventListener('change', updateDeliveryAndShippingTotal));
  updateDeliveryAndShippingTotal(); // Set initial state

});

document.querySelector('.total-items-cart').innerHTML = `Items (${totalQuantity}):`;
function calculateItemTotal() {

let itemTotal = cart.reduce((total, item) => {
  const product = products.find(p => p.id === item.productId);
  return total + (item.quantity * product.priceCents);
}, 0)

return itemTotal;
}


