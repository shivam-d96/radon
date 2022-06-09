const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema( {

    name: String ,
    HeadQuarter: String,
}, { timeStamps : true}
)
 
module.exports = mongoose.model('newPublisher', publisherSchema)