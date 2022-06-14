
const isFreeAppUser = function ( req, res, next) {
    data=req.headers.isfreeappuser 
    console.log(data)
    if(data) {
       next()
    }
    else res.send("request is missing a mandatory header")
    
}



module.exports.isFreeAppUser= isFreeAppUser

