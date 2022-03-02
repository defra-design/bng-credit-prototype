const express = require('express')
const router = express.Router()
const version = 'v1'

router.post('/enter-primary-role', function (req, res) {
  const role = req.session.data['primary-role']

  if (role === 'manufacturer') {
    res.redirect('manufacturer-primary-responsibility')
  } else if (role === 'converter') {
    res.redirect('manufacturer-primary-responsibility')
  } else if (role === 'importer') {
    res.redirect('importer-primary-responsibility')
  } else {
    res.redirect('not-liable')
  }
})

module.exports = router
