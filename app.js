const addToCardButtons = document.querySelectorAll(`.cardProduct__btn`);
//console.log(`addToCardButtons`, addToCardButtons);
addToCardButtons.forEach(addToCardButtons => {
    addToCardButtons.addEventListener(`click`, addToCardclicked);
})

function carritoHTML(){ 
    const carrito= document.querySelector(`.container-carrito`)
}


document.addEventListener('DOMContentLoaded', () => {
    row= JSON.parse( localStorage.getItem('carrito') ) || [] ;
    carritoHTML();
    console.log(row);
});


function sincronizarStorage() {
    localStorage.setItem(`carrito`, JSON.stringify(row));
}


const productoCardContainer = document.querySelector(`.container-carrito`)

function addToCardclicked(event) {
   
    const button = event.target;
    const item = button.closest(`.cardProducto`)
    const itemProducto = item.querySelector(`.cardProduct__description`).textContent;
    const itemPrecio = item.querySelector(`.cardPrecio`).textContent;
    const itemImage = item.querySelector(`.cardProduct__image`).src;
       
    addItemCardProduct(itemProducto, itemPrecio, itemImage);
}

function addItemCardProduct(itemProducto, itemPrecio, itemImage) {
    const elementsTitle = productoCardContainer.getElementsByClassName(
        `shoppingCartItemTitle`);
    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemProducto) {
            let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector(
                `.shoppingCartItemQuantity`);
            elementQuantity.value++;
            $(`.toast`).toast(`show`);
            updateShoppingCartTotal();
            return;
        }
    }

    updateShoppingCartTotal();
    
    const productoCardRow = document.createElement(`div`);
    const prodcutoContent = `
    <div class="row shoppingCartItem">
          <div class="col-6">
              <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <img src=${itemImage} class="shopping-cart-image">
                  <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemProducto}</h6>
              </div>
          </div>
          <div class="col-2">
              <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <p class="item-price mb-0 shoppingCartItemPrice">${itemPrecio}</p>
              </div>
          </div>
          <div class="col-4">
              <div
                  class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                  <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                      value="1">
                  <button class="btn btn-danger buttonDelete" type="button">X</button>
              </div>
          </div>
      </div>`;

    productoCardRow.innerHTML = prodcutoContent
    productoCardContainer.append(productoCardRow)

    productoCardRow.querySelector(`.buttonDelete`)
        .addEventListener(`click`, removeShoppingCartItem);

    productoCardRow.querySelector(`.shoppingCartItemQuantity`)
        .addEventListener(`change`, quantityChanged);

    updateShoppingCartTotal();

    sincronizarStorage();
}


function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector(`.shoppingCartTotal`);

    const shoppingCartItems = document.querySelectorAll(`.shoppingCartItem`);

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            `.shoppingCartItemPrice`
        );
        const shoppingCartItemPrice = Number(
            shoppingCartItemPriceElement.textContent.replace(`$`, "")
        );
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
            `.shoppingCartItemQuantity`
        );
        const shoppingCartItemQuantity = Number(
            shoppingCartItemQuantityElement.value
        );
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}

function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest(`.shoppingCartItem`).remove();
    updateShoppingCartTotal();
}

function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
}

function comprarButtonClicked(event){
     event.preventDafult();
    productoCardContainer.innerHTML = '';
    updateShoppingCartTotal();
           
}

