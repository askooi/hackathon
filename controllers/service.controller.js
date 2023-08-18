async function getInquire(e, i, r) {
  i.render("customer/service/inquire");
}
async function postInquire(e, i, r) {
  e.body.inquiry;
  i.redirect("/service/myInquiries");
}
async function getFaq(e, i, r) {
  i.render("customer/service/faq");
}
async function getMyInquiries(e, i, r) {
  i.render("customer/service/my", { inquiries: [] });
}
module.exports = {
  getInquire: getInquire,
  postInquire: postInquire,
  getFaq: getFaq,
  getMyInquiries: getMyInquiries,
};
