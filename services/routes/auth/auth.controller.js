//IMPORTS ET CONGIFS
const UtilisateurModel = require('../../../components/models/utilisateurs.models');
const bcrypt = require('bcryptjs');

//FONCTIONS

//Retourne tous les utilisateurs 
const readusers = ( ) => { 
    return new Promise ((resolve, reject) => { 

        UtilisateurModel.find((error, textures) => { 
            if(error) reject(error) // Mongo Error 
            else { 
                return resolve(textures);
                
            }  
        });

    }); 

}; 

//Créer un utilisateur
const createuser = (body, res) => {
    return new Promise( (resolve, reject) => { 
        //Crée ma date de création
        body.date_creation = new Date(); 
        console.log('body',body)
        console.log(" body.pseudo", body.pseudo)
        //Script le psw et email
        bcrypt.hash( body.psw, 10 )
        .then( hashedPassword => {   
            body.psw = hashedPassword; 
             
            //créer mon user
            UtilisateurModel.create(body)
            .then( mongoResponse => resolve(mongoResponse) )
            .catch( mongoResponse => reject(mongoResponse) )
            
        })
        .catch( hashError => reject(hashError) ); 
 
      
    });
};


//Connexion utilisateur
const loginuser = (body, res) => { 
    return new Promise( (resolve, reject) => {
        console.log("body2", body)
        UtilisateurModel.findOne( {email: body.email}, (error, user) =>{ 
            console.log("user", user)
            if(error) reject(error)
            else if(!user) reject('User inconnu')
            else{ 

                if (typeof body.psw === 'number') 
                {
                    body.psw  = body.psw.toString();
                    console.log(typeof body.psw)
                }
                // Check du mot de passe en le decryptant
                const validpsw = bcrypt.compareSync(body.psw, user.psw); 
                
                if( !validpsw ) reject('Mot de passe invalide')
                else {

                    //J'envoie mon cookie qui continent mon token  
                    res.cookie("FrizzyBDtoken", user.generateJwt(), { httpOnly: true });
                    //j'envoie un cookie simple avec uniquement le pseudo
                     // set expiration
                    const expiry = new Date();
                    expiry.setDate(expiry.getDate() + 59);
                    res.cookie("Frizzypseudo", user.pseudo,{ exp: parseInt(expiry.getTime() / 100, 10)}, { httpOnly: true })

                    // Envoie de l'user
                    resolve(user)
                }
            }
        } )  
    })
}

const profiluser= (user, res) => {
    return new Promise( (resolve, reject) => { 
          
            //créer mon user
            UtilisateurModel.findOne({_id : user._id}, (error, user) => {
                if (error) reject(error)
                else resolve(user)
            })  
          
    });
}
//EXPORTS

module.exports = {
    readusers, 
    createuser,
    loginuser,
    profiluser
}