 
    const checkChamps = (required, object) => {
        //Initialisation de variable
            const miss = [];
            const extra = [];
         

            //Check si les champs requis sont dans mon tableau
            required.forEach((prop) => { 
                if (!(prop in object)) miss.push(prop);
            });
        
            // Check champs si champs en plus
            for (const prop in object) { 
                if (required.indexOf(prop) === -1) extra.push(prop);
            }
        
            // Tout va bien
            const ok = (extra.length === 0 && miss.length === 0);
            
            // Return service  
            return { ok, extra, miss };
        
    };
 


//EXPORTS
  module.exports = {
    checkChamps,
  };
 