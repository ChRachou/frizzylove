//IMPORTS ET CONFIG
const express  = require('express');
const jwt = require('jsonwebtoken')
const authRouter = express.Router();
const {readtopic, createtopic, addmsg, deletemsg, deletetopic, addparticipant, deleteparticipant } = require('./topic.controller');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../reponse');
const {checkChamps} = require('../../check')

//DEFINITION ROUTES

class TopicRouterClass {

    routes() {
        //Retourne un topic
        authRouter.get('/:id', (req, res) => { 

            //Si il y a pas de paramètre envoyé
            if (!req.params || !req.params.id) { sendBodyError(res, 'Pas de paramètre') }   

            //Je récupère mon cookie   
            var frizzycookie = {}
            req.headers.cookie && req.headers.cookie.split(';').forEach(function( cookie ) {
               var parts = cookie.split('=');
               frizzycookie[parts.shift().trim()] = decodeURI(parts.join('='));
           });

           //Je déencode mon cookie et je récup mon user 
           var user = jwt.decode(frizzycookie.FrizzyBDtoken); 

            readtopic(req.params.id, user) 
             .then (apiResponse =>  sendApiSuccessResponse(res, 'Affichage du topic !', apiResponse)  )
             .catch (apiResponse => sendApiErrorResponse(res, 'Pas affichage du topic ', apiResponse))
        }); 

       // Création de topic
        authRouter.post( '/addtopic', (req, res) => {
             //Verificationn de paramètre
             if (!req.params) { sendBodyError(res, 'Pas de paramètre') }

              // Vérification que que les champs demandé sont renseigné
              
              //  const { miss, extra, ok } = checkChamps(['titre', 'description','type' ], req.body); 
              
              // Un champs est erroné ou en plus
             // if (!ok) { sendFieldsError(res, 'Champs éronné ou en plus', miss, extra) } 

             //Je récupère mon cookie   
             var frizzycookie = {}
             req.headers.cookie && req.headers.cookie.split(';').forEach(function( cookie ) {
                var parts = cookie.split('=');
                frizzycookie[parts.shift().trim()] = decodeURI(parts.join('='));
            });

            //Je déencode mon cookie et je récup mon user 
            var user = jwt.decode(frizzycookie.FrizzyBDtoken); 

             createtopic(req.body, user, res)
           .then( apiResponse => sendApiSuccessResponse(res, 'Topic crée', apiResponse) )
           .catch( apiResponse => sendApiErrorResponse(res, 'Topic non créer', apiResponse))
        })

        //Ajout d'un message
        authRouter.post( '/:id/addmessage', (req, res) => {
            //Verificationn de paramètre
            if (!req.params || !req.params.id) { sendBodyError(res, 'Pas de paramètre') }

             // Vérification que que les champs demandé sont renseigné
             const { miss, extra, ok } = checkChamps(['text_message', "type"], req.body);

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

            addmsg(req.body, user, req.params.id, res)
          .then( apiResponse => sendApiSuccessResponse(res, 'message ajouté ', apiResponse) )
          .catch( apiResponse => sendApiErrorResponse(res, 'Message non ajouté', apiResponse))
        })

        //Suppresion d'un message 
       authRouter.post( '/:id/deletemessage', (req, res) => {
        //Verificationn de paramètre
        if (!req.params || !req.params.id) { sendBodyError(res, 'Pas de paramètre') }

         // Vérification que que les champs demandé sont renseigné
         const { miss, extra, ok } = checkChamps(['index'], req.body);

         // Un champs est erroné ou en plus
         if (!ok) { sendFieldsError(res, 'Champs éronné ou en plus', miss, extra) }  

         deletemsg(req.body, req.params.id, res)
      .then( apiResponse => sendApiSuccessResponse(res, 'message supprimé ', apiResponse) )
      .catch( apiResponse => sendApiErrorResponse(res, 'Message non ajouté', apiResponse))
        })

        //Suppression d'un topic
        authRouter.post( '/:id/deletetopic', (req, res) => {
            //Verificationn de paramètre
            if (!req.params || !req.params.id) { sendBodyError(res, 'Pas de paramètre') } 
    
            deletetopic(req.body, req.params.id, res)
        .then( apiResponse => sendApiSuccessResponse(res, 'topic supprimé ', apiResponse) )
        .catch( apiResponse => sendApiErrorResponse(res, 'Topic non supprimé', apiResponse))
        })

        //Ajout d'un participant dans un challenge
        authRouter.post('/:id/addparticipant', (req, res) => {
            //Verificationn de paramètre
            if (!req.params || !req.params.id) { sendBodyError(res, 'Pas de paramètre') } 

             //Je récupère mon cookie   
             var frizzycookie = {}
             req.headers.cookie && req.headers.cookie.split(';').forEach(function( cookie ) {
                var parts = cookie.split('=');
                frizzycookie[parts.shift().trim()] = decodeURI(parts.join('='));
            });

            //Je déencode mon cookie et je récup mon user 
            var user = jwt.decode(frizzycookie.FrizzyBDtoken); 

            addparticipant( req.params.id, user, res)
        .then( apiResponse => sendApiSuccessResponse(res, 'User ajouté au challenge', apiResponse) )
        .catch( apiResponse => sendApiErrorResponse(res, 'User non ajouté au challenge ', apiResponse))
        })

        //Ajout d'un participant dans un challenge
        authRouter.post('/:id/deleteparticipant', (req, res) => {
            //Verificationn de paramètre
            if (!req.params || !req.params.id) { sendBodyError(res, 'Pas de paramètre') } 

             //Je récupère mon cookie   
             var frizzycookie = {}
             req.headers.cookie && req.headers.cookie.split(';').forEach(function( cookie ) {
                var parts = cookie.split('=');
                frizzycookie[parts.shift().trim()] = decodeURI(parts.join('='));
            });

            //Je déencode mon cookie et je récup mon user 
            var user = jwt.decode(frizzycookie.FrizzyBDtoken); 

            deleteparticipant( req.params.id, user, res)
        .then( apiResponse => sendApiSuccessResponse(res, 'User ajouté au challenge', apiResponse) )
        .catch( apiResponse => sendApiErrorResponse(res, 'User non ajouté au challenge ', apiResponse))
        })
       
   

   
    }

    init(){
        this.routes();
        return authRouter;
    }

} 

//EXPORTS
module.exports = TopicRouterClass;