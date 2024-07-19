// API Module
const API = (() => {
  const baseURL = "http://localhost:3000";

  const getCart = () => 
    // define your method to get cart data
    fetch(`${baseURL}/cart`)
    .then(res => res.json())
  
  const getInventory = () => 
    // define your method to get inventory data
    fetch(`${baseURL}/inventory`)
    .then(res => res.json())
  

  const addToCart = (item) => 
    // define your method to add an item to cart
    fetch(`${baseURL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  }).then(res => res.json());

  const updateCart = (id, item) => 
    // define your method to update an item in cart
    fetch(`${baseURL}/cart/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  }).then(res => res.json());

  const deleteFromCart = (id) => 
    // define your method to delete an item in cart
    fetch(`${baseURL}/cart/${id}`, {
    method: "DELETE"
  }).then(res => res.json());

  const checkout = () => getCart().then(cartItems =>
    Promise.all(cartItems.map(item => deleteFromCart(item.id)))
  );

  return { getCart, getInventory, addToCart, updateCart, deleteFromCart, checkout };
})();

// Model Module
const Model = (() => {
  // implement your logic for Model
  class State {
    #cart = [];
    #inventory = [];
    #onChange;

    get cart() { 
      return this.#cart; 
    }
    
    set cart(newCart) {
      this.#cart = newCart;
      if (this.#onChange) this.#onChange(this.#cart);
    }

    get inventory() { 
      return this.#inventory; 
    }
    set inventory(newInventory) {
      this.#inventory = newInventory;
    }

    subscribe(cb) { 
      this.#onChange = cb; 
    }
  }

  return { State, ...API };
})();
//View Module
const View = (() => {
  // implement your logic for View
  const upButton = document.getElementById('upButton');
  const downButton = document.getElementById('downButton');
  const addToCartButton = document.getElementById('addToCartButton');
  const checkoutButton = document.querySelector('.checkout-btn');
  const cartListEl = document.getElementById('cartList');
  
  const getCounterValue = (id) => {
    const counterEl = document.querySelector(`#counter-${id}`);
    return counterEl ? parseInt(counterEl.textContent) : 0;
  };

  const setCounterValue = (id, value) => {
    const counterEl = document.querySelector(`#counter-${id}`);
    if (counterEl) counterEl.textContent = value;
  };

  const renderCart = (cart) => {
    cartListEl.innerHTML = '';
    cart.forEach(item => {
      const li = document.createElement('li');
      li.id = `cart-item-${item.id}`;
      li.innerHTML = `
        ${item.content}: ${item.quantity}
        <button class="delete-btn" data-id="${item.id}">Delete</button>
      `;
      cartListEl.appendChild(li);
    });
  };

  return {
    getCounterValue,
    setCounterValue,
    renderCart,
    upButton,
    downButton,
    addToCartButton,
    checkoutButton,
    cartListEl
  };
})();

//Controller Module
const Controller = ((view, model) => {
  // implement your logic for Controller
  const state = new model.State();

  const handleUpClick = (id) => {
    let value = view.getCounterValue(id);
    view.setCounterValue(id, value + 1);
  };

  const handleDownClick = (id) => {
    let value = view.getCounterValue(id);
    if (value > 0) view.setCounterValue(id, value - 1);
  };

  const handleAddToCart = () => {
    const updatePromises = [];
    const itemCounts = state.inventory.map(item => {
      const count = view.getCounterValue(item.id);
      return { id: item.id, content: item.content, quantity: count };
    }).filter(item => item.quantity > 0);

    itemCounts.forEach(item => {
      const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + item.quantity };
        updatePromises.push(model.updateCart(existingItem.id, updatedItem));
      } else {
        updatePromises.push(model.addToCart(item));
      }
    });

    Promise.all(updatePromises)
      .then(() => {
        itemCounts.forEach(item => view.setCounterValue(item.id, 0));
        return model.getCart();
      })
      .then(cart => state.cart = cart)
      .catch(console.error);
  };

  const handleCheckout = () => {
    model.checkout()
      .then(() => {
        return model.getCart();
      })
      .then(cart => state.cart = cart)
      .catch(console.error);
  };

  const handleDelete = (id) => {
    model.deleteFromCart(id)
      .then(() => {
        return model.getCart();
      })
      .then(cart => state.cart = cart)
      .catch(console.error);
  };

  const bootstrap = () => {
    state.subscribe(view.renderCart);
    Promise.all([model.getCart(), model.getInventory()])
      .then(([cart, inventory]) => {
        state.cart = cart;
        state.inventory = inventory;
      })
      .catch(console.error);

    document.querySelectorAll('[id^=upButton]').forEach(button => {
      button.addEventListener('click', () => handleUpClick(button.dataset.id));
    });
    document.querySelectorAll('[id^=downButton]').forEach(button => {
      button.addEventListener('click', () => handleDownClick(button.dataset.id));
    });
    document.getElementById('addToCartButton').addEventListener('click', handleAddToCart);
    document.querySelector('.checkout-btn').addEventListener('click', handleCheckout);
    
    // Event delegation for delete buttons
    view.cartListEl.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-btn')) {
        const id = parseInt(event.target.dataset.id);
        handleDelete(id);
      }
    });
  };

  return { bootstrap };
})(View, Model);

Controller.bootstrap();