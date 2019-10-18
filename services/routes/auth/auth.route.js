//IMPORTS ET CONFIG
const express  = require('express');
const jwt = require('jsonwebtoken')
const authRouter = express.Router();
const {readusers, createuser, loginuser, profiluser} = require('./auth.controller');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../reponse');
const {checkChamps} = require('../../check')

//DEFINITION ROUTES

class AuthentificationRouterClass {

    routes() {
        //Tous les utilisateurs
        authRouter.get('/users', (req, res) => { 
            readusers() 
             .then (apiResponse =>  sendApiSuccessResponse(res, 'Les utilisateurs !', apiResponse)  )
             .catch (apiResponse => sendApiErrorResponse(res, 'Pas utilisateur', apiResponse))
        }); 

        //Créer un utilisateur
        authRouter.post('/adduser', (req, res) => { 
            createuser(req.body, res) 
             .then (apiResponse =>  sendApiSuccessResponse(res, 'User crée!', apiResponse)  )
             .catch (apiResponse => sendApiErrorResponse(res, 'Utilisateur non crée', apiResponse))
        }); 

        //Connexion d'utilisateur
         authRouter.post( '/login', (req, res) => { 

                // Si le body n'est pas renseigné
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, 'Pas de donnée dans le body') }
                // Vérification que que les champs demandé sont renseigné
                const { miss, extra, ok } = checkChamps(['email', 'psw'], req.body);
                // Un champs est erroné ou en plus
                if (!ok) { sendFieldsError(res, 'Champs éronné ou en plus', miss, extra) }

                //l'user est correct
                else{
                    loginuser(req.body, res)
                    .then( apiResponse => sendApiSuccessResponse(res, 'Utilisateur connecté ', apiResponse) )
                    .catch( apiResponse => sendApiErrorResponse(res, "Erreur sur l'utilisateur", apiResponse))
                }
            })

         //Profil de l'utilisateur   
        authRouter.get('/me', (req, res) => {

            //Je récupère mon cookie   
            var frizzycookie = {}
            req.headers.cookie && req.headers.cookie.split(';').forEach(function( cookie ) {
               var parts = cookie.split('=');
               frizzycookie[parts.shift().trim()] = decodeURI(parts.join('='));
           });

           //Je déencode mon cookie et je récup mon user 
           var user = jwt.decode(frizzycookie.FrizzyBDtoken); 
           profiluser(user, res) 
           .then (apiResponse =>  sendApiSuccessResponse(res, 'Profil du user !', apiResponse)  )
           .catch (apiResponse => sendApiErrorResponse(res, 'Pas  affichage profil user', apiResponse))


        } )
    }

    init(){
        this.routes();
        return authRouter;
    }

} 

//EXPORTS
module.exports = AuthentificationRouterClass;