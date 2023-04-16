const mongoose = require('mongoose');

const whatsappSchema = mongoose.Schema({
    name:String,
    message:String,
    timestamp:String,
    receiver: String,
    poster:String,
})

//  const whatsappModel = mongoose.model('messagecontent',whatsappSchema);
 module.exports = whatsappSchema;