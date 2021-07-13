const auth = require ('basic-auth');

const mwBasicAuth = async function (req,res,next) {
    const username = 'canon';
    const password = '1234';
   
    const user = await auth (req);

    if ((user.name === username) && (user.pass === password)){   
        next ();
    }
    else{
        console.log ('Basic Auth: failure');
        res.statusCode = 401
        res.send ('Access denied')
        next ();
    }
}

module.exports = mwBasicAuth;
