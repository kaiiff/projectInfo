const express = require("express");
const router = express.Router();

const Subscriber = require("../controller/subscribeController")

router.post("/add-subscriber", Subscriber.addSubscriber);

module.exports = router;
