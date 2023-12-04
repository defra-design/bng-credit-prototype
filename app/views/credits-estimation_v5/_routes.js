const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


router.post('/start', function (req, res) {
  res.redirect('credits-tier-alt');
});

router.post('/credits-tier-alt', function (req, res) {
  res.redirect('credits-cost');
});


module.exports = router




