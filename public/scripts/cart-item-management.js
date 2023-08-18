const cartItemUpdateFormElements = document.querySelectorAll(
    ".cart-item-management"
  ),
  cartTotalPriceElement = document.getElementById("cart-total-price"),
  cartBadgeElements = document.querySelectorAll(".nav-items .badge");
async function updateCartItem(t) {
  t.preventDefault();
  const e = t.target,
    a = e.dataset.productid,
    r = e.dataset.csrf,
    n = e.firstElementChild.value;
  let o;
  try {
    o = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({ productId: a, quantity: n, _csrf: r }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (t) {
    return void alert("오류발생!");
  }
  if (!o.ok) return void alert("오류발생!");
  const d = await o.json();
  if (0 === d.updatedCartData.updatedItemPrice)
    e.parentElement.parentElement.remove();
  else {
    e.parentElement.querySelector(".cart-item-price").textContent =
      d.updatedCartData.updatedItemPrice.toFixed(0);
  }
  cartTotalPriceElement.textContent =
    d.updatedCartData.newTotalPrice.toFixed(0);
  for (const t of cartBadgeElements)
    t.textContent = d.updatedCartData.newTotalQuantity;
}
for (const t of cartItemUpdateFormElements)
  t.addEventListener("submit", updateCartItem);
