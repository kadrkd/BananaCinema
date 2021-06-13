const jwt = require('jsonwebtoken');

module.exports = function(req, res, next)  {
    var token = req.cookies.auth;
    if(!token){
         res.send('Login first').redirect('/login');
     }
    else{
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                // console.log(decodedToken);
                next();
            }
        });
        next();
    }
    
}