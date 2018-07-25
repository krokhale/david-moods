const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const moodEntrySchema = mongoose.Schema({
    //created: {type: String},
    mood: [{type: Schema.Types.ObjectId, ref: 'Mood'}],
    //mood: {type: Array},
    note: {type: String}
  });

  const moodSchema = mongoose.Schema({
    //created: {type: String},
    moodKind: {type: String},
    intensity: {type: Number} 
  });

const MoodEntry = mongoose.model('MoodEntry', moodEntrySchema);
const Mood= mongoose.model('Mood', moodSchema);

module.exports = {MoodEntry, Mood};
