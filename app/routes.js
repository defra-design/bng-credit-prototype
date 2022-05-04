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

router.post('/set-credit-amounts', function (req, res) {
    res.redirect('/'+req.query.version+'/start-page?journey='+req.query.journey);
});

module.exports = router
