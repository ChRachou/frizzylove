//IMPORTS ET CONGIFS
const   TopicModel  = require('../../../components/models/topics.models'); 
const ChallengeModel = require('../../../components/models/challenges.models'); 
const gfs = require('../../../services/bdd/bdd')

//FONCTIONS
//Retourne la page d'accueil avec tous les topics
const readhome = () => { 
    console.log("readhome")
    return new Promise ((resolve, reject) => { 

        let lestopics = [];
        let leschallenges = [];
            TopicModel.find({}).sort({date_creaction: 'desc'}).exec( (error, topics) =>{
            if(error) reject(error)  
            else {  
                 topics.forEach(topic => {
                     var topichome = {
                         "_id" : topic._id,
                         "titre": topic.titre,
                         "type": topic.type,
                         "date_creation": topic.date_creation, 
                     }
                    console.log(topichome);
                    lestopics.push(topichome); 
                });

                ChallengeModel.find({}).sort({date_creaction: 'desc'}).exec( (error, challenges) =>{
                    if(error) reject(error)  
                    else { 
                         
                        challenges.forEach(challenge => {
                            var challengehome = {
                                "_id" : challenge._id,
                                "titre": challenge.titre,
                                "type": challenge.type,
                                "date_creation": challenge.date_creation, 
                            } 
                            console.log(challengehome);
                            lestopics.push(challengehome); 
                        }); 
                        resolve(lestopics) 
                    }
                })   
            }  
        });

       
    }); 

}; 

// Filtre uniquement les challenges
const filterchallenges = ( ) => { 
    console.log("filterchallenge")
    return new Promise ((resolve, reject) => { 
 
        let leschallenges = [];
           
                ChallengeModel.find( (error, challenges) =>{
                    if(error) reject(error)  
                    else {  
                        challenges.forEach(challenge => {
                            var challengehome = {
                                "_id" : challenge._id,
                                "titre": challenge.titre,
                                "type": challenge.type,
                                "date_creation": challenge.date_creation, 
                            } 
                            console.log(challengehome );
                            leschallenges.push(challengehome); 
                        }); 
                        resolve(leschallenges) 
                    }
                })    
    });  
}; 

// Filtre uniquement les challenges
const filterquestions  = ( ) => { 
    console.log("filterquestion")
    return new Promise ((resolve, reject) => { 
 
        let lesquestions = [];
           
            TopicModel.find({ type: 'question' }, (error, questions) =>{
                    if(error) reject(error)  
                    else {  
                        questions.forEach(question => {
                            var questionhome = {
                                "_id" : question._id,
                                "titre": question.titre,
                                "type": question.type,
                                "date_creation": question.date_creation, 
                            } 
                            console.log(questionhome);
                            lesquestions.push(questionhome); 
                        }); 
                        resolve(lesquestions) 
                    }
                })    
    });  
}; 


// Filtre uniquement les events
const filterevents = ( ) => { 
    console.log("filterevent ")
    return new Promise ((resolve, reject) => { 
 
        let lesevents = [];
           
                TopicModel.find({ type: 'event' }, (error, events) =>{
                    if(error) reject(error)  
                    else {  
                        events.forEach(event => {
                            var eventhome = {
                                "_id" : event._id,
                                "titre": event.titre,
                                "type": event.type,
                                "date_creation": event.date_creation, 
                            } 
                            console.log(eventhome);
                            lesevents.push(eventhome); 
                        }); 
                        resolve(lesevents) 
                    }
                })    
    });  
}; 

const test = (body) => {
    console.log(body.formData, "body.formData")
    console.log()
    //console.log(gfs.exportgfs())
   // let gfs = gfs.exportgfs();
   / gfs.collection('photos')

}
 
//EXPORTS

module.exports = {
    readhome,
    filterchallenges,
    filterquestions,
    filterevents,
    test 
}