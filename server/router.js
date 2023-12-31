const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getTasks', mid.requiresLogin, controllers.Task.getTasks);
  app.get('/accountDetails', mid.requiresLogin, controllers.Account.detailsPage);
  app.get('/getAccountUsernameType', mid.requiresLogin, controllers.Account.getAccountDetails);

  app.post('/upgradeAccount', mid.requiresLogin, controllers.Account.upgradeAccount);
  app.post('/downgradeAccount', mid.requiresLogin, controllers.Account.downgradeAccount);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/changePass', mid.requiresSecure, mid.requiresLogin, controllers.Account.changePass);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.Task.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Task.makeTask);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
