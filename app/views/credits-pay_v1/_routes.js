const express = require('express')
const router = express.Router()


// Credits Pay
// router.post('/metric-upload', function (req, res) {
//     res.redirect('purchase-order');
// });

router.post('/credits-metric-upload', function (req, res) {
    res.redirect('credits-metric-upload-check');
});

router.post('/credits-metric-upload-check', function (req, res) {
    if (req.session.data['metric-correct'] == 'yes') {
        res.redirect('credits-development-location');
    }
    else if (req.session.data['metric-correct'] == 'no') {
        res.redirect('credits-metric-upload');
    }
});

router.post('/credits-development-location', function (req, res) {
    if (req.session.data['development-data'] == 'yes') {
        res.redirect('purchase-order');
    }
    else if (req.session.data['development-data'] == 'no') {
        res.redirect('credits-metric-upload');
    }
});

router.post('/purchase-order', function (req, res) {
    res.redirect('credits-individual-or-organisation');
});

router.post('/credits-individual-or-organisation', function (req, res) {
    res.redirect('credits-individual-or-organisation-details');
});

router.post('/credits-individual-or-organisation-details', function (req, res) {
    res.redirect('credits-tier');
});

router.post('/credits-tier', function (req, res) {
    res.redirect('credits-cost');
});

router.post('/credits-cost', function (req, res) {
    res.redirect('terms-and-conditions');
});

router.post('/terms-and-conditions', function (req, res) {
    res.redirect('credits-check-your-answers');
});

router.post('/credits-check-your-answers', function (req, res) {
    res.redirect('credits-confirmation');
});


module.exports = router




