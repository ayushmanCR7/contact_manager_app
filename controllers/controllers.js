const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactSchema")
const getContact = async (req, res) => {
    const contacts = await Contact.find({user_id: req.User.id})
    res.json(contacts)
}
const createContact = asyncHandler( async (req, res) => {
    const {
        name,
        email,
        phone
    } = req.body;
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("all fields to be filled")
    }
    const contact = await Contact.create({
       name,
       email,
       phone,
       user_id: req.User.id
    });
    res.json(contact)
})
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.User.id) {
        res.status(403);
        throw new Error("Please don't try to change someone else's contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updatedContact);
});

const getindividualContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.json(contact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        throw new Error("contact not found")
    }
    if (contact.user_id.toString() !== req.User.id) {
        res.status(403);
        throw new Error("Please don't try to change someone else's contacts");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.json(contact)
})

module.exports = {
    getContact,
    createContact,
    updateContact,
    getindividualContact,
    deleteContact
}