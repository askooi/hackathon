const Product = require("./product.model");
class Cart {
  constructor(t = [], i = 0, e = 0) {
    (this.items = t), (this.totalQuantity = i), (this.totalPrice = e);
  }
  async updatePrices() {
    const t = this.items.map(function (t) {
        return t.product.id;
      }),
      i = await Product.findMultiple(t),
      e = [];
    for (const t of this.items) {
      const o = i.find(function (i) {
        return i.id === t.product.id;
      });
      o
        ? ((t.product = o), (t.totalPrice = t.quantity * t.product.price))
        : e.push(t.product.id);
    }
    e.length > 0 &&
      (this.items = this.items.filter(function (t) {
        return e.indexOf(t.product.id) < 0;
      })),
      (this.totalQuantity = 0),
      (this.totalPrice = 0);
    for (const t of this.items)
      (this.totalQuantity = this.totalQuantity + t.quantity),
        (this.totalPrice = this.totalPrice + t.totalPrice);
  }
  addItem(t, i = 1) {
    const e = { product: t, quantity: i, totalPrice: t.price * i };
    for (let o = 0; o < this.items.length; o++) {
      const r = this.items[o];
      if (r.product.id === t.id)
        return (
          (e.quantity = +r.quantity + i),
          (e.totalPrice = r.totalPrice + t.price * i),
          (this.items[o] = e),
          (this.totalQuantity += i),
          void (this.totalPrice += t.price * i)
        );
    }
    this.items.push(e),
      (this.totalQuantity += i),
      (this.totalPrice += t.price * i);
  }
  updateItem(t, i) {
    for (let e = 0; e < this.items.length; e++) {
      const o = this.items[e];
      if (o.product.id === t && i > 0) {
        const t = { ...o },
          r = i - o.quantity;
        return (
          (t.quantity = i),
          (t.totalPrice = i * o.product.price),
          (this.items[e] = t),
          (this.totalQuantity = this.totalQuantity + r),
          (this.totalPrice += r * o.product.price),
          { updatedItemPrice: t.totalPrice }
        );
      }
      if (o.product.id === t && i <= 0)
        return (
          this.items.splice(e, 1),
          (this.totalQuantity = this.totalQuantity - o.quantity),
          (this.totalPrice -= o.totalPrice),
          { updatedItemPrice: 0 }
        );
    }
  }
}
module.exports = Cart;
