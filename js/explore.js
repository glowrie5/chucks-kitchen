// Back to Top
const backToTop = document.getElementById("backToTop");
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

function addToCartAndGo(name, price, image) {
    price = Number(price); 

    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1, image });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    // Redirect to order.html
    window.location.href = "order.html";
}