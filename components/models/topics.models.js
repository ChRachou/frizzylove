//IMPORTS ET CONFIG
const mongoose =  require('mongoose');
const { Schema } = mongoose; 


//MODELS DONNEE
const TopicSchema =  new Schema ({
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
    }] 
})
 
 
//EXPORTS
const TopicModel = mongoose.model('topics', TopicSchema);

module.exports = TopicModel ;
 