const routes = require('express').Router();
const userController = require('../Controller/userController');
const emailController= require('../Controller/emailController')

routes.post('/signupUser', userController.addUser);
routes.post('/loginUser', userController.findUser);
routes.post('/save',emailController.saveSentEmails)
routes.get('/emails/:type',emailController.getEmails)
routes.post('/save-draft',emailController.saveSentEmails)
routes.post('/bin',emailController.moveEmailsToBin);
routes.post('/starred',emailController.toggleStarredEmails)
routes.delete('/delete',emailController.deleteEmails)

module.exports = routes;
