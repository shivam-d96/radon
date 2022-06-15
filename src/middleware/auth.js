const jwt = require("jsonwebtoken")
const userModel = require('../models/userModel')


const authMiddleware = async function (req,res,next) {
    token = req.headers["x-auth-token"]
    if(!token)  token = req.headers["x-Auth-token"]
    if(!token) res.send({ msg : "token must be present"})

    let decodedToken = jwt.verify(token, "functionup-radon")
    if(!decodedToken) res.send("token is invalid")

    next()
}
const checkUser = async function (res,req,next) {
    let userId =req.params.userId.toString();
    let user = await userModel.findById(userId);
    if(!user) res.send({msg : "no such user exist"})
    next()
}

module.exports.authMiddleware = authMiddleware;
module.exports.checkUser = checkUser;