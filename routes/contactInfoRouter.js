const express = require('express')
const router = express.Router()
const ContactController = require('../controller/contactInfoController')

router.post('/addContactInfo', ContactController.addContactInfo)
router.put('/contactUpdate/:id', ContactController.updateContactInfo)
router.get('/contactList', ContactController.contactInfoList) 
router.delete('/delete/:id', ContactController.deleteContactInfo)

module.exports = router;