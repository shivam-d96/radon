const jwt = require("jsonwebtoken");

const authenticate = function(req, res, next) {
    //check the token in request header
    //validate this token
    try{
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
  
    //If no token is present in the request header return error
   
  if (!token) return res.send({ status: false, msg: "token must be present" });
   let decodedToken = jwt.verify(token, "functionup-radon");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });
  console.log(token);
    next()
}catch(err) {
  return res.send({ status: false, msg: err });
}
}


const authorise = function(req, res, next) {
    let token = req.headers["x-Auth-token"];
    if(!token) token = req.headers["x-auth-token"]
    let decodedToken = jwt.verify(token, "functionup-radon");
    if (!decodedToken)
      return res.send({ status: false, msg: "token is invalid" });
    // comapre the logged in user's id and the id in request
    let userToBeModified = req.params.userId
    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
    next()
}

module.exports.authenticate = authenticate ;
module.exports.authorise = authorise ;