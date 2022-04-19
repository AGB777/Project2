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


module.exports = {
  appPage,
    getSchedule,
};