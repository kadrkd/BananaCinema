const jwt = require('jsonwebtoken');

module.exports = function(req, res, next)  {
    var token = req.cookies.auth;
    if(!token){
         res.redirect('/auth');
     }
    else{
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.redirect('/auth');
            }
            else{
                // console.log(decodedToken);
                next();
            }
        });
        next();
    }
    
}