async function updateCartPrices(a, t, c) {
  const e = t.locals.cart;
  await e.updatePrices(), c();
}
module.exports = updateCartPrices;
