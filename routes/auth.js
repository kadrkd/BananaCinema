const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');

const {registerValidator, loginValidator} = require('../validation');
// router.get('/', (req, res) => {
//     res.send("We are on Users");
// });


router.get('/', async (req, res) => {
  var passedVariable = req.query.valid;
  if(passedVariable){
    var alertL = passedVariable; 
    console.log(alertL);
    return res.render('auth', {alertL});
  }
})

router.post('/', async (req, res) => {
	var alertR = null;
    const {error} = registerValidator(req.body);
    if(error != null){
       alertR = error.details[0].message;
       return res.render('auth', {alertR});
    }
    var emailExist = await User.findOne({email: req.body.email});
    if(emailExist){
        alertR = 'Email already exist';
        return res.render('auth', {alertR});
    }
    if(req.body.password != req.body.re_password){
        alertR = 'Passwords are not matching';
        return res.render('auth',{ alertR});
    }
    const userr = new User({
        lname: req.body.lname,
        fname: req.body.fname,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    });
   try{
       var savedUser = await userr.save();
       res.redirect('/auth');
   }
    catch(err){
        alertR = err;
       res.render('auth', {alertR});
    }
});

// router.get("/login", function (req, res, next) {
//   console.log(`HOME ROUTE!`);
//   User.find({}, function (err, result) {
//       if (err) return err.message;
//       console.log(result);
//     })
// });

router.post('/login', async (req, res) => {
    var alertL = null;
    const {error} = loginValidator(req.body);
    if(error != null){
        alertL = error.details[0].message;
        return res.render('auth', {alertL});
        // var string = encodeURIComponent(alertL);
        // return res.redirect('/auth?valid=' + string);
    }
    var user = await User.findOne({email: req.body.email});
    if(!user){
        alertL = 'Email does not exist';
        return res.render('auth', {alertL});
        // var string = encodeURIComponent(alertL);
        // return res.redirect('/auth?valid=' + string);
    }
    if(user.password != req.body.password){
        alertL = 'Wrong password';
        return res.render('auth', {alertL});
        // var string = encodeURIComponent(alertL);
        // return res.redirect('/auth?valid=' + string);
    }
    console.log('Logged in!');
    const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN);
    res.cookie('auth', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24});
    res.redirect('/profile');
   // res.render('auth', {alert});
});

module.exports = router;
