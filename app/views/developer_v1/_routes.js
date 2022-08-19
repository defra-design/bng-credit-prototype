const express = require('express')
const router = express.Router()

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const version = 'developer_v1';

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'GBP',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

// GETS

router.get('/index', function (req, res) {
  if(req.session.data['custom-setup']=="true"){
    res.render(version+'/index');
  }
  else{
    req.session.data['onsite']="true";
    req.session.data['offsite']="true";
    req.session.data['credits']="true";
    req.session.data['defraID']="false";
    res.render(version+'/index');
  }
});

// POSTS
router.post('/setup', function (req, res) {
    req.session.data['custom-setup']="true";
    res.redirect('index');
});
router.post('/sign-in', function (req, res) {
    if(req.session.data['defraID']=="true"){
      res.redirect('https://cust-id-prototype.herokuapp.com/tasked/defra-id/about-data?returnUrl=https://bng-developer-prototype.herokuapp.com/developer_v1/metric-upload');
    }
    else{
      res.redirect('metric-upload');
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
      req.session.data['task1'] = 'complete';
      res.redirect('tasklist');
    }
    else if(req.session.data['development-data']=='no'){
      req.session.data['task1'] = 'inprogress';
      res.redirect('onsite-no');
    }
});
router.post('/location-options', function (req, res) {
    req.session.data['task2'] = 'inprogress';

    if(req.session.data['location-options']=='import'){
      res.redirect('location-import');
    }
    else if(req.session.data['location-options']=='upload'){
      res.redirect('location-upload');
    }
});
router.post('/location-import', function (req, res) {
      res.redirect('location-confirm');
});
router.post('/location-confirm', function (req, res) {
    req.session.data['task2'] = 'complete';

    if(req.session.data['location-confirm']=='yes'){
      res.redirect('tasklist');
    }
    else if(req.session.data['location-confirm']=='no-geo'){
      res.redirect('location-import');
    }
    else if(req.session.data['location-confirm']=='no'){
      res.redirect('location-upload');
    }
});
router.post('/location-upload', function (req, res) {
    res.redirect('location-upload-confirm');
});
router.post('/location-upload-confirm', function (req, res) {
    if(req.session.data['location-upload-confirm']=='yes'){
      res.redirect('location-area');
    }
    else if(req.session.data['location-upload-confirm']=='no'){
      res.redirect('location-upload');
    }
});
router.post('/location-area', function (req, res) {
    res.redirect('location-grid-reference');
});
router.post('/location-grid-reference', function (req, res) {
    res.redirect('location-confirm');
});
router.post('/onsite', function (req, res) {


    if(req.session.data['onsite-confirm']=='yes'){
      req.session.data['task3'] = 'complete';
      res.redirect('tasklist');
    }
    else if(req.session.data['onsite-confirm']=='no'){
      req.session.data['task3'] = 'inprogress';
      res.redirect('onsite-no');
    }

});
router.post('/offsite-total', function (req, res) {
    req.session.data['task3'] = 'inprogress';
    req.session.data['offsite-done'] = 'no';
    if(req.session.data['onsite-total']=='yes'){
      res.redirect('offsite1');
    }
    else if(req.session.data['onsite-total']=='no'){
      res.redirect('onsite-no');
    }

});
router.post('/offsite1', function (req, res) {
    req.session.data['task3'] = 'inprogress';

    if(req.session.data['offsite1']=='yes'){
      res.redirect('legal-agreement-upload');
    }
    else if(req.session.data['offsite1']=='no'){
      res.redirect('onsite-no');
    }

});
router.post('/offsite2', function (req, res) {
    req.session.data['task3'] = 'inprogress';

    if(req.session.data['offsite1']=='yes'){
      req.session.data['offsite-done']='yes';
      res.redirect('legal-agreement-upload');
    }
    else if(req.session.data['offsite1']=='no'){
      res.redirect('onsite-no');
    }

});
router.post('/legal-agreement-upload', function (req, res) {
  res.redirect('legal-agreement-check');
});
router.post('/legal-agreement-check', function (req, res) {


    if(req.session.data['legal-agreement-correct']=='yes'){
      if(req.session.data['offsite-done']=='yes'){
        req.session.data['task4'] = 'complete';
        res.redirect('tasklist');
      }
      else{
        res.redirect('offsite2');
      }

    }
    else if(req.session.data['offsite1']=='no'){
      res.redirect('legal-agreement-upload');
    }

});
router.post('/email', function (req, res) {
    if(req.session.data['email-required']=='yes'){
        res.redirect('email-entry');
    }
    else if(req.session.data['offsite1']=='no'){
      req.session.data['task5'] = 'complete';
      res.redirect('tasklist');
    }
});
router.post('/email-entry', function (req, res) {

      req.session.data['task5'] = 'complete';
      res.redirect('tasklist');

});
module.exports = router
