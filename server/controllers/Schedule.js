const models = require('../models');

const { Schedule } = models;

const appPage = (req, res) => {
    res.render('app', { csrfToken: req.csrfToken });
    return false;
}

const getSchedule = (req, res) => {
    Schedule.findByOwner(req.session.account._id, (err, docs) => {
        if(err) {
            console.log(err);
            res.status(400).json({ error: 'An error has occured!' });
        }
        return res.json({ myWeek: docs});
    })
}

const saveSchedule = async (req, res) => {
    const schedData = {
        owner: req.session.account._id,
        week: req.body.data,
    }
    
    try {
        const newSched = new Schedule(schedData);
        newSched.save();
        //Schedule.replace(schedData.owner, {week: schedData.week});
        return res.status(201);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occured' });
    }
}


module.exports = {
  appPage,
    getSchedule,
    saveSchedule,
};