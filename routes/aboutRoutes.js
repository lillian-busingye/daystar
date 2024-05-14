const express = require('express');
const router = express.Router();

router.get('/about', function(req, res, next) {
  res.render('about'); // Rendering the "landingpage" view
});

module.exports = router;