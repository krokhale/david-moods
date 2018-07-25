'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const { MoodEntry, Mood } = require('./moodlog/models');

const router = express.Router();

let moment = require('moment');


// return all mood entries
router.get('/mood-entries', (req, res) => {

    MoodEntry.find()
      .then(entries => {
          res.json({ entries });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({message: 'Internal server error'});
  });
});


// this will get one mood entry and populate it with all the moods associated with it.
router.get('/mood-entries/:id', (req, res) => {
    MoodEntry.findById(req.params.id)
      .populate('moods')
      .then(entry => {
          res.json(entry);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({message: 'Internal server error'});
  });
});

// create a mood entry
router.post('/mood-entries', (req, res) => {

    // first create all the moods, we need the ids of the moods to be able to store those in the mood entry and save them
    let moodRecords = [];
    req.body.moods.forEach(function (mood) {
        Mood.create(mood)
            .then(moodRecord => {
                console.log(moodRecord);
                moodRecords.push(moodRecord._id);
                console.log(moodRecords);
                console.log(req.body.moods);
                if(moodRecords.length == req.body.moods.length){
                    // we have now created all the moods, finally we create the mood entry

                    MoodEntry.create({note: req.body.note, moods: moodRecords})
                        .then(entry => {
                            console.log(entry);
                            return res.status(201).json(entry);
                        })
                        .catch(err => {
                            console.log(err);
                        });

                }
            })
    });



});


// get all the moods for a mood entry
// router.get('/moods', (req, res) => {
//
//     return MoodEntry.find()
//         .then(entry => {
//             console.log(entry);
//
//             req.body.moods.forEach(function (mood) {
//                 mood.moodEntry = entry._id;
//                 Mood.create(mood)
//                     .then(moodRecord => {
//                         console.log(moodRecord)
//                     })
//             });
//
//             return res.status(201).json(entry);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// });


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