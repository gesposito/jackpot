const models  = require('../models');
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.json(200);
});

module.exports = router;
