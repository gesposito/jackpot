const models  = require('../models');
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  models.Game.findAll({
    'include': [ models.Draft ],
  })
  .then((data) => {
    res.json(data);
  });
});

router.get('/latest', (req, res) => {
  models.Game.findAll({
    'attributes'    : ['number', 'date'],
    'include': [ {
        'model'     : models.Draft,
        'attributes': ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'jolly', 'star'],
        'required'  : true
      }
    ],
    'order': [
      ['date', 'DESC']
    ],
    'limit'         : 100,
  })
  .then((data) => {
    res.json(data.reverse());
  });
});

router.get('/:game_id/drafts', (req, res) => {
  models.Draft.find({
    'where': {
      'GameId': req.params.game_id
    }
  })
  .then((data) => {
    res.json(data);
  });
});

module.exports = router;
