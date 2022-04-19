const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
    
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/scheduleApp', mid.requiresSecure, mid.requiresLogin, controllers.Schedule.appPage);
  app.get('/scheduleData', mid.requiresSecure, mid.requiresLogin, controllers.Schedule.getSchedule);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
    
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;