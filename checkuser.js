const User = require('./model/User');
const jwt = require('jsonwebtoken');

const checkUser =  (req, res, next) => {
	const token = req.cookies.auth;
    if(token){     
        jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();

            }
            else{
                let user = await User.findById(decodedToken._id);
                res.locals.user = user;
                // console.log(user);
                next();
            }
        });
    }
    else{
    	res.locals.user = null;
        next();
    }
}

module.exports = {checkUser};