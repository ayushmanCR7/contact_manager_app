const express = require("express");
const { getContact, createContact,updateContact, getindividualContact, deleteContact } = require("../controllers/controllers");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();
router.use(validateToken)
router.route("/").get(getContact)
router.route("/").post(createContact)
router.route("/:id").put(updateContact)
router.route("/:id").get(getindividualContact)
router.route("/:id").delete(deleteContact)
module.exports = router