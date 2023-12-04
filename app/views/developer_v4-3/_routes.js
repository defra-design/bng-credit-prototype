const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const version = 'developer_v4-3';

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'GBP',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

// GETS - Requesting data
router.get('/index', function (req, res) {

  if (req.session.data['custom-setup'] == "true") {
    var sections = 3;
    if (req.session.data['onsite'] == "true") {
      sections++
    }
    if (req.session.data['offsite'] == "true" || req.session.data['multiple-offsite'] == "true") {
      sections++
    }
    if (req.session.data['credits'] == "true") {
      sections++
    }
    req.session.data['sectionscomplete'] = 0;
    req.session.data['sections'] = sections;
    res.render(version + '/index');
  }
  else {
    req.session.data['sectionscomplete'] = 0;
    req.session.data['sections'] = 6;
    req.session.data['onsite'] = "true";
    req.session.data['offsite'] = "true";
    req.session.data['credits'] = "true";
    req.session.data['defraID'] = "false";
    res.render(version + '/index');
  }
});
router.get('/index1', function (req, res) {
  req.session.data['sectionscomplete'] = 0;
  req.session.data['sections'] = 6;
  req.session.data['alternative'] = "true";
  req.session.data['onsite'] = "true";
  req.session.data['offsite'] = "true";
  req.session.data['credits'] = "true";
  req.session.data['defraID'] = "false";
  res.render(version + '/index');
});
router.get('/no-checks', function (req, res) {
  req.session.data['metric-correct'] = 'yes';
  req.session.data['task1'] = 'complete';
  req.session.data['task2'] = 'not started';
  req.session.data['task3'] = 'complete';
  req.session.data['task4'] = 'complete';
  req.session.data['task5'] = 'complete';

  res.redirect('tasklist');
});
router.get('/cheat', function (req, res) {
  req.session.data['metric-correct'] = 'yes';
  req.session.data['task1'] = 'complete';
  req.session.data['task2'] = 'complete';
  req.session.data['task3'] = 'complete';
  req.session.data['task4'] = 'complete';
  req.session.data['task5'] = 'complete';
  req.session.data['onsite'] = 'true';
  req.session.data['offsite'] = 'false';
  req.session.data['multiple-offsite'] = 'true';
  req.session.data['credits'] = 'true';
  res.redirect('tasklist');
});
router.get('/tasklist', function (req, res) {
  var sectionscomplete = 0;
  if (req.session.data['task1'] == "complete") {
    sectionscomplete++
  }
  if (req.session.data['task2'] == "complete") {
    sectionscomplete++
  }
  if (req.session.data['task3'] == "complete") {
    sectionscomplete++
  }
  if (req.session.data['task4'] == "complete") {
    sectionscomplete++
  }
  if (req.session.data['task5'] == "complete") {
    sectionscomplete++
  }

  console.log(sectionscomplete);
  res.render(version + '/tasklist', {
    'sectioncomplete': sectionscomplete
  });
});
router.get('/confirm', function (req, res) {

  if (req.session.data['credits'] == 'true') {
    var NotifyClient = require('notifications-node-client').NotifyClient;
    var notifyClient = new NotifyClient("developer__buy_credits-fa28c2d7-ca6b-43f6-957e-c0dbf53df165-e2f024c1-8428-464c-ae1e-2331c6683770");

    notifyClient.sendEmail('62858c61-28a0-40d1-8989-8606ce1e71c6', 'bng.developer@hotmail.com', {

    }).then(response => console.log(response)).catch(err => console.error(err))
  }

  res.render(version + '/confirm');
});
router.get('/check-answers', function (req, res) {
  req.session.data['check-answers'] = 'true';
  res.render(version + '/check-answers');
});
router.get('/signout', function (req, res) {
  req.session.data['activeuser'] = 'true';
  res.render(version + '/signout');
});

