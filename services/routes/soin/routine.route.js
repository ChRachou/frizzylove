//IMPORTS ET CONFIG
const express  = require('express');
const jwt = require('jsonwebtoken')
const authRouter = express.Router();
const {addroutine } = require('./routine.controller');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../reponse');
const {checkChamps} = require('../../check')

//DEFINITION ROUTES

class RoutineRouterClass {

    routes() { 

       // Ajouter une nouvelle routine
        authRouter.post( '/addroutine', (req, res) => {
            

              // Vérification que que les champs demandé sont renseigné
              const { miss, extra, ok } = checkChamps(['nom', "frequence", "etapes"], req.body);

              // Un champs est erroné ou en plus
              if (!ok) { sendFieldsError(res, 'Champs éronné ou en plus', miss, extra) } 

             //Je récupère mon cookie   
             var frizzycookie = {}
             req.headers.cookie && req.headers.cookie.split(';').forEach(function( cookie ) {
                var parts = cookie.split('=');
                frizzycookie[parts.shift().trim()] = decodeURI(parts.join('='));
            });

            //Je déencode mon cookie et je récup mon user 
            var user = jwt.decode(frizzycookie.FrizzyBDtoken); 

            addroutine(req.body, user, res)
           .then( apiResponse => sendApiSuccessResponse(res, 'Nouvelel routine ajouté ', apiResponse) )
           .catch( apiResponse => sendApiErrorResponse(res, 'La routine ne peut être ajouté', apiResponse))
        })
        
        // Ajouter une nouvelle routine
        authRouter.post( '/:id/deleteroutine', (req, res) => {
            //Verificationn de paramètre
            if (!req.params) { sendBodyError(res, 'Pas de paramètre') }

            //Je récupère mon cookie   
            var frizzycookie = {}
            req.headers.cookie && req.headers.cookie.split(';').forEach(function( cookie ) {
               var parts = cookie.split('=');
               frizzycookie[parts.shift().trim()] = decodeURI(parts.join('='));
           });

           //Je déencode mon cookie et je récup mon user 
           var user = jwt.decode(frizzycookie.FrizzyBDtoken); 

           addroutine(req.body, user, res)
          .then( apiResponse => sendApiSuccessResponse(res, 'Routine supprimé ', apiResponse) )
          .catch( apiResponse => sendApiErrorResponse(res, 'Routine supprimé', apiResponse))
       })  
    }

    init(){
        this.routes();
        return authRouter;
    }

} 

//EXPORTS
module.exports = RoutineRouterClass;