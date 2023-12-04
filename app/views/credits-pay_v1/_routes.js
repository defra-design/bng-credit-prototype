const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


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
        res.redirect('credits-purchase-order');
    }
    else if (req.session.data['development-data'] == 'no') {
        res.redirect('credits-metric-upload');
    }
});

router.post('/credits-purchase-order', function (req, res) {
    res.redirect('credits-individual-or-organisation');
});

router.post('/credits-individual-or-organisation', function (req, res) {
    res.redirect('credits-individual-or-organisation-details');
});

router.post('/credits-individual-or-organisation-details', function (req, res) {
    res.redirect('credits-tier-alt');
});

router.post('/credits-tier-alt', function (req, res) {
    res.redirect('credits-cost');
});

router.post('/credits-cost', function (req, res) {
    res.redirect('credits-terms-and-conditions');
});

router.post('/credits-terms-and-conditions', function (req, res) {
    res.redirect('credits-check-your-answers');
});

router.post('/credits-check-your-answers', function (req, res) {
    res.redirect('credits-confirmation');
});


module.exports = router




