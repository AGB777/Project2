const mongoose = require('mongoose');

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
    
    

const ScheduleModel = mongoose.model('Schedule', ScheduleSchema);

module.exports = ScheduleModel;