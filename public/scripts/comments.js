async function addComment(t, e, n) {
  const o = document.getElementById("submitComment").dataset.csrf;
  try {
    let m = await fetch(`/products/${t}/comments`, {
        method: "POST",
        body: JSON.stringify({ text: e, rating: n }),
        headers: { "Content-Type": "application/json", "csrf-token": o },
      }),
      c = await m.json();
    if (c) {
      const e = document.getElementById("commentList"),
        n = document.createElement("li");
      let m = `\n      <button onclick="deleteCommentTrigger('${t}', '${c.comment._id.toString()}', '${o}')" class="btn delete-comment">삭제</button>\n      `;
      (n.innerHTML = `<strong>${c.comment.userData.name}:</strong> ${
        c.comment.text
      } \n                      <span class="comment-rating">⭐ ${
        c.comment.rating
      }</span>\n                      <p><strong>작성 시간:</strong>${new Date(
        c.comment.date
      ).toLocaleString()}</p>\n                      ${m}`),
        e.appendChild(n),
        (document.querySelector(".product-comments").style.display = "none"),
        (document.querySelector(".product-rating").style.display = "none");
    }
  } catch (t) {
    return void alert("오류가 발생했습니다. 다시 시도해 주세요.");
  }
}
async function deleteCommentTrigger(t, e, n) {
  if (confirm("댓글을 삭제하시겠습니까?"))
    try {
      const o = await fetch(`/products/${t}/comments/${e}`, {
          method: "DELETE",
          headers: { "csrf-token": n },
        }),
        m = await o.json();
      if (!m.message || "Comment deleted!" !== m.message)
        return void alert("댓글 삭제 중 오류가 발생했습니다.");
      alert("댓글이 삭제되었습니다!"), location.reload();
    } catch (t) {
      return void alert("댓글 삭제 중 오류가 발생했습니다.");
    }
}
document.addEventListener("DOMContentLoaded", function () {
  const t = document.getElementById("submitComment").dataset.productid;
  document
    .getElementById("submitComment")
    .addEventListener("click", function () {
      try {
        const e = document.getElementById("commentText").value,
          n = parseInt(document.querySelector("[name='rating']:checked").value);
        e && n ? addComment(t, e, n) : alert("평점과 댓글을 모두 작성해주세요");
      } catch {
        alert("평점과 댓글을 모두 작성해주세요");
      }
    });
});
