const express = require("express");
const router = express.Router();
const stripeCtrl = require("../../controllers/stripe");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.post("/v1/accounts", stripeCtrl.createAccount);
router.get("/v1/accounts/:id", stripeCtrl.retrieveAccount);
router.post("/v1/accounts/:id", stripeCtrl.updateAccount);
router.delete("/v1/accounts/:id", stripeCtrl.deleteAccount);
router.post("/v1/account_links", stripeCtrl.createAccountLink);
router.post("/v1/invoices", stripeCtrl.createInvoice);
router.get("/v1/invoices/:id", stripeCtrl.retrieveInvoice);
router.post("/v1/invoices/:id", stripeCtrl.updateInvoice);
router.delete("/v1/invoices/:id", stripeCtrl.deleteDraftInvoice);

module.exports = router;
