const express = require("express");
const {registerUsers,loginUsers,currentUsers} = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router()

router.post("/login",loginUsers)
router.post("/register",registerUsers)
router.get("/current",validateToken,currentUsers)
module.exports = router