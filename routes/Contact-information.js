const express = require("express");
const Contact = require('../controller/Contact-information')
const ContactRouter = express.Router();

ContactRouter.post("/contact-us",Contact.createContactInformation)
ContactRouter.get("/contact-details", Contact.contactDetails);
ContactRouter.get("/contact-details/:id",Contact.contactDetailsByiD)

module.exports = ContactRouter;