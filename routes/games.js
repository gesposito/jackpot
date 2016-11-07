const models  = require('../models');
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  models.Game.findAll({
  }).then((data) => {
    res.send(data);
  });
});

router.get('/:game_id/drafts', (req, res) => {
  models.Draft.find({
    'where': {
      'GameId': req.params.game_id
    }
  }).then((data) => {
    res.send(data);
  });
});

module.exports = router;
