const express = require('express')
const router = express.Router()

// // eslint-disable-next-line no-unused-expressions
// router.use('/', (req, res, next) => {
//   res.locals.error = req.query.error || ''
//   next()
// }) /
//
// // Add your routes here - above the module.exports line
//
// // GET SPRINT NAME - useful for relative templates
// router.use('/', (req, res, next) => {
//   res.locals.currentURL = req.originalUrl; //current screen
//   res.locals.prevURL = req.get('Referrer'); // previous screen
// console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );
//   next();
// });


// router.use('/registration', require('./views/registration/_routes'))
// router.use('/liability', require('./views/liability/_routes'))
// router.use('/returns', require('./views/returns/_routes'))
// router.use('/returns', require('./views/returns/_routes'))
// router.use('/account', require('./views/account/_routes'))

// User Research and design versions
router.use('/v1', require('./views/v1/_routes'))
// router.use('/2-A', require('./views/2-A/_routes'))
// router.use('/2-B', require('./views/2-B/_routes'))
// router.use('/3', require('./views/3/_routes'))
// router.use('/4', require('./views/4/_routes'))
// router.use('/5', require('./views/5/_routes'))
// router.use('/6', require('./views/6/_routes'))

module.exports = router
