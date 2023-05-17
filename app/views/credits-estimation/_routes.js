const express = require('express')
const router = express.Router()


const version = 'credits-estimation';
const creditChoices = [];
const credit = {}



// Credits
router.post('/credits-type', function (req, res) {
  res.redirect('credits-tier');
});

router.post('/credits-tier', function (req, res) {
  res.redirect('credits-broad-habitat-type');
});

router.post('/credits-broad-habitat-type', function (req, res) {
  res.redirect('credits-habitat-type');
});

router.post('/credits-habitat-type', function (req, res) {
  res.redirect('credits-number');
});

router.post('/credits-number', function (req, res) {
  res.redirect('credits-add-more');
});

router.post('/credits-add-more', function (req, res) {
  let credit = {
    type: req.session.data['credits-type'],
    tier: req.session.data['credits-tier'],
    broad: req.session.data['credits-broad-habitat-type'],
    habitat: req.session.data['credits-habitat-type'],
    number: req.session.data['credits-number']
  }
  req.session.data.creditChoices.push(credit);
  console.log('CreditChoices Array' +JSON.stringify(creditChoices));
  
  if (req.session.data['add-more-credits'] == 'yes') {
    //req.session.data = {}
    res.redirect('credits-type');
    
  }
  else if (req.session.data['add-more-credits'] == 'no') {
    res.redirect('credits-estimated-cost');
  }
});

module.exports = router





