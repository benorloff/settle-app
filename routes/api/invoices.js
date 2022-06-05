const express = require("express");
const router = express.Router();
const invoicesCtrl = require("../../controllers/invoices");
const multer = require("multer");
const upload = multer();
/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.post("/", invoicesCtrl.create);
router.get("/", invoicesCtrl.index);
router.get("/recent", invoicesCtrl.getRecent);
//This has to go after 'recent' since they are both GET requests
router.get("/:id", invoicesCtrl.show);

module.exports = router;