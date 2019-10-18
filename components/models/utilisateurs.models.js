//IMPORTS ET CONFIG
const mongoose =  require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken')


//MODELS DONNEE
const UtilisateurSchema =  new Schema ({
    pseudo: String, 
    psw: String,
    email: String, 
    date_creation: Date,
    routines: [{
      nom: String,
      frequence: String,
      etapes: [{
        nom: String,
      }],
      }],
    challenges: [{
        id_challenge: String,
        nom: String,
        date_debut: Date,
        date_fin: Date,
        descriptions:String, 
      }
    ]

})

//FONCTIONS
 UtilisateurSchema.methods.generateJwt =  function generateJwt() {
  
  // set expiration
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 59);

    //Jwt creation 
    return jwt.sign({
        _id: this._id,
        pseudo: this.pseudo,
        psw:  this.psw,
        email:  this.email,  
        date_creation: new Date(),
        expireIn: '10s',
        exp: parseInt(expiry.getTime() / 100, 10)
    }, process.env.JWT_SECRET)
}  

//EXPORTS
const UtilisateurModel = mongoose.model('utilisateurs', UtilisateurSchema);
module.exports = UtilisateurModel;