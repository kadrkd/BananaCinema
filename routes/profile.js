const router = require('express').Router();
const verify = require('./routes/verifyToken');

router.post('/', verify, (req, res) =>{
    res.render('./profile');
});

module.export = router;