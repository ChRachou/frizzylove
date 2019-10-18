//IMPORTS ET CONFIG
const mongoose =  require('mongoose');
const { Schema } = mongoose; 
const { TopicSchema, TopicModel  }  = require('./topics.models');


//MODELS DONNEE 

const ChallengeSchema =  new Schema ({
    titre: String,
    description: String,
    type: String,
    date_creation: Date,
    date_modification: Date,
    img: { data: Buffer, contentType: String },
    id_createur : String,
    messages:[{
        text_message: String,
        id_utilisateur: String,
        pseudo: String,
        date_message: Date
    }],
    date_debut: Date,
    date_fin: Date,
    nb_participants: Number,
    participants: [{
        id_utilisateur: String, 
        date_entre: Date,
        pseudo: String
    }] 
})
 
 
//EXPORTS
const ChallengeModel = mongoose.model('challenges', ChallengeSchema);

module.exports =  ChallengeModel;
 