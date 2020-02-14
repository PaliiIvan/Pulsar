const axios = require('axios').default;

/**
* Get Action method
* @param { Request } req 
* @param { Response } res 
* @param {()} next 
*/
exports.getAuth = async (req, res, next) => {


    try {

    } catch (error) {
        console.log(error);

    }
}

/**
    * Get Action method
    * @param { Request } req 
    * @param { Response } res 
    * @param {()} next 
    */
   exports.getAuthSuccess =  async function (req, res, next) {

    const params = client.callbackParams(req);
        client.callback('https://client.example.com/callback', params, { code_verifier }) // => Promise
        .then(function (tokenSet) {
            console.log('received and validated tokens %j', tokenSet);
            console.log('validated ID Token claims %j', tokenSet.claims());
        });
        
    res.json("Success!!");
}