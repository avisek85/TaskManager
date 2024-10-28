const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(403).json({message:"Access denied"});
    }
    try {
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (error) {
        res.status(400).json({message:"Invalid token"});
    }
};

module.exports = auth;