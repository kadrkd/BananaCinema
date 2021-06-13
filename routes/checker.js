
module.exports.checkk = function(data){
	console.log(data.auth);
    if(!data.auth)
    	return 1;
    return 0;
}
