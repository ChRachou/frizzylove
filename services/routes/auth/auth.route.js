//IMPORTS ET CONFIG
const express  = require('express');
const authRouter = express.Router();
const {readusers, createuser} = require('./auth.controller');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../reponse');

//DEFINITION ROUTES

class UtilisateurRouterClass {

    routes() {
        //test
        authRouter.get('/', (req, res) => {
            res.json('Hello heated api')
        });

        //Tous les utilisateurs
        authRouter.get('/users', (req, res) => { 
            readusers() 
             .then (apiResponse =>  sendApiSuccessResponse(res, 'Les utilisateurs !', apiResponse)  )
             .catch (apiResponse => sendApiErrorResponse(res, 'Pas utilisateur', apiResponse))
        }); 

        //Créer un utilisateur
        authRouter.post('/adduser', (req, res) => {
            console.log(req.body) 
            createuser(req.body, res) 
             .then (apiResponse =>  sendApiSuccessResponse(res, 'Créateur crée!', apiResponse)  )
             .catch (apiResponse => sendApiErrorResponse(res, 'Utilisateur non crée', apiResponse))
        }); 
    }

    init(){
        this.routes();
        return authRouter;
    }

} 

//EXPORTS
module.exports = UtilisateurRouterClass;