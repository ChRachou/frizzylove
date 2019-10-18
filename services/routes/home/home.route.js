//IMPORTS ET CONFIG
const express  = require('express');
const authRouter = express.Router();
const { readhome, filterchallenges, filterquestions, filterevents, test } = require('./home.controller');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../reponse');
const {checkChamps} = require('../../check')

//DEFINITION ROUTES

class TopicsRouterClass {

    routes() {

        //Page d'accueil 
        authRouter.get('/', (req, res) => { 
            readhome() 
            .then (apiResponse =>  sendApiSuccessResponse(res, 'Page acceuil', apiResponse)  )
            .catch (apiResponse => sendApiErrorResponse(res, 'Problème page accueil', apiResponse))
        });

        //Test 
        authRouter.post('/upload', (req, res) => { 
            console.log(req.body) 
            test(req.body)
            //.then (apiResponse =>  sendApiSuccessResponse(res, 'Page acceuil', apiResponse)  )
            //.catch (apiResponse => sendApiErrorResponse(res, 'Problème page accueil', apiResponse))
        });

        //Page d'accueil filtre sur les challenges
        authRouter.get('/filterchallenge', (req, res) => { 
            filterchallenges() 
            .then (apiResponse =>  sendApiSuccessResponse(res, 'Filtre challenge sur accueil', apiResponse)  )
            .catch (apiResponse => sendApiErrorResponse(res, 'Problème filtre challenge', apiResponse))
        });

        //Page d'accueil filtre sur les questions
        authRouter.get('/filterquestion', (req, res) => { 
            filterquestions() 
            .then (apiResponse =>  sendApiSuccessResponse(res, 'Filtre question sur accueil', apiResponse)  )
            .catch (apiResponse => sendApiErrorResponse(res, 'Problème filtre question', apiResponse))
        });

        //Page d'accueil filtre sur les events
        authRouter.get('/filterevent', (req, res) => { 
            filterevents() 
            .then (apiResponse =>  sendApiSuccessResponse(res, 'Filtre event sur accueil', apiResponse)  )
            .catch (apiResponse => sendApiErrorResponse(res, 'Problème event question', apiResponse))
        });


         
 
    }

    init(){
        this.routes();
        return authRouter;
    }

} 

//EXPORTS
module.exports = TopicsRouterClass;