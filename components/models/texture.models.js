//IMPORTS ET CONFIG
const mongoose =  require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken')


//MODELS DONNEE
const TextureSchema =  new Schema ({
    nom: String, 
})

//FONCTIONS
/* TextureSchema.methods.generateJwt =  function generateJwt() {
  
    //Jwt creation 
    return jwt.sign({
        _id: this._id,
        nom: this.nom
    }, process.env.JWT_SECRET)
} */

//EXPORTS
const TextureModel = mongoose.model('textures', TextureSchema);
module.exports = TextureModel;