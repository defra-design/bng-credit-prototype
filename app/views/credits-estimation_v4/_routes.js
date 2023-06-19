const express = require('express')
const router = express.Router()


const version = 'credits-estimation';
// const creditChoices = [];
const credit = {}



// Credits
router.post('/start', function (req, res) {
  //res.redirect('credits-tier');
  res.redirect('credits-type');
});

router.post('/credits-type', function (req, res) {
  //res.redirect('credits-tier');
  res.redirect('credits-distinctiveness');
});

router.post('/credits-distinctiveness', function (req, res) {
  if (req.session.data['credits-type'] == 'Area' && req.session.data['credits-distinctiveness'] == 'High') {
    res.redirect('credits-broad-habitat-type');
  }
  else if (req.session.data['credits-type'] == 'Area' && req.session.data['credits-distinctiveness'] == 'Medium') {
    res.redirect('credits-broad-habitat-type');
  }
  else {
    //req.session.data['custom-setup'] = "true";
    res.redirect('credits-number');
  }
});
  //res.redirect('credits-tier');
  //res.redirect('credits-broad-habitat-type');
//});

router.post('/credits-broad-habitat-type', function (req, res) {
  if (req.session.data['credits-type'] == 'Area' && req.session.data['credits-distinctiveness'] == 'High') {
    res.redirect('credits-habitat-type');
  }
  else if (req.session.data['credits-type'] == 'Area' && req.session.data['credits-distinctiveness'] == 'Medium') {
    res.redirect('credits-number');
  }
  else {
    res.redirect('credits-estimated-cost');
  }
});

router.post('/credits-habitat-type', function (req, res) {
  res.redirect('credits-number');
});

// router.post('/credits-tier', function (req, res) {
//   res.redirect('credits-number');
// });

router.post('/credits-number', function (req, res) {
  res.redirect('credits-add-more');
});

router.post('/credits-add-more', function (req, res) {
  
  let credit = {
    'type': req.session.data['credits-type'],
    'tier': req.session.data['credits-tier'],
    'distinctiveness': req.session.data['credits-distinctiveness'],
    'broad': req.session.data['credits-broad-habitat-type'],
    'habitat': req.session.data['credits-habitat-type'],
    'number': req.session.data['credits-number']
  }

  // set up an empty array in case the credit choices object doesn't exist yet
  let currentCreditChoices = []
  if (req.session.data['credit-choices']) {
    currentCreditChoices = req.session.data['credit-choices']
  }

  currentCreditChoices.push(credit)

  // update the credit choices in the session data
  req.session.data['credit-choices'] = currentCreditChoices
  console.log('CreditChoices Array ' + JSON.stringify(req.session.data['credit-choices']))
  
  if (req.session.data['add-more-credits'] == 'yes') {
    //req.session.data = {}
    res.redirect('credits-type');
    
  }
  else if (req.session.data['add-more-credits'] == 'no') {
    res.redirect('credits-estimated-cost');
  }
});

router.post('/credits-estimated-cost', function (req, res) {
  req.session.data = {}
  res.redirect('credits-type');
});

module.exports = router




