const express = require('express')
const router = express.Router()

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const version = 'v2';

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
  var notifyClient = new NotifyClient("test-36aa0443-3296-490d-b3f3-755f4a5175b0-1347c669-3f1a-4862-bf40-f5bb22c63554");
  notifyClient.sendEmail('ddea7788-5f7f-4cdc-97fa-c1e026cbf10a', 'bng.developer@hotmail.com', {}).then(response => console.log(response)).catch(err => console.error(err))
  res.render(version+'/developer-scenario');
});
router.get('/purchase-credits', function (req, res) {
    req.session.data['journey'] = 'developer-handshake';
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

    res.redirect('sign-in');
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
router.get('/developer-confirm-invoice', function (req, res) {
  // uses GOV.UK notify
  // uses GOV.UK notify
  var NotifyClient = require('notifications-node-client').NotifyClient;
  var notifyClient = new NotifyClient("developer__buy_credits-fa28c2d7-ca6b-43f6-957e-c0dbf53df165-e2f024c1-8428-464c-ae1e-2331c6683770");

  notifyClient.sendEmail('08991d64-b093-40ff-b29e-c83ec5ffb57a', 'bng.developer@hotmail.com', {

  }).then(response => console.log(response)).catch(err => console.error(err))

  res.render(version+'/developer-confirm-invoice');
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
router.get('/developer-confirm-request', function (req, res) {
  // uses GOV.UK notify
  // uses GOV.UK notify
  var NotifyClient = require('notifications-node-client').NotifyClient;
  var notifyClient = new NotifyClient("developer__buy_credits-fa28c2d7-ca6b-43f6-957e-c0dbf53df165-e2f024c1-8428-464c-ae1e-2331c6683770");

  notifyClient.sendEmail('08991d64-b093-40ff-b29e-c83ec5ffb57a', 'bng.developer@hotmail.com', {

  }).then(response => console.log(response)).catch(err => console.error(err))

  res.render(version+'/developer-confirm-request');
});

router.post('/halt-page', function (req, res) {
 if(req.session.data['condition'] == "true,true"){
  res.redirect('metric-upload');
  }
  else{
    req.session.data['halt-error'] = "true";
    res.redirect('halt-page');
  }
});
router.post('/metric-upload', function (req, res) {
    res.redirect('metric-upload-check');
});
router.post('/metric-upload-check', function (req, res) {
  //creating credit data
  req.session.data['habitat'] = "Area Habitats";
  req.session.data['habitat-description'] = "This includes area spaces such as woodland and grassland";

  if(req.session.data['habitat-ha']){}
  else{
    req.session.data['habitat-ha'] = 0.16;
    req.session.data['habitat-unit'] = 0.2;
  }

  req.session.data['hedgerow'] = "Linear Habitats";
  req.session.data['hedgerow-description'] = "This includes habitats such as hedgerows and lines of trees";

  if(req.session.data['hedgerow-ha']){}
  else{
    req.session.data['hedgerow-ha'] = 0.08;
    req.session.data['hedgerow-unit'] = 0.3;
  }



  if (req.session.data['metric-correct'] == 'yes') {
    res.redirect('development-location');
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
    res.redirect('calculate-credits');
    }
  else if (req.session.data['metric-check-data'] == 'no') {
    res.redirect('metric-upload');
  }
});
router.post('/development-location', function (req, res) {
    if(req.session.data['development-data']=='yes'){
      res.redirect('metric-check-data');
    }
    else if(req.session.data['development-data']=='no'){
      res.redirect('metric-upload');
    }
});
router.post('/developer-name', function (req, res) {
    if(req.session.data['gotToCheckAnswers']=='yes'){
      res.redirect('check-answers');
    }
    else{
        res.redirect('developer-contact-details');
    }
});
router.post('/developer-contact-details', function (req, res) {
    if(req.session.data['gotToCheckAnswers']=='yes'){
        res.redirect('check-answers');
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
    req.session.data['payment-method'] = "Generate an invoice";
    res.redirect('alternative-email');
  }
});
router.post('/calculate-credits', function (req, res) {
  if(req.session.data['gotToCheckAnswers']=='yes'){
    res.redirect('check-answers');
  }
  else{
    res.redirect('developer-name');
  }
});
router.post('/dd-account-details', function (req, res) {
    res.redirect('dd-date');
});
router.post('/dd-date', function (req, res) {
    req.session.data['dd-date'] = req.body.ddday + " " + monthNames[(req.body.ddmonth - 1)] + " " + req.body.ddyear;
    res.redirect('dd-mandate');
});
router.post('/developer-confirm-request', function (req, res) {
  var NotifyClient = require('notifications-node-client').NotifyClient;
  var notifyClient = new NotifyClient("developer__buy_credits-fa28c2d7-ca6b-43f6-957e-c0dbf53df165-e2f024c1-8428-464c-ae1e-2331c6683770");

  notifyClient.sendEmail('10c2a5c8-735b-4e51-97eb-6bcd20081ad2', 'bng.developer@hotmail.com', {

  }).then(response => console.log(response)).catch(err => console.error(err));

  res.redirect('index');
});
router.post('/alternative-email', function (req, res) {

  if (req.session.data['alternative-email-required'] == 'Yes') {
    res.redirect('add-alternative-email');
  }
  else if (req.session.data['alternative-email-required'] == 'No') {
    res.redirect('check-answers');
  }
});
router.post('/add-alternative-email', function (req, res) {
  res.redirect('check-answers');
});

router.post('/view-sign-in', function (req, res) {

     if(req.body.signin == "22/01976/RJL" && req.body.password == "734867"){
       req.session.data['login-error'] = "false";
       res.redirect('view-payment');
     }
     else{
       req.session.data['login-error'] = "true";
       res.redirect('view-sign-in');
     }

});
module.exports = router