// POSTS
router.post('/setup', function (req, res) {
  req.session.data['error'] = 'false';
  req.session.data['error1'] = 'false';

  if (req.session.data['offsite'] == 'true' && req.session.data['multiple-offsite'] == 'true') {
    req.session.data['error1'] = 'true';
    res.redirect('setup');
  }
  else if (req.session.data['onsite'] == undefined && req.session.data['offsite'] == undefined && req.session.data['multiple-offsite'] == undefined && req.session.data['credits'] == undefined) {
    console.log(req.session.data['onsite'])
    req.session.data['error'] = 'true';
    res.redirect('setup');
  }
  else {
    req.session.data['custom-setup'] = "true";
    res.redirect('index');
  }
});
router.post('/sign-in', function (req, res) {
  if (req.session.data['defraID'] == "true") {
    res.redirect('https://cust-id-prototype.herokuapp.com/tasked/defra-id/about-data?returnUrl=https://bng-developer-prototype.herokuapp.com/developer_v3-1/metric-upload');
  }
  else {
    if (req.session.data['activeuser'] == 'true') {
      res.redirect('applications');
    }
    else {
      res.redirect('metric-upload');
    }
  }
});
router.post('/metric-upload', function (req, res) {
  res.redirect('metric-upload-check');
});
router.post('/metric-upload-check', function (req, res) {
  if (req.session.data['metric-correct'] == 'yes') {
    if (req.session.data['metric-file'] != undefined) {
      req.session.data['task1'] = 'complete';
      req.session.data['task2'] = '';
      req.session.data['task3'] = '';
      req.session.data['task4'] = '';
      req.session.data['task5'] = '';
    }
    res.redirect('development-location');
  }
  else if (req.session.data['metric-correct'] == 'no') {
    res.redirect('metric-upload');
  }
});
router.post('/metric-check-data', function (req, res) {

  //temporary data
  if (req.session.data['habitat-credit-price'] == undefined) {
    req.session.data['habitat-credit-price'] = 27301.65;
    req.session.data['hedgerow-credit-price'] = 34083;
    req.session.data['credit-ratio'] = 1;
  }

  // calculation
  req.session.data['habitatCredits'] = (req.session.data['habitat-unit'] * req.session.data['credit-ratio']).toFixed(2);
  req.session.data['habitatTotal'] = (req.session.data['habitat-credit-price'] * req.session.data['habitat-unit']) * req.session.data['credit-ratio'];

  req.session.data['hedgerowCredits'] = (req.session.data['hedgerow-unit'] * req.session.data['credit-ratio']).toFixed(2);
  req.session.data['hedgerowTotal'] = (req.session.data['hedgerow-credit-price'] * req.session.data['hedgerow-unit']) * req.session.data['credit-ratio'];

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
///////////////////////////////////////////////////////////
router.post('/development-location', function (req, res) {
  if (req.session.data['development-data'] == 'yes') {
    req.session.data['task2'] = 'complete';
    if (req.session.data['check-answers'] == 'true') {
      res.redirect('check-answers');
    }
    else {
      if (req.session.data['alternative'] == "true") {
        res.redirect('no-checks');
      }
      //res.redirect('tasklist');
      //res.redirect('check-answers');
      //res.redirect('biodiversity-gain-site-number');
      res.redirect('confirm-off-site-gain');
    }
  }
  else if (req.session.data['development-data'] == 'no') {
    //req.session.data['task1'] = 'inprogress';
    res.redirect('metric-upload');
  }
});
// Biodiversity gain site number
router.post('/biodiversity-gain-site-number', function (req, res) {
  //req.session.data['manual-entry'] = 'true';
  //res.redirect('confirm-off-site-gain');
  res.redirect('allocation-habitat-new');
});

// Examples - examples post here
router.post('/development-details', function (req, res) {
  res.redirect('allocation-habitat');
});

// Examples - examples post here
router.post('/allocation-habitat-new', function (req, res) {
  req.session.data['manual-entry'] = 'true';
  res.redirect('confirm-off-site-gain');
});

// Examples - examples post here
// router.post('/confirm-off-site-gain', function (req, res) {
//   req.session.data['manual-entry'] = 'true';
//   res.redirect('consent');
// });

router.post('/confirm-off-site-gain', function (req, res) {
  if (req.session.data['off-site-gain-data'] == 'yes') {
    req.session.data['task2'] = 'complete';
    res.redirect('tasklist');
  }
  else if (req.session.data['off-site-gain-data'] == 'no') {
    res.redirect('metric-upload');
  }
});

// Consent
router.post('/consent', function (req, res) {
  req.session.data['manual-entry'] = 'true';
  //res.redirect('email-entry');
  res.redirect('legal-agreement-upload');
});
////////////////////////////////////////////////////////
router.post('/location-options', function (req, res) {
  req.session.data['task2'] = 'inprogress';

  if (req.session.data['location-options'] == 'import') {
    res.redirect('location-import');
  }
  else if (req.session.data['location-options'] == 'upload') {
    res.redirect('location-upload');
  }
});
router.post('/location-import', function (req, res) {
  res.redirect('location-confirm');
});
router.post('/location-confirm', function (req, res) {
  req.session.data['task2'] = 'complete';

  if (req.session.data['location-confirm'] == 'yes') {
    if (req.session.data['check-answers'] == 'true') {
      res.redirect('check-answers');
    }
    else {
      res.redirect('tasklist');
    }
  }
  else if (req.session.data['location-confirm'] == 'no-geo') {
    res.redirect('location-import');
  }
  else if (req.session.data['location-confirm'] == 'no') {
    res.redirect('location-upload');
  }
});
router.post('/location-upload', function (req, res) {
  res.redirect('location-upload-confirm');
});
router.post('/location-upload-confirm', function (req, res) {
  if (req.session.data['location-upload-confirm'] == 'yes') {
    res.redirect('location-area');
  }
  else if (req.session.data['location-upload-confirm'] == 'no') {
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


  if (req.session.data['onsite-confirm'] == 'yes') {
    req.session.data['task3'] = 'complete';
    if (req.session.data['check-answers'] == 'true') {
      res.redirect('check-answers');
    }
    else {
      res.redirect('tasklist');
    }
  }
  else if (req.session.data['onsite-confirm'] == 'no') {
    req.session.data['task3'] = 'inprogress';
    res.redirect('metric-upload');
  }

});
router.post('/offsite-total', function (req, res) {
  req.session.data['task3'] = 'inprogress';
  req.session.data['offsite-done'] = 'no';
  if (req.session.data['onsite-total'] == 'yes') {
    res.redirect('offsite1');
  }
  else if (req.session.data['onsite-total'] == 'no') {
    res.redirect('metric-upload');
  }

});
router.post('/offsite1', function (req, res) {
  req.session.data['task4'] = 'inprogress';
  if (req.session.data['offsite'] == 'true') {
    req.session.data['offsite-done'] = 'yes'
  }

  if (req.session.data['offsite1'] == 'yes') {
    res.redirect('legal-agreement-upload');
  }
  else if (req.session.data['offsite1'] == 'no') {
    res.redirect('metric-upload');
  }
});
router.post('/offsite2', function (req, res) {
  req.session.data['task3'] = 'inprogress';

  if (req.session.data['offsite1'] == 'yes') {
    req.session.data['offsite-done'] = 'yes';
    res.redirect('legal-agreement-upload');
  }
  else if (req.session.data['offsite1'] == 'no') {
    res.redirect('metric-upload');
  }

});
router.post('/consent-agreement-upload', function (req, res) {
  res.redirect('consent-agreement-check');
});
// router.post('/legal-agreement-check', function (req, res) {
//   if (req.session.data['legal-agreement-correct'] == 'yes') {
//     if (req.session.data['offsite-done'] == 'yes') {
//       req.session.data['task4'] = 'complete';
//       if (req.session.data['check-answers'] == 'true') {
//         res.redirect('check-answers');
//       }
//       else {
//         res.redirect('tasklist');
//       }
//     }
//     else {
//       res.redirect('offsite2');
//     }

//   }
//   else if (req.session.data['legal-agreement-correct'] == 'no') {
//     res.redirect('legal-agreement-upload');
//   }

// });

// Legal agreement for single site
router.post('/consent-agreement-check', function (req, res) {
  if (req.session.data['legal-agreement-correct'] == 'yes') {
    //res.redirect('email-entry');
    req.session.data['task3'] = 'complete';
    res.redirect('tasklist');
  }
  else if (req.session.data['legal-agreement-correct'] == 'no') {
    res.redirect('consent-agreement-upload');
  }
});

router.post('/email', function (req, res) {
  if (req.session.data['email-required'] == 'yes') {
    res.redirect('email-entry');
  }
  else if (req.session.data['email-required'] == 'no') {
    if (req.session.data['check-answers'] == 'true') {
      res.redirect('check-answers');
    }
    else {
      req.session.data['task5'] = 'complete';
      res.redirect('tasklist');
    }
  }
});

// Added or manual entry flag
// router.post('/email-entry', function (req, res) {
//   if (req.session.data['check-answers'] == 'true' || req.session.data['manual-entry'] == 'true') {
//     res.redirect('check-answers');
//   }
//   else {
//     req.session.data['task5'] = 'complete';
//     res.redirect('tasklist');
//   }

// });

// Biodiversity gain site number
router.post('/email-entry', function (req, res) {
  //req.session.data['manual-entry'] = 'true';
  //res.redirect('confirm-off-site-gain');
  res.redirect('check-answers');
});

router.post('/confirm', function (req, res) {

  // uses GOV.UK notify
  var NotifyClient = require('notifications-node-client').NotifyClient;
  var notifyClient = new NotifyClient("developer__buy_credits-fa28c2d7-ca6b-43f6-957e-c0dbf53df165-e2f024c1-8428-464c-ae1e-2331c6683770");


  if (req.session.data['credits'] == 'true') {
    notifyClient.sendEmail('08991d64-b093-40ff-b29e-c83ec5ffb57a', 'bng.developer@hotmail.com', {
    }).then(response => console.log(response)).catch(err => console.error(err))
  }
  else {
    notifyClient.sendEmail('493fd980-3103-4234-8b83-82ee02d7a4fb', 'bng.developer@hotmail.com', {
    }).then(response => console.log(response)).catch(err => console.error(err))
  }

  res.redirect('email-confirmation-to-developer');
});


// Routing register
router.post('/routing-register', function (req, res) {

  var install = req.session.data['routing-register']

  if (install == "No"){
    res.redirect('routing-results')
  } else {
    res.redirect('routing-sold')
  }
})


// Eligibility

router.post('/eligibility-england', function (req, res) {
  if (req.session.data['eligibility-england'] == 'Yes') {
    res.redirect('eligibility-landowner-consent'); 
  }

  if (req.session.data['eligibility-england'] == 'No') {
    res.redirect('eligibility-england-no');
  }
  else if (req.session.data['eligibility-england'] == 'Not sure') {
    res.redirect('eligibility-england-no');
  }
});

router.post('/eligibility-landowner-consent', function (req, res) {
  if (req.session.data['eligibility-england'] == 'Yes') {
    res.redirect('eligibility-metric'); 
  }

  if (req.session.data['offeligibility-england'] == 'No') {
    res.redirect('eligibility-metric');
  }
  else if (req.session.data['offeligibility-england'] == 'Not sure') {
    res.redirect('eligibility-metric');
  }
});

router.post('/eligibility-metric', function (req, res) {
  //req.session.data['manual-entry'] = 'true';
  //res.redirect('confirm-off-site-gain');
  res.redirect('eligibility-results');
});



// Details
router.post('/details-name', function (req, res) {
  //req.session.data['manual-entry'] = 'true';
  //res.redirect('confirm-off-site-gain');
  res.redirect('details-email');
});

router.post('/details-email', function (req, res) {
  //req.session.data['manual-entry'] = 'true';
  //res.redirect('confirm-off-site-gain');
  res.redirect('details-email-confirm');
});

router.post('/details-email-confirm', function (req, res) {
  //req.session.data['manual-entry'] = 'true';
  //res.redirect('confirm-off-site-gain');
  res.redirect('details-confirm');
});

router.post('/details-confirm', function (req, res) {
  //req.session.data['manual-entry'] = 'true';
  //res.redirect('confirm-off-site-gain');
  req.session.data['task1'] = 'complete';
  res.redirect('tasklist');
});


module.exports = router
