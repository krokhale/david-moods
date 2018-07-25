const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
mongoose.Promise = global.Promise;

const moodEntrySchema = mongoose.Schema({
    created: {type: Date, default: Date.now},
    note: {type: String},
    moods: [{ type: Schema.Types.ObjectId, ref: 'Mood' }]
  });

  const moodSchema = mongoose.Schema({
    created: {type: Date, default: Date.now},
    moodType: {type: String},
    intensity: {type: Number},
  });

const MoodEntry = mongoose.model('MoodEntry', moodEntrySchema);
const Mood = mongoose.model('Mood', moodSchema);

module.exports = {MoodEntry, Mood};
