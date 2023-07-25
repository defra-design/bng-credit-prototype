const express = require('express')
const router = express.Router()


router.post('/start', function (req, res) {
  res.redirect('credits-tier-alt');
});

router.post('/credits-tier-alt', function (req, res) {
  res.redirect('credits-cost');
});


module.exports = router




