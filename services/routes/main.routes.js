//IMPORTS ET CONFIGS
const { Router } = require('express');
//const  DisplayRouterClass  = require('./display/display.routes');
const AuthRouterClass = require('./auth/auth.route');

const mainRouter =  Router();
//const TexturesRouter =  Router();
//const AuthRouter = Router();

//const TexturesRouter = new DisplayRouterClass();
const AuthRouter = new AuthRouterClass(); 

//ROUTES
//mainRouter.use('/api', TexturesRouter.init())
mainRouter.use('/user', AuthRouter.init()) 

//EXPORTS
module.exports = {mainRouter}; 
  