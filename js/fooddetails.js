// Scroll to top
const scrollBtn = document.getElementById("scrollTop");

window.onscroll = function () {
  if (document.documentElement.scrollTop > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const params = new URLSearchParams(window.location.search);
const foodName = params.get("name") || "Jollof Rice & Fried Chicken";
const basePrice = Number(params.get("price")) || 3500;
const foodImage = params.get("image") || "images/jellof.png";


document.getElementById("foodName").innerText = foodName;
document.getElementById("basePrice").innerText = basePrice.toLocaleString();
document.getElementById("foodImage").src = foodImage;


const proteinOptions = document.querySelectorAll(".protein");
const extraOptions = document.querySelectorAll(".extra");
const totalPriceEl = document.getElementById("totalPrice");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const instructionsEl = document.getElementById("instructions");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Calculate total for current food
function calculateTotal() {
  let proteinExtra = 0;
  proteinOptions.forEach(p => { if(p.checked) proteinExtra = Number(p.value); });
  let extrasTotal = 0;
  extraOptions.forEach(e => { if(e.checked) extrasTotal += Number(e.value); });
  const total = basePrice + proteinExtra + extrasTotal;
  totalPriceEl.innerText = total.toLocaleString();
  return total;
}
proteinOptions.forEach(p => p.addEventListener("change", calculateTotal));
extraOptions.forEach(e => e.addEventListener("change", calculateTotal));
calculateTotal();

// Render cart
function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  cart.forEach((item,index)=>{
    total += item.total * item.quantity;
    const extrasText = item.extras.length ? `Extras: ${item.extras.join(", ")}` : "";
    cartItemsEl.innerHTML += `
      <div class="cart-item d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <img src="${item.image}" alt="${item.name}" class="me-3">
          <div>
            <h6>${item.name}</h6>
            <small>Protein: ${item.protein}</small><br>
            <small>${extrasText}</small><br>
            <small>₦${item.total.toLocaleString()} x ${item.quantity}</small>
          </div>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="decreaseQty(${index})">-</button>
          <button class="btn btn-outline-secondary btn-sm" onclick="increaseQty(${index})">+</button>
          <button class="btn btn-danger btn-sm" onclick="removeItem(${index})"><i class="bi bi-trash"></i></button>
        </div>
      </div>`;
  });
  cartTotalEl.innerText = total.toLocaleString();
}

// Cart actions
function addToCart(){
  const protein = Array.from(proteinOptions).find(p=>p.checked).nextElementSibling.innerText;
  const extras = Array.from(extraOptions).filter(e=>e.checked).map(e=>e.nextElementSibling.innerText);
  const instructions = instructionsEl.value;
  const total = calculateTotal();
  cart.push({name:foodName, basePrice, protein, extras, total, image:foodImage, quantity:1, instructions});
  saveCart();
}

function increaseQty(i){cart[i].quantity++; saveCart();}
function decreaseQty(i){if(cart[i].quantity>1){cart[i].quantity--;}else{cart.splice(i,1);} saveCart();}
function removeItem(i){cart.splice(i,1); saveCart();}
function saveCart(){localStorage.setItem("cart",JSON.stringify(cart)); renderCart();}
function checkout(){
  if(cart.length===0){alert("Your cart is empty!"); return;}
  alert("Order placed successfully 🎉");
  cart=[]; saveCart();
}

// Initial render
renderCart();