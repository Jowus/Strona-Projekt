// Funkcja do renderowania koszyka (jeśli chcesz wyświetlić jego zawartość na stronie koszyka)
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");

  // Sprawdź, czy element kontenera istnieje
  if (!cartItemsContainer) {
    console.error('Element "cart-items" nie istnieje w DOM.');
    return;
  }

  // Wyczyść zawartość kontenera
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart-message">Koszyk jest pusty!</p>';
    return;
  }

  // Wyświetl produkty w koszyku
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <span>${item.name}</span>
      <button class="remove-button" data-index="${index}">Usuń</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
}

// Funkcja do usuwania produktu z koszyka
function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Usuwanie produktu
  localStorage.setItem("cart", JSON.stringify(cart)); // Zapisz nowy stan koszyka
  renderCart(); // Zaktualizuj widok koszyka
}

// Funkcja do czyszczenia całego koszyka
function clearCart() {
  localStorage.removeItem("cart");
  renderCart(); // Odśwież koszyk
}

// Obsługuje kliknięcia w przyciski usuwania produktów
document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const cartItemsContainer = document.getElementById("cart-items");
  const clearCartButton = document.getElementById("clear-cart");

  // Sprawdź, czy elementy istnieją, zanim przypiszesz zdarzenia
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-button")) {
        const index = event.target.getAttribute("data-index");
        removeItem(Number(index)); // Przekonwertuj na liczbę
      }
    });
  }

  if (clearCartButton) {
    clearCartButton.addEventListener("click", clearCart);
  }
});
