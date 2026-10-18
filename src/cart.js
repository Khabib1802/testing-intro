function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cart = [], item = {}, quantity = 0) {
  if (quantity <= 0) {
    throw new RangeError("Количество товара должно быть больше 0");
  }

  const existing = cart.find((i) => i.id === item.id);
  const currentQuantity = existing ? existing.quantity : 0;
  const newQuantity = currentQuantity + quantity;

  if (newQuantity > item.stock) {
    throw new RangeError(
      "Количество товара не может быть больше чем количество на складе",
    );
  }

  if (existing) {
    return cart.map((i) =>
      i.id === item.id ? { ...i, quantity: newQuantity } : i,
    );
  }

  return [...cart, { ...item, quantity }];
}

function changeQuantity(cart, id, quantity) {
  if (quantity < 1)
    throw new RangeError("Количество товара не может быть равен 0");

  const item = cart.find((i) => i.id === id);

  if (!item) return cart;

  if (quantity > item?.stock)
    throw new RangeError(
      "Количество товара не может быть больше чем количество на складе",
    );

  item.quantity = quantity;

  return cart;
}
function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}
function calculateCartSubtotal(cart = []) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function calculateOrderTotal(cart = {}, promo = "") {
  const subtotal = calculateCartSubtotal(cart);
  const discount =
    promo === "SAVE10" && subtotal >= 20_000 ? subtotal * 0.1 : 0;
  const delivery = subtotal >= 50_000 ? 0 : 30_000;
  const total = subtotal + delivery - discount;

  const orderTotal = {
    subtotal,
    discount,
    delivery,
    total,
  };

  return orderTotal;
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
