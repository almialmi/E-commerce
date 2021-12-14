const jwt = require('jsonwebtoken');

module.exports.verifyJwtToken = ( req , res , next) => {
    var token= req.body.token || req.query.token || req.cookies['token'] || req.headers['token'];

    if(!token)
        return res.status(403).send({auth : false , messge : "no token provided"});
    else{
        jwt.verify(token , process.env.JWT_SECRET , (err , decoded) => {
            if(err)
            return res.status(500).send({auth : false , messge: 'token autentication faied'});

            else{
                req._id = decoded._id;
                next();
        
            }
        });
    }

}