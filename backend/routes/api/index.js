// backend/routes/api/index.js
const router = require('express').Router();



// backend/routes/api/index.js
// ...

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

// ...

// // fetch for /test
// fetch('/api/test', {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `948IMRuO-udVYtVRX8rG4YE0eyupirppMKiI`
//   },
//   body: JSON.stringify({ hello: 'world' })
// }).then(res => res.json()).then(data => console.log(data));

module.exports = router;
