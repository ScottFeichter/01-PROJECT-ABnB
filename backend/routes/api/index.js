// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const spotImages = require('./spot-images.js');
const reviewImages = require('./review-images.js');

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);

router.use('/spot-images', spotImages);

router.use('/review-images', reviewImages);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


// //=======TESTS FOR USER AUTH MW ROUTES START======//
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // ...

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // ...


// // backend/routes/api/index.js
// // ...

// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });

// // ...

// // // fetch for /test
// // fetch('/api/test', {
// //   method: "POST",
// //   headers: {
// //     "Content-Type": "application/json",
// //     "XSRF-TOKEN": `948IMRuO-udVYtVRX8rG4YE0eyupirppMKiI`
// //   },
// //   body: JSON.stringify({ hello: 'world' })
// // }).then(res => res.json()).then(data => console.log(data));

// // backend/routes/api/index.js
// // ...

// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });
// // ...

// //=======TESTS FOR USER AUTH MW ROUTES END======//

module.exports = router;
