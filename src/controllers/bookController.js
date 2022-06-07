const { count } = require("console")
const BookModel= require("../models/bookModel")
const AuthorModel = require("../models/authorModel.js")
const { json } = require("express/lib/response")
const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    //let Data= await BookModel.find()
    
    res.send({msg: savedData})
    
}
 
const createAuthorData = async function ( req, res) {
    let data = req.body
    let savedData = await AuthorModel.create(data)
    res.send({msg : savedData})
}
const bookByChetan = async function(req, res) {
    let authorData = await AuthorModel.findOne({author_name : "Chetan Bhagat"})
    console.log(authorData)
    let identity = authorData.author_id
    console.log(identity)
    let bookByAuth = await BookModel.find({ author_id : identity})
    res.send({ books : bookByAuth})
}
const findAuthor =async function ( req,res ) {
    let book =await BookModel.findOneAndUpdate(
        { name : "Two states"},
        { $set : { price : 100}},
        { new : true }
    );
    let authorName = await AuthorModel.find( {author_id : book.author_id}).select({ author_name:1})
    
    res.send({ bookPrice : book.price, author : authorName})
}
const findBooks = async function ( req ,res) {
    let allBooks = await BookModel.find({ price : { $gte : 50, $lte : 100}}).select({ author_id: 1 })
    console.log(allBooks)
    let identity =allBooks.map(  function(ele) { 
       //let nameAuthor = await AuthorModel.find({ author_id : ele.author_id }).select({ author_name:1});
       // return nameAuthor;
       return ele.author_id
    })
    let arr =[]
    for ( let i=0;i<identity.length ; i++) {
        let authors = await AuthorModel.find({ author_id: identity[i]}).select( {author_name:1})
        arr.push(authors)
    }
    //arr.flat()
    console.log(arr)
    res.send({msg : arr})
    
}
module.exports.createBook= createBook
module.exports.createAuthorData= createAuthorData
module.exports.bookByChetan= bookByChetan
module.exports.findAuthor= findAuthor
module.exports.findBooks= findBooks