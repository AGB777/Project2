const mongoose = require('mongoose');

let ScheduleModel;

const ScheduleSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  week: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

ScheduleSchema.statics.toAPI = (doc) => ({
  week: doc.week,
});

ScheduleSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return ScheduleModel.find(search).select('week').lean().exec(callback);
};

ScheduleSchema.statics.replace = (ownerId, doc, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return ScheduleModel.findOneAndUpdate(search, doc).exec(callback);
};

ScheduleModel = mongoose.model('Schedule', ScheduleSchema);

module.exports = ScheduleModel;
