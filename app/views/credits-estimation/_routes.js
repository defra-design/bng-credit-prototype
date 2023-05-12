const express = require('express')
const router = express.Router()

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const version = 'credits-estimation';


// Credits
router.post('/credits-type', function (req, res) {
  //req.session.data['manual-entry'] = 'true';
  //res.redirect('confirm-off-site-gain');
  res.redirect('credits-tier');
});

router.post('/credits-tier', function (req, res) {
  //req.session.data['manual-entry'] = 'true';
  //res.redirect('confirm-off-site-gain');
  res.redirect('credits-broad-habitat-type');
});

router.post('/credits-broad-habitat-type', function (req, res) {
  //req.session.data['manual-entry'] = 'true';
  //res.redirect('confirm-off-site-gain');
  res.redirect('credits-habitat-type');
});

router.post('/credits-habitat-type', function (req, res) {
  //req.session.data['manual-entry'] = 'true';
  //res.redirect('confirm-off-site-gain');
  res.redirect('credits-number');
});

router.post('/credits-number', function (req, res) {
  //req.session.data['manual-entry'] = 'true';
  //res.redirect('confirm-off-site-gain');
  res.redirect('credits-add-more');
});

router.post('/credits-add-more', function (req, res) {
  if (req.session.data['add-more-credits'] == 'yes') {
    req.session.data = {}
    res.redirect('credits-type');
    
  }
  else if (req.session.data['add-more-credits'] == 'no') {
    res.redirect('credits-estimated-cost');
  }
});

module.exports = router
