const express = require("express");
const router = express.Router();
const invoicesCtrl = require("../../controllers/invoices");
const multer = require("multer");
const upload = multer();
/*---------- Public Routes ----------*/
router.post("/", invoicesCtrl.create);
router.get("/", invoicesCtrl.index);
router.get("/recent", invoicesCtrl.getRecent);

/*---------- Protected Routes ----------*/

module.exports = router;