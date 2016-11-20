const models  = require('../models');
const express = require('express');
const router  = express.Router();

const pullAll = require('lodash').pullAll;
const numbers = require('numbers');

router.get('/latest', (req, res) => {
  const attributes  = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'jolly', 'star'];
  const filters     = (req.query.filters) ? (req.query.filters).split(',') : [];

  models.Game.findAll({
    'attributes'    : ['number', 'date'],
    'include': [ {
        'model'     : models.Draft,
        'attributes': pullAll(attributes, filters),
        'required'  : true
      }
    ],
    'order': [
      ['date', 'DESC']
    ],
    'limit'         : 100,
  })
  .then((data) => {
    const reports = data.reverse().map((game) => {
      const values  = game.Draft.dataValues;
      const picks   = Object.keys(values).map(k => values[k]);

      return Object.assign(
        {},
        numbers.statistic.report(picks),
        {
          date: game.date
        }
      );
    });

    res.json(reports);
  });
});

module.exports = router;
