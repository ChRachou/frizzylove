//IMPORTS  
const mongoose = require('mongoose');

//CONNEXION BDD
const init = () => { 
    return new Promise( (resolve, reject) => {
        mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
        .then( db => resolve( process.env.MONGO_URL ))
        .catch( error => reject(`MongoDB not connected`, error) )
    }) 
}

//EXPORTS
module.exports = {
    init
}