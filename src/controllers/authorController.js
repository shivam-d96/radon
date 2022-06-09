const AuthorModel= require("../models/authorModel")
const PublisherModel = require("../models/publisherModel.js")
const createAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({data: authorCreated})
}

const createPublisher = async function(req, res) { 
    let publisher = req.body
    let savedPublisherData = await PublisherModel.create(publisher)
    res.send({ msg : savedPublisherData})
}
module.exports.createPublisher= createPublisher
module.exports.createAuthor= createAuthor
