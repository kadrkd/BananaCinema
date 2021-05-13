const router = require('express').Router();
const Film = require('../model/Film');

// router.get('/', (req, res) => {
//     res.send("We are on Users");
// });

router.post('/', (req, res) => {
    const filmm = new Film({
        lname: req.body.lname,
        fname: req.body.fname,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    });
    console.log(Film);
});

module.exports = router;