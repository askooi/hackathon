const deleteProductButtonElements = document.querySelectorAll(
  ".product-item button"
);
async function deleteProduct(e) {
  const t = e.target,
    n = t.dataset.productid,
    o = t.dataset.csrf;
  (await fetch("/admin/products/" + n + "?_csrf=" + o, { method: "DELETE" })).ok
    ? t.parentElement.parentElement.parentElement.parentElement.remove()
    : alert("오류발생!");
}
for (const e of deleteProductButtonElements)
  e.addEventListener("click", deleteProduct);
function handleButtonClick() {
  window.location.href = "/products/dcevent";
}
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".category-tab").forEach((e) => {
    e.addEventListener("click", function () {
      const e = this.getAttribute("data-category");
      window.location.href =
        "모든 제품" === e
          ? "/products"
          : "/products?category=" + encodeURIComponent(e);
    });
  });
}),
  document.addEventListener("DOMContentLoaded", () => {
    document
      .getElementById("btn-search")
      .addEventListener("click", async function () {
        const e = document.querySelector(".product-search-input").value;
        window.location.href =
          "" === e ? "/products" : "/products?search=" + encodeURIComponent(e);
      });
  }),
  document.addEventListener("DOMContentLoaded", () => {
    if ("webkitSpeechRecognition" in window) {
      const e = new webkitSpeechRecognition();
      let t;
      (e.continuous = !1),
        (e.interimResults = !0),
        document
          .getElementById("btn-speak")
          .addEventListener("click", function () {
            e.start(),
              (t = setTimeout(() => {
                e.stop();
              }, 3e3));
          }),
        (e.onresult = function (n) {
          clearTimeout(t);
          const o = n.resultIndex,
            c = n.results[o][0].transcript;
          (document.querySelector(".product-search-input").value = c), e.stop();
        }),
        (e.onerror = function (e) {
          clearTimeout(t), console.error(e.error);
        }),
        (e.onend = function () {
          clearTimeout(t);
        });
    } else
      document
        .getElementById("btn-speak")
        .addEventListener("click", function () {
          alert(
            "죄송합니다. 음성 인식은 이 브라우저에서 지원되지 않습니다. Chrome을 사용해보세요."
          );
        });
  });
