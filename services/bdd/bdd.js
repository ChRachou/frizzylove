//IMPORTS  
const mongoose = require('mongoose');
const Grind = require('gridfs-stream')
const gfs = new Grind(process.env.MONGO_URL, mongoose.mongo);

//CONNEXION BDD
const init = () => { 
    return new Promise( (resolve, reject) => {
        mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
        .then( db => resolve( process.env.MONGO_URL ))
        .catch( error => reject(`MongoDB not connected`, error) )
    }) 
} 

const exportgfs = () => {
    console.log(gfs)
    return gfs
}

//EXPORTS
module.exports = {
    init,
    exportgfs
}