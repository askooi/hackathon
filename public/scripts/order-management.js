const updateOrderFormElements = document.querySelectorAll(
    ".order-actions form"
  ),
  cancelOrderButtons = document.querySelectorAll(".order-actions-user form");
async function updateOrder(e) {
  e.preventDefault();
  const t = e.target,
    r = new FormData(t),
    n = r.get("status"),
    o = r.get("orderid"),
    a = r.get("_csrf");
  let c;
  try {
    c = await fetch(`/admin/orders/${o}`, {
      method: "PATCH",
      body: JSON.stringify({ newStatus: n, _csrf: a }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return void alert("오류발생! - 주문을 업데이트 할 수 없습니다");
  }
  if (!c.ok) return void alert("오류발생! - 주문을 업데이트 할 수 없습니다");
  const s = await c.json();
  t.parentElement.parentElement.querySelector(".badge").textContent =
    s.newStatus.toUpperCase();
}
for (const e of updateOrderFormElements)
  e.addEventListener("submit", updateOrder);
async function cancelOrder(e) {
  e.preventDefault();
  if (!confirm("주문을 취소하시겠습니까?")) return;
  const t = e.target.closest("form"),
    r = new FormData(t),
    n = r.get("orderid"),
    o = r.get("_csrf");
  let a;
  try {
    a = await fetch(`/orders/cancel/${n}`, {
      method: "PATCH",
      body: JSON.stringify({ _csrf: o }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return void alert("오류가 발생했습니다. 다시 시도해 주세요.");
  }
  if (!a.ok) return void alert("오류가 발생했습니다. 다시 시도해 주세요.");
  const c = await a.json();
  c
    ? (alert("주문이 취소되었습니다."),
      (t.parentElement.parentElement.querySelector(".badge").textContent =
        c.newStatus.toUpperCase()),
      (window.location.href = "/orders"))
    : alert("주문 취소를 실패하였습니다. 다시 시도해 주세요.");
}
for (const e of cancelOrderButtons) e.addEventListener("click", cancelOrder);
