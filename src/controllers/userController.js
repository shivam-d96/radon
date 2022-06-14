const UserModel= require("../models/userModel")
const ProductModel= require("../models/productModel")
const OrderModel = require("../models/orderModel")
const moment =require('moment')

// const basicCode= async function(req, res, next) {
//     let tokenDataInHeaders= req.headers.token
//     console.log(tokenDataInHeaders)

//     console.log( "HEADER DATA ABOVE")
//     console.log( "hey man, congrats you have reached the Handler")
//     //res.send({ msg: "This is coming from controller (handler)"})
//     next()
//     }

// const createUser= async function (req, res) {
    
//     let data= req.body
//     let tokenDataInHeaders= req.headers.token
//     //Get all headers from request
//     console.log("Request headers before modificatiom",req.headers)
//     //Get a header from request
//     console.log(req.headers.batch)
//     console.log(req.headers["content-type"])
//     console.log(tokenDataInHeaders)
//     //Set a header in request
//     req.headers['month']='June' //req.headers.month = "June"

//     //Set an attribute in request object
//     req.anything = "everything"
    
    
//     console.log("Request headers after modificatiom",req.headers)
    
//     //Set a header in response
//     res.header('year','2022')
//     res.send({msg: "Hi"})
// }

// const getUsersData= async function (req, res) {
//     let allUsers= await UserModel.find()
//     res.send({msg: allUsers})
// }

const createProduct = async function (req,res) {
   let data= req.body
   const savedProduct= await ProductModel.create(data)
   res.send({msg:savedProduct})
}


const createOrder = async function (req,res) {
    let data = req.body
    let product = await ProductModel.findById(data.productId)
    let user = await UserModel.findById(data.userId)

if(user&&product) {

    if(req.headers.isfreeappuser===false) {

        let productPrice = await ProductModel.findOne({_id : data["productId"]}).select({price:1})
        let userBalance = await UserModel.findOne({_id: data.userId}).select({balance:1})
        console.log(userBalance)
        console.log(productPrice)
        if(productPrice.price < userBalance.balance) {
            updatedBalance = ( userBalance.balance-productPrice.price);

            await UserModel.updateOne(
                {_id : data.userId},{ $set : {balance: updatedBalance}},{new: true}
            )
            data["isFreeAppUser"]= false;
            let Date = moment().format("DD-MM-YYYY")
            data['date']=Date;
            data['amount']= productPrice;
            let orderDetail = await OrderModel.create(data)
            res.send({msg : orderDetail})    
        }

        if( productPrice.price > userBalance.balance ) {
            res.send(" Error : user have insufficient balance")
        }
    }

    if(req.headers.isfreeappuser===true) {
        data['amount']=0;
        data['isFreeAppUser']=true;
        let Date = moment().format("DD-MM-YYYY")
        data['date']=Date;
        let orderDetail = await OrderModel.create(data)
        res.send({msg : orderDetail}) 

    }
}
    if(!user && !product){
        res.send("error : product and user not found")
    }
    if(!user) {
        res.send("error: user not found")
    }

    if(!product) {
        res.send("error: product not found")
    }
    
}



const createUser= async function (req,res) {
    let data = req.body
    const savedUser = await UserModel.create(data)
    res.send({msg: savedUser}) 
}
module.exports.createUser= createUser
module.exports.createProduct= createProduct
module.exports.createOrder= createOrder