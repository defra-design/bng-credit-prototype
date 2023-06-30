const express = require('express')
const router = express.Router()


// Credits Pay
router.post('/metric-upload', function (req, res) {
  res.redirect('purchase-order');
});

router.post('/purchase-order', function (req, res) {
    res.redirect('individual-or-organisation');
});

router.post('/individual-or-organisation', function (req, res) {
    res.redirect('credits-tier');
});

router.post('/credits-tier', function (req, res) {
    res.redirect('credits-cost');
});

router.post('/credits-cost', function (req, res) {
    res.redirect('terms-and-conditions');
});

router.post('/terms-and-conditions', function (req, res) {
    res.redirect('confirmation');
});


module.exports = router




