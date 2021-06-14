const router = require('express').Router();
const User = require('../model/User');

router.post('/', async(req, res) => {
	const doc = await User.findOne({_id: req.body.subbed});

	doc.subscribed = true;
	var savedUser = await doc.save();
	if(savedUser)
		res.redirect('/profile');
})
module.exports=router;