export function addToCart(productId, cart,quantity) {
    quantity = Number(quantity);
    let item = cart.find(a => a.productId === productId) ;
    item ? item.quantity += quantity : cart.push({productId: productId, quantity: quantity});

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartQuantity(cart);
}

export function updateCartQuantity(cart) {
    if (cart.length === 0) {
document.querySelector('.js-cart-quantity').innerHTML = 0;}
else {
    let cartQuantity = 0;
    cart.forEach((item) =>{
      cartQuantity += item.quantity;
    })
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}
}
