//IMPORTS ET CONGIFS
const TopicModel = require('../../../components/models/topics.models'); 
const ChallengeModel = require('../../../components/models/challenges.models');
const UtilisateurModel = require('../../../components/models/utilisateurs.models')

//FONCTIONS

//Retourne le topic selectionnée
const readtopic = (id, user) => { 
    return new Promise ((resolve, reject) => { 

        TopicModel.findById(id, (error, topic) => { 
            console.log(topic)
            //console.log(user._id)
            if(error) reject(error) // Mongo Error 
            else if (topic) {
                let user_msg = false;
                 
               /*  topic.messages.forEach(msg=> {
                    msg.user = user_msg
                    if (msg.id_utilisateur == user._id) {
                        msg.user = true;
                    } 
                }); */
                resolve(topic) 
            }
            else {
                        ChallengeModel.findById(id, (error, challenge) => { 
                            if(error) reject(error) 
                            else {
                                //let participe = false;
                                // challenge.participe = participe
                               /*  challenge.messages.forEach(msg=> {
                                    if (msg.id_utilisateur == user._id) {
                                        msg.user = true;
                                    }  
                                });
                                challenge.participants.forEach(p=> {
                                    if (p.id_utilisateur == user._id) {
                                        participe = true;
                                        challenge.participe =  true 
                                    }  
                                }); */

                                resolve( challenge) 
                            }
                        })
                    }
                 
                
            } );

    }); 

}; 

//Creer un topic
const createtopic = (body,user, res) => {
    return new Promise( (resolve, reject) => { 
        
        console.log("body", body)
        console.log("body.type == challenge" , body.type == "challenge")
        console.log("user", user)
        //Crée ma date de création
        body.date_creation = new Date();
        body.id_createur = user.id_utilisateur;

        //Créer mon topic
         if (body.type == "challenge") { 
            body.date_debut = new Date();
            body.date_fin = "2019-08-08T22:00:00.000Z";
            body.nb_participants = 0;
            body.participants = [{
                id_utilisateur: user.id_utilisateur, 
                date_entre: new Date()
            }] 
            ChallengeModel.create(body)
            .then( mongoResponse => resolve(mongoResponse) )
            .catch( mongoResponse => reject(mongoResponse) )
        } else {
            TopicModel.create(body)
            .then( mongoResponse => resolve(mongoResponse) )
            .catch( mongoResponse => reject(mongoResponse) )
        }    
      
    });
};

//Supprimer un topic
const deletetopic =  (body,id, res) => {
    return new Promise( (resolve, reject) => { 
    //Je vais chercher le topic que je veux supprimer
    TopicModel.deleteOne({_id: id}, (error, topic) => {
        console.log(topic)
        if (error) {
            ChallengeModel.deleteOne({_id: id}, (error, challenge) => {
                if (error) reject(error)
                else resolve( challenge)
            })
        } else {
            resolve(topic)
        }
    }) 
    })
}

//Ajouter un participant à un challenge
const addparticipant = (id,user, res) => {
    return new Promise( (resolve, reject) => {
    ChallengeModel.findOne({_id : id}, (error, challenge) => { 
        
        if(error) reject(error) 
        else  { 
            
            //J'ajoute mon nouvel utilisateur utilisateur dans ma table challenge
           let adduser = {
            id_utilisateur: user._id,
            date_entre: new Date(),
            pseudo: user.pseudo 
           } 
            let newtabparticipant =  challenge.participants;
                newtabparticipant.push(adduser);  
 
            ChallengeModel.findByIdAndUpdate(id, { participants: newtabparticipant, date_modification: new Date(),nb_participants: challenge.nb_participants+1 }, {new: true }, (error, challenge) => { 
                console.log(challenge)
                if(error) reject(error) // Mongo Error 
                else {

                //J'ajoute aussi le challenge dans les challenges de l'utilisateur
                UtilisateurModel.findOne({_id: user._id}, (error, user) => {
                    if (error) reject(error)
                    else {
                        let addchallenge = {
                            id_challenge: challenge._id,
                            titre: challenge.titre,
                            date_debut: challenge.date_debut,
                            date_fin: challenge.date_fin, 
                        }
                        let newtabchallenge = [];
                        newtabchallenge = user.challenges;
                        newtabchallenge.push(addchallenge)
                        UtilisateurModel.findByIdAndUpdate(user._id, {challenges: newtabchallenge}, {new: true}, (error, user) => {
                            if (error) {
                                console.log(error)
                            }else {
                                console.log(user)
                            }
                        })

                        }
                        
                    })

                    resolve(challenge)  
                }   
                } );   


           
            }   
              
        }) 
})
}

