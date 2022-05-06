const express = require('express')
const router = express.Router()


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const version = 'v1';
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

router.get('/developer-scenario', function (req, res) {
  // uses GOV.UK notify
  var NotifyClient = require('notifications-node-client').NotifyClient;
  var notifyClient = new NotifyClient("pp_key-318bd8b2-a7aa-4d45-8993-3c5c440ae23d-4ef08fff-d5d1-446a-aa7b-1ea0b21abdc0");
  notifyClient.sendEmail('587db073-5e73-432a-83e6-32e6045f620c', 'bng.developer@hotmail.com', {}).then(response => console.log(response)).catch(err => console.error(err))
  res.render(version+'/developer-scenario');
});
router.get('/start-page', function (req, res) {
    req.session.data['journey']= req.query.journey;
    res.render(version+'/start-page');
});
router.post('/start-page', function (req, res) {
   if(req.session.data['journey'] == 'developer'){
     res.redirect('metric-upload');
   }
   else if(req.session.data['journey'] == 'handshake'){
     res.redirect('sign-in');
   }
});
router.get('/purchase-credits', function (req, res) {
    req.session.data['journey'] = 'developer-handshake'
    res.redirect('sign-in');
});
router.post('/sign-in', function (req, res) {
   if(req.session.data['journey'] == 'handshake'){
     res.redirect('metric-upload');
   }
   else if(req.session.data['journey'] == 'developer-handshake'){
     res.redirect('development-location');
   }
});
router.post('/metric-upload', function (req, res) {
    res.redirect('metric-upload-check');
});
router.post('/metric-upload-check', function (req, res) {
  //creating credit data
  req.session.data['habitat'] = "Woodland and forest";
  req.session.data['habitat-description'] = "Lowland mixed decidous woodland";

  if(req.session.data['habitat-ha']){}
  else{
    req.session.data['habitat-ha'] = 0.16;
    req.session.data['habitat-unit'] = 0.2;
  }

  req.session.data['hedgerow'] = "Native species rich hedgerow";

  if(req.session.data['hedgerow-ha']){}
  else{
    req.session.data['hedgerow-ha'] = 0.08;
    req.session.data['hedgerow-unit'] = 0.3;
  }



  if (req.session.data['metric-correct'] == 'yes') {
    res.redirect('metric-check-data');
  }
  else if (req.session.data['metric-correct'] == 'no') {
    res.redirect('metric-upload');
  }
});
router.post('/metric-check-data', function (req, res) {

  //temporary data
  if(req.session.data['habitat-credit-price'] == undefined){
    req.session.data['habitat-credit-price'] = 27301.65;
    req.session.data['hedgerow-credit-price'] = 34083;
    req.session.data['credit-ratio'] = 1;
  }

  // calculation
  req.session.data['habitatCredits'] = (req.session.data['habitat-unit']*req.session.data['credit-ratio']).toFixed(2);
  req.session.data['habitatTotal'] = (req.session.data['habitat-credit-price']*req.session.data['habitat-unit'])*req.session.data['credit-ratio'];

  req.session.data['hedgerowCredits'] = (req.session.data['hedgerow-unit']*req.session.data['credit-ratio']).toFixed(2);
  req.session.data['hedgerowTotal'] = (req.session.data['hedgerow-credit-price']*req.session.data['hedgerow-unit'])*req.session.data['credit-ratio'];

  req.session.data['creditAmount'] = (req.session.data['habitatTotal'] + req.session.data['hedgerowTotal']).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  req.session.data['habitatTotal'] = req.session.data['habitatTotal'].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  req.session.data['hedgerowTotal'] = req.session.data['hedgerowTotal'].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');


  if (req.session.data['metric-check-data'] == 'yes') {
    if(req.session.data['journey'] == 'developer'){
      res.redirect('calculate-credits');
    }
    else if(req.session.data['journey'] == 'handshake'){
      res.redirect('lpa-summary');
    }
  }
  else if (req.session.data['metric-check-data'] == 'no') {
    res.redirect('metric-upload');
  }
});
router.post('/development-location', function (req, res) {
    if(req.session.data['development-data']=='yes'){
      if(req.session.data['gotToCheckAnswers']=='yes'){
        res.redirect('check-answers');
      }
        if(req.session.data['journey'] == 'developer-handshake'){
          res.redirect('calculate-credits');
        }
        else{
          res.redirect('developer-name');
        }

    }
});
router.post('/developer-name', function (req, res) {
    if(req.session.data['gotToCheckAnswers']=='yes'){
      res.redirect('check-answers');
    }
    else{
      if(req.session.data['journey'] == 'developer'){
        res.redirect('developer-contact-details');
      }
      else if(req.session.data['journey'] == 'handshake'){
        res.redirect('lpa-check-answers');
      }
    }
});
router.post('/developer-contact-details', function (req, res) {
    if(req.session.data['gotToCheckAnswers']=='yes'){
      res.redirect('lpa-check-answers');
    }
    else{
    res.redirect('purchaser');
    }
});
router.post('/purchaser', function (req, res) {
    if(req.session.data['gotToCheckAnswers']=='yes'){
      res.redirect('check-answers');
    }
    else{
    res.redirect('payment-method');
    }
});
router.post('/payment-method', function (req, res) {
    res.redirect('check-answers')
});
router.get('/check-answers', function (req, res) {
    req.session.data['gotToCheckAnswers']='yes';
    res.render(version+'/check-answers');
});
router.get('/lpa-confirm', function (req, res) {

  // uses GOV.UK notify
  var NotifyClient = require('notifications-node-client').NotifyClient;
  var notifyClient = new NotifyClient("developer__buy_credits-fa28c2d7-ca6b-43f6-957e-c0dbf53df165-e2f024c1-8428-464c-ae1e-2331c6683770");

  notifyClient.sendEmail('03170ad9-02f5-4ae2-8163-c833ee5e10fc', 'bng.developer@hotmail.com', {

  }).then(response => console.log(response)).catch(err => console.error(err))

  res.render(version+'/lpa-confirm');
});
// router.post('/lpa-confirm', function (req, res) {
//     req.session.data['journey'] = "developer-handshake";
//     res.redirect('sign-in'); // just for test. remove after flow complete
// });
router.post('/calculate-credits', function (req, res) {
  if(req.session.data['journey'] == 'developer-handshake'){
    res.redirect('developer-contact-details');
  }
  else{
    res.redirect('development-location');
  }
});
router.post('/dd-date', function (req, res) {
    req.session.data['dd-date'] = req.body.ddday + " " + monthNames[(req.body.ddmonth - 1)] + " " + req.body.ddyear;
    res.redirect('dd-mandate');
});
router.get('/developer-confirm-dd', function (req, res) {
  // uses GOV.UK notify
  // uses GOV.UK notify
  var NotifyClient = require('notifications-node-client').NotifyClient;
  var notifyClient = new NotifyClient("developer__buy_credits-fa28c2d7-ca6b-43f6-957e-c0dbf53df165-e2f024c1-8428-464c-ae1e-2331c6683770");

  notifyClient.sendEmail('10c2a5c8-735b-4e51-97eb-6bcd20081ad2', 'bng.developer@hotmail.com', {

  }).then(response => console.log(response)).catch(err => console.error(err))

  res.render(version+'/developer-confirm-dd');
});

router.get('/developer-confirm-invoice', function (req, res) {
  // uses GOV.UK notify
  // uses GOV.UK notify
  var NotifyClient = require('notifications-node-client').NotifyClient;
  var notifyClient = new NotifyClient("developer__buy_credits-fa28c2d7-ca6b-43f6-957e-c0dbf53df165-e2f024c1-8428-464c-ae1e-2331c6683770");

  notifyClient.sendEmail('08991d64-b093-40ff-b29e-c83ec5ffb57a', 'bng.developer@hotmail.com', {

  }).then(response => console.log(response)).catch(err => console.error(err))

  res.render(version+'/developer-confirm-invoice');
});

router.post('/developer-confirm-invoice', function (req, res) {
  var NotifyClient = require('notifications-node-client').NotifyClient;
  var notifyClient = new NotifyClient("developer__buy_credits-fa28c2d7-ca6b-43f6-957e-c0dbf53df165-e2f024c1-8428-464c-ae1e-2331c6683770");

  notifyClient.sendEmail('10c2a5c8-735b-4e51-97eb-6bcd20081ad2', 'bng.developer@hotmail.com', {

  }).then(response => console.log(response)).catch(err => console.error(err));

  res.redirect('index');
});
module.exports = router
