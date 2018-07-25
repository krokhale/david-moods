'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const { MoodEntry } = require('./moodlog/models');

const router = express.Router();


router.get('/moods', (req, res) => {
    MoodEntry.find()
    .populate('mood')
      .then(entries => {
          res.json({ entries });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({message: 'Internal server error'});
  });
});

/*router.get('/moods/:id', (req, res) => {
    MoodEntry.findById(req.params.id)
      .then(entry => {
          res.json(entry);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({message: 'Internal server error'});
  });
});
*/

let obj = {
    //created: 'now',
    mood: [{moodType: 'happy', intensity: 5}, {moodType: 'sad', intensity: 3}],
    note: 'this is a sample note'
}

router.post('/moods', (req, res) => {
   return MoodEntry.create(obj)
        .then(entry => {
            return res.status(201).json(entry);
            })
            .catch(err => {
                console.log(err);
              // Forward validation errors on to the client, otherwise give a 500
              // error because something unexpected has happened
            if (err) {
                return res.status(err.code).json(err);
              }
              res.status(500).json({code: 500, message: 'Internal server error'});
            });
        });
/*
router.put('/moods/:id', (req, res) => {
    MoodEntry.findByIdAndUpdate()
    });

router.delete('/moods/:id', (req, res) => {
    MoodEntry.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => {
        console.log(err);
        res.status(500).json({message: 'Internal server error'}));
    });
});
*/
  module.exports = router;