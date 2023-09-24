const express = require("express");
const router = express.Router();

const Data = require("../controller/privacyController");

router.post("/privacy-policy", Data.privacyPolicy);
router.get("/privacy-policy-details", Data.getPolicy);
router.post("/update-policy/:id", Data.updatePrivacyPolicy);

router.post("/terms-of-use", Data.termsOfUse);
router.get("/terms-of-use-details", Data.getTermsOfUse);
router.post("/update-terms/:id", Data.updateTerms);


router.post("/cookie-policy", Data.cookiePolicy);
router.get("/cookie-policy-details", Data.getCookiePolicy);
router.post("/update-cookies/:id", Data.updateCookie);

module.exports = router;
