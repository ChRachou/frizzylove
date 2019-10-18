//IMPORTS ET CONGIFS 
const UtilisateurModel = require('../../../components/models/utilisateurs.models')

//FONCTIONS

//Ajoute une routine
const addroutine = (body, user, res) => { 
    return new Promise ((resolve, reject) => {
        
        let newroutine = {
            nom:  body.nom,
            frequence: body.frequence,
            etapes: body.etapes 
        }


       /* UtilisateurModel.update({_id: user._id},{$push: {routines: newroutine}},done);
        resolve(user) */ 
        UtilisateurModel.findById(user._id, (error, user) => { 
                    
                    if(error) reject(error) // Mongo Error 
                    else {
                    

                        console.log(newroutine.etapes) 
                        let newtabroutine = [];
                        newtabroutine = user.routines;
                        newtabroutine.push(newroutine); 

                            UtilisateurModel.findByIdAndUpdate(user.id, {routines: newtabroutine}, (error, user) => {
                                if(error) reject(error) 
                                else resolve(user) 
                            }); 

                    }
                        
                        
                    }); 

            }); 


}; 

//Supprime une routine
const deleteroutine = (body, id, res) => { 
    return new Promise ((resolve, reject) => { 

        UtilisateurModel.findById(user._id, (error, user) => { 
            
            if(error) reject(error) // Mongo Error 
            else { 
                let trouve = false;
                let i = 0;
                let routine_index = 0;

             while (trouve == false) {
                 
               if (user.routines[i]._id == id) {
                   trouve = true;
                   routine_index = i;
                   console.log("pas trouvé", user.routines[routine_index].inspect()) 
               }
               i++
             }

                console.log(user.routines[routine_index]) 
                let newtabroutine = [];
                newtabroutine = user.routines.splice(routine_index, 1)  

                    UtilisateurModel.findOneAndUpdate({routines: newtabroutine})
               }
                 
                
            });

    }); 

}; 
//EXPORTS

module.exports = {
    addroutine,
    deleteroutine
}