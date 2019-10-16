//IMPORTS ET CONGIFS
const UtilisateurModel = require('../../../components/models/utilisateurs.models');
const bscrpt = require('bcryptjs');

//FONCTIONS

//Retourne tous les utilisateurs 
const readusers = ( ) => { 
    return new Promise ((resolve, reject) => { 

        UtilisateurModel.find((error, textures) => { 
            if(error) reject(error) // Mongo Error 
            else {
                //Manipule les données
                /* let usersarray = [];
                console.log(textures)
                console.log("ok je suis dans les utilisateurs ") */

               // ((async function loop() {
                    // for (let i = 0; i < textures.length; ++i) { 
                    //     usersarray.push({ nom: textures[i].nom})
                    // }
                    // // return all textures
                    // console.log("usersarray", usersarray)
                     return resolve(textures);
                //})());
 
            }  
        });

    }); 

}; 

//Créer un utilisateur
const createuser = (body, res) => {
    return new Promise( (resolve, reject) => {
       
        // Définition de l'objet à enregistrer
       /*  const texture = {
            nom: "testcontrole"
        } */

        console.log("body", body);
        return reject(error) // Mongo Error 
        // create new user
        //TextureModel.create(texture)
         //.then( mongoResponse => resolve(mongoResponse) )
        // .catch( mongoResponse => reject(mongoResponse) )
    });
};

//EXPORTS

module.exports = {
    readusers, 
    createuser  
}