// Supprimer un participant d'un challenge
const deleteparticipant = (id,user, res) => {
    return new Promise( (resolve, reject) => {
    ChallengeModel.findOne({_id : id}, (error, challenge) => { 
        
        if(error) reject(error) 
        else  {  
            //J'ajoute mon nouvel utilisateur 
            let newtabparticipant =  challenge.participants; 
             let trouve = false;
             let i = 0;
             let user_index = 0;

             while (trouve == false) {
                 //challenge.participants[i].id_utilisateur
               if (challenge.participants[i].id_utilisateur == user._id) {
                   trouve = true;
                   user_index= i;
               }
               i++
             }

             newtabparticipant = challenge.participants.splice(user_index, 1) 
 
            ChallengeModel.findByIdAndUpdate(id, { participants: newtabparticipant, date_modification: new Date(),nb_participants: challenge.nb_participants-1 }, {new: true }, (error, challenge) => { 
                console.log(challenge)
                if(error) reject(error) // Mongo Error 
                else  resolve(challenge)     
                } );    
        } 
    })
})
}

//Ajouter un message à un topic
const addmsg = (body,user,id, res) => {
    return new Promise( (resolve, reject) => { 
        console.log("body",body)
        //Message posté
        let msg_poste = {
            text_message : body.text_message,
            id_utilisateur : user.id_utilisateur,
            pseudo : user.pseudo,
            date_message : new Date(),
        }

        //Je vais chercher le topic correspondant et je le mets à jours
        if (body.type == "challenge") {
            ChallengeModel.findOne({_id : id}, (error, challenge) => { 
                console.log(challenge)
                if(error) reject(error) 
                else  { 
                    challenge.messages.push(msg_poste); 

                    ChallengeModel.findByIdAndUpdate(id, { messages: challenge.messages, date_modification: new Date() }, {new: true }, (error, challenge) => { 
                        console.log(challenge)
                        if(error) reject(error) // Mongo Error 
                        else  resolve(challenge)     
                        } );

                } 
            })
        } else {

            TopicModel.findOne({_id : id}, (error, topic) => { 
                console.log(topic)
                if(error) reject(error) 
                else  {
                    console.log(topic.messages)
                    topic.messages.push(msg_poste);
                    console.log(topic.messages)

                    TopicModel.findByIdAndUpdate(id, { messages: topic.messages, date_modification: new Date() }, {new: true }, (error, topic) => { 
                        console.log(topic)
                        if(error) reject(error) // Mongo Error 
                        else  resolve(topic)     
                        } );

                } 
            })

            
  }
})
}

  //Supprimer un message d'un topic
const deletemsg = (body,id, res) => {
    return new Promise( (resolve, reject) => { 
        console.log(body)
         

        //Je vais chercher le topic correspondant et je supprime le message concerné  en fonction de l'index du tableau 
        if (body.type == "challenge") {
            ChallengeModel.findOne({_id : id}, (error, challenge) => { 
                console.log(challenge)
                if(error) reject(error) 
                else  { 
                   console.log(challenge.messages[body.index] )
                   let newtabmsg = [];
                   newtabmsg = challenge.messages.splice(body.index, 1)

                    ChallengeModel.findByIdAndUpdate(id, { messages: newtabmsg, date_modification: new Date() }, {new: true }, (error, challenge) => { 
                        console.log(challenge)
                        if(error) reject(error) // Mongo Error 
                        else  resolve(challenge)     
                        } );
                } 
            })
        } else {

            TopicModel.findOne({_id : id}, (error, topic) => { 
                console.log(topic)
                if(error) reject(error) 
                else  {
                    console.log(topic.messages[body.index] ) 
                    let newtabmsg = [];
                    newtabmsg = topic.messages.splice(body.index, 1)
                    resolve(topic)   

                    TopicModel.findByIdAndUpdate(id, { messages: newtabmsg, date_modification: new Date() }, {new: true }, (error, topic) => { 
                        console.log(topic)
                        if(error) reject(error) // Mongo Error 
                        else  resolve(topic)     
                        } );
                } 
            })
        }
    })
            
  } 
      

 
//EXPORTS

module.exports = {
    readtopic,
    createtopic,
    addmsg, 
    deletemsg,
    deletetopic, 
    addparticipant,
    deleteparticipant
}