const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (abcd, xyz) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
try{   let data = abcd.body;
  if( Object.keys(data).length === 0 ) {
    xyz.status(400).send({msg: "there is no data in body"})
  }
   savedData = await userModel.create(data);
  xyz.status(201).send({ msg: savedData });
}catch(err) {
     xyz.status(500).send({error : err.message})
}
};

const loginUser = async function (req, res) {
  try 
  {let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(401).send({
      status: false,
      msg: "username or the password is not corerct",
    });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FUnctionUp",
    },
    "functionup-radon"
  );
  res.setHeader("x-auth-token", token);
  res.status(200).send({ status: true, data: token });
} catch (err) {
  res.status(500).send({ err : err.message})
}
};

const getUserData = async function (req, res) {
  // // let token = req.headers["x-Auth-token"];
  // // if (!token) token = req.headers["x-auth-token"];

  // // //If no token is present in the request header return error
  // // if (!token) return res.send({ status: false, msg: "token must be present" });

  // console.log(token);
  
  // // If a token is present then decode the token with verify function
  // // verify takes two inputs:
  // // Input 1 is the token to be decoded
  // // Input 2 is the same secret with which the token was generated
  // // Check the value of the decoded token yourself
  // let decodedToken = jwt.verify(token, "functionup-radon");
  // if (!decodedToken)
  //   return res.send({ status: false, msg: "token is invalid" });

  try {let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(401).send({ status: false, msg: "No such user exists" });

  res.status(200).send({ status: true, data: userDetails });
} catch(err) {
  res.status(500).send({ status: false , msg : err })
}
};

const updateUser = async function (req, res) {
// Do the same steps here:
// Check if the token is present
// Check if the token present is a valid token
// Return a different error message in both these cases

  // let userId = req.params.userId;
  // let user = await userModel.findById(userId);
  // //Return an error if no user with the given id exists in the db
  // if (!user) {
  //   return res.send("No such user exists");
  // }
 try {  let userId = req.params.userId;

  let userData = req.body;

  if ( Object.keys(userData) === 0){
    res.status(400).send("object is empty")
  }

  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData,{new:true});
  res.status(200).send({ status: true, data: updatedUser });
}catch(err) {
  res.status(500).send({ status:false , msg : err })
}

};

const deleteUser = async function(req, res) {    
 try 
 { let userId = req.params.userId
  let user = await userModel.findById(userId)
  if(!user) {
      return res.status(401).send({status: false, message: "no such user exists"})
  }
  let updatedUser = await userModel.findOneAndUpdate({_id: userId}, {$set :{isDeleted: true}}, {new: true})
  console.log(updatedUser)
  res.status(200).send({status: true, data: updatedUser})
}catch(err) {
  res.status(500).send({status :false , msg : err.message})
}
}

// const postMessage = async function (req, res) {
//     let message = req.body.message
//     // Check if the token is present
//     // Check if the token present is a valid token
//     // Return a different error message in both these cases
//     let token = req.headers["x-auth-token"]
  
//     if(!token) return res.send({status: false, msg: "token must be present in the request header"})
//     let decodedToken = jwt.verify(token, 'functionup-radon')

//     if(!decodedToken) return res.send({status: false, msg:"token is not valid"})
    
//     //userId for which the request is made. In this case message to be posted.
//     let userToBeModified = req.params.userId
//     //userId for the logged-in user
//     let userLoggedIn = decodedToken.userId

//     //userId comparision to check if the logged-in user is requesting for their own data
//     if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

//     let user = await userModel.findById(req.params.userId)
//     if(!user) return res.send({status: false, msg: 'No such user exists'})
    
//     let updatedPosts = user.posts
//     //add the message to user's posts
//     updatedPosts.push(message)
//     let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})

//     //return the updated user document
//     return res.send({status: true, data: updatedUser})
// }

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
//module.exports.postMessage = postMessage
module.exports.deleteUser = deleteUser;