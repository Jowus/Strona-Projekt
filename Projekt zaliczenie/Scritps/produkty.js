document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".buy-button");
  const cartMessage = document.querySelector(".cart-message");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemName = button.getAttribute("data-product");
      const itemImage = button.getAttribute("data-image");

      // Wyświetl komunikat o dodaniu produktu do koszyka
      cartMessage.textContent = `${itemName} dodano do koszyka!`;
      cartMessage.classList.add("show");

      // Ukryj komunikat po 3 sekundach
      setTimeout(() => {
        cartMessage.classList.remove("show");
      }, 3000);

      // Dodajemy produkt do localStorage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ name: itemName, image: itemImage });
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`Dodano "${itemName}" do koszyka!`);
    });
  });
});
