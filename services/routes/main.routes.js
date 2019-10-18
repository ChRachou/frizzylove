//IMPORTS ET CONFIGS
const { Router } = require('express');
//const  DisplayRouterClass  = require('./display/display.routes');
const AuthRouterClass = require('./auth/auth.route');
const HomeRouterClass = require('./home/home.route');
const TopicRouterClass =  require('./topic/topic.route');
const RoutineRouterClass =  require('./soin/routine.route')

const mainRouter =  Router(); 

//const TexturesRouter = new DisplayRouterClass();
const AuthRouter = new AuthRouterClass(); 
const HomeRouter = new HomeRouterClass();
const TopicRouter = new TopicRouterClass();
const RoutineRouter =  new RoutineRouterClass();

//ROUTES
//mainRouter.use('/api', TexturesRouter.init())
mainRouter.use('/user', AuthRouter.init()); 
mainRouter.use('/home', HomeRouter.init());
mainRouter.use('/topic', TopicRouter.init())
mainRouter.use('/mycare', RoutineRouter.init())

//EXPORTS
module.exports = {mainRouter}; 
  