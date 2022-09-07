const router=require('express').Router();
const {createDonation,getDonations}=require("../controllers/donationController");


router.put("/:eventId",createDonation);
router.get("/",getDonations);
//router.get("/ngoId/:ngoId",getDonationsOfNgo);

module.exports = router;
