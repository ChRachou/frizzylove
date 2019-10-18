//IMPORTS ET CONFIG
const express = require('express'); 
const bodyParser = require('body-parser');
require('dotenv').config();
const Grid = require("gridfs-stream")
const port = process.env.PORT;
const local = process.env.LOCAL;
const server = express();
const db = require('./services/bdd/bdd');
const {mainRouter} =  require('./services/routes/main.routes');

//IINITIALISATION DU SERVEUR


class ServerClass {

     init() {

    
        //=> Body parser
        server.use(bodyParser.json({limit: '10mb'}));
        server.use(bodyParser.urlencoded({extended: true}))
    
        //Router
        server.use('/', mainRouter);

        //Lancement server
        this.lancement();
    
         
    }

    lancement() {

        //Appel de mongodb
         
        db.init() 
        .then( mongooseResponse => { 
            // Lancer le serveur
            server.listen(port, () => console.log({ database: mongooseResponse, server: `http://${local}:${port}` }))
        })
        .catch( mongooseError => console.log(mongooseError));
       
    }

}

new ServerClass().init();
