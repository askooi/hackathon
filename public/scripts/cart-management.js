const addToCartButtonElement = document.querySelector("#product-details .btn"),
  cartBadgeElements = document.querySelectorAll(".nav-items .badge"),
  productQuantityInputElement = document.querySelector(
    "#product-details #product-quantity"
  ),
  addToOrderButtonElement = document.querySelector("#product-details #buy-now");
async function addToCart() {
  const t = addToCartButtonElement.dataset.productid,
    e = addToCartButtonElement.dataset.csrf,
    n = Number(productQuantityInputElement.value);
  let a;
  try {
    a = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({ productId: t, quantity: n, _csrf: e }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (t) {
    return void alert("오류발생!");
  }
  if (!a.ok) return void alert("오류발생!");
  const o = (await a.json()).newTotalItems;
  for (const t of cartBadgeElements) t.textContent = o;
  confirm("장바구니에 상품이 담겼습니다. 장바구니로 이동할까요?") &&
    (window.location.href = "/cart");
}
async function directPayment() {
  if (!confirm("주문하시겠습니까?")) return;
  const t = addToOrderButtonElement.dataset.productid,
    e = addToOrderButtonElement.dataset.csrf,
    n = parseInt(productQuantityInputElement.value);
  let a;
  try {
    a = await fetch("/payment", {
      method: "POST",
      body: JSON.stringify({ productId: t, quantity: n, _csrf: e }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (t) {
    return void alert("오류발생!");
  }
  a.ok ? (window.location.href = "/payment") : alert("오류발생!");
}
addToCartButtonElement.addEventListener("click", addToCart),
  addToOrderButtonElement.addEventListener("click", directPayment);
