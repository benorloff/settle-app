const express = require("express");
const router = express.Router();
const clientsCtrl = require("../../controllers/clients");
const multer = require("multer");
const upload = multer();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.post("/create", clientsCtrl.create);

module.exports = router;
