const models  = require('../models');
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  models.Game.findAll({
    include: [ models.Draft ]
  }).then((data) => {
    res.send(data);
  });
});

module.exports = router;
