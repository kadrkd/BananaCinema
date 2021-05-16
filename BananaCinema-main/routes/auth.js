const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {registerValidator, loginValidator} = require('../validation');
// router.get('/', (req, res) => {
//     res.send("We are on Users");
// });



router.post('/register', async (req, res) => {
    const {error} = registerValidator(req.body);
    if(error != null){
        return res.status(400).send(error.details[0].message);
    }
    var emailExist = await User.findOne({email: req.body.email});
    if(emailExist){
        return res.status(400).send('Email already exist');
    }
    if(req.body.password != req.body.re_password){
        return res.status(400).send('Passwords are not matching');
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
       res.send(savedUser);
   }
    catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const {error} = loginValidator(req.body);
    if(error != null)
        return res.status(400).send(error);
    var emailExist = await User.findOne({email: req.body.email});
    if(!emailExist)
        return res.status(400).send('Email does not exist');
    var passwordTrue = await User.findOne({password: req.body.password});
    if(!passwordTrue)
        return res.status(400).send('Wrong password');
    res.send('Logged in!');
    router.use('/', (req, res) => {
        res.sendFile(__dirname + "public/Account.html");
    })
})

module.exports = router;