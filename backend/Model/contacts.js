const mongoose = require('mongoose');

 const contactSchema = mongoose.Schema({
    name: String,
    email: String,
});
module.exports = contactSchema;
// module.exports = function createCollection({uid}){
// mongoose.model(uid,contact);
// }