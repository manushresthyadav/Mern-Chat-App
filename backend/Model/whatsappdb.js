const mongoose = require('mongoose');

const whatsappSchema = mongoose.Schema({
    name:String,
    message:String,
    timestamp:String,
    received: String,
})

 const whatsappModel = mongoose.model('messagecontent',whatsappSchema);
 module.exports = whatsappModel;