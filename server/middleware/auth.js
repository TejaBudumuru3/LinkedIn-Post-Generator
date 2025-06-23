const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message: "Unauthorized access, please login" });
    }
    else{
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decode;
            next();
        }
        catch(e){
            return res.status(400).json({ message: "token expired or invalid" });
        }
    }
}

module.exports = { authMiddleware}