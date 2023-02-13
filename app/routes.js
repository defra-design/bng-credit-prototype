const express = require('express')
const router = express.Router()




// SET GLOBAL PREVIOUS PAGE
router.use('/', (req, res, next) => {
  req.session.data.gPreviousLocation = req.get('Referrer');
  req.session.data.gCurrentLocation = req.originalUrl;
  console.log("gCurrentLocation = " + req.session.data.gCurrentLocation);
  console.log("gPreviousLocation = " + req.session.data.gPreviousLocation);
  next();
});

// User Research and design versions
router.use('/v1', require('./views/v1/_routes'))
router.use('/v2', require('./views/v2/_routes'))
router.use('/v3', require('./views/v3/_routes'))
router.use('/developer_v1', require('./views/developer_v1/_routes'))
router.use('/developer_v2', require('./views/developer_v2/_routes'))
router.use('/developer_v3', require('./views/developer_v3/_routes'))
router.use('/developer_v3-1', require('./views/developer_v3-1/_routes'))
router.use('/developer_v4', require('./views/developer_v4/_routes'))
router.use('/developer_v4-1', require('./views/developer_v4-1/_routes'))
router.use('/developer_v4-2', require('./views/developer_v4-2/_routes'))

router.post('/set-credit-amounts', function (req, res) {
  res.redirect('/' + req.query.version + '/start-page?journey=' + req.query.journey);
});

router.get('/confirm-payment', function (req, res) {
  // uses GOV.UK notify
  // uses GOV.UK notify
  var NotifyClient = require('notifications-node-client').NotifyClient;
  var notifyClient = new NotifyClient("developer__buy_credits-fa28c2d7-ca6b-43f6-957e-c0dbf53df165-e2f024c1-8428-464c-ae1e-2331c6683770");

  notifyClient.sendEmail('10c2a5c8-735b-4e51-97eb-6bcd20081ad2', 'bng.developer@hotmail.com', {

  }).then(response => console.log(response)).catch(err => console.error(err))

  res.render('confirm-payment');
});

module.exports = router
