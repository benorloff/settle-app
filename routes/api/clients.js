const express = require("express");
const router = express.Router();
const clientsCtrl = require("../../controllers/clients");
const multer = require("multer");
const upload = multer();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.post("/", clientsCtrl.create);
router.get("/", clientsCtrl.index);
router.get("/recent", clientsCtrl.getRecent);
//This has to go after 'recent' since they are both GET requests
router.get("/:id", clientsCtrl.show);

module.exports = router;
