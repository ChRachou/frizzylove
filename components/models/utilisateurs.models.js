//IMPORTS ET CONFIG
const mongoose =  require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken')


//MODELS DONNEE
const UtilisateurSchema =  new Schema ({
    pseudo: String, 
    psw: String,
    email: String,
    date_naissance: Date,
    date_creation: Date,
    routines: [{
      nom: String,
      frequence: String,
      etapes: [{
        nom: String,
      }],
      }],
    challenges: [{
        nom: String,
        date_debut: Date,
        date_fin: Date,
        descriptions:String, 
      }
    ]

})

//FONCTIONS
 UtilisateurSchema.methods.generateJwt =  function generateJwt() {
  
    //Jwt creation 
    return jwt.sign({
        _id: this._id,
        pseudo: this.pseudo,
        psw:  this.psw,
        email:  this.email, 
        date_creation: new Date()
    }, process.env.JWT_SECRET)
}  

//EXPORTS
const UtilisateurModel = mongoose.model('utilisateurs', UtilisateurSchema);
module.exports = UtilisateurModel;