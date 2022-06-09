const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")
const createBook= async function (req, res) {
    let book = req.body
    if (book.author_id && book.publisher_id) {
        let authors = await authorModel.findOne({_id : book.author_id})
        let publishers = await publisherModel.findOne({ _id : book.publisher_id} )
        if(authors && publishers) {
            books = await bookModel.create(book)
            res.send({data: books})
        }
    if (!authors&& !publishers) {
        res.send("authors and publishers both are not present")
    }
    if (!authors) {
              res.send("author is not present")
        }
    if (!publishers) {
            res.send("publisher is not present")
        }
        
    }

    if( !book.author_id) {
            res.send(" author_id is required")
    }
    if ( !book.publisher_id) {
        res.send("publisher_id is required")
    }
}

const fetchBooks = async function (req , res) {
    let allBooks = await bookModel.find().populate("publisher_id").populate("author_id")
    res.send({books : allBooks})
}
const updatePriceBY10 = async function (req, res) {
    let books = await bookModel.find()
    let publishers = await publisherModel.find()
    let updatedBook 
    for(i=0;i<books.length;i++) { 
     updatedBook = await bookModel.updateMany(
       {$and :[ {rating: { $gte : 3.5}},{_id : books[i]._id}]},
        { $set : {price : books[i].price + 10}},
        { new : true }
        )}
    let coverUpdate1 = await bookModel.updateMany(
         { publisher_id:('62a1cf50ba35f21cc74e0cf2') },
         { $set : { isHardCover : true}},
         { new : true}
    ) 
    let coverUpdate2 = await bookModel.updateMany(
        { publisher_id:('62a1d018ba35f21cc74e0cf4') },
        { $set : { isHardCover : true}},
        { new : true}
   ) 
    
        res.send({msg: coverUpdate1,coverUpdate2,updatedBook})
    }
module.exports.createBook= createBook
module.exports.fetchBooks= fetchBooks
module.exports.updatePrice= updatePriceBY10