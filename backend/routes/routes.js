const express = require('express');
const messageSchema = require('../Model/whatsappdb');
const router = express.Router();
const userModel = require('../Model/userdb');
const contactSchema = require('../Model/contacts');
const mongoose = require('mongoose');
const whatsappSchema = require('../Model/whatsappdb');

router.get('/',(req,res)=>{
    console.log('request received');
    // res.json('ok');
const user1 = req.query.user1;
const user2= req.query.user2;
console.log(user1,user2);
const x = user1+user2;
console.log(x);
  const msgModel =  mongoose.model(x,messageSchema);
  msgModel.find().then((result)=>{
    console.log(result)
    res.status(200).json(result);
  }).catch((err)=>{
    res.status(404).send(err);
  })
})

router.post('/',(req,res)=>{
    console.log('entered into the post request')
    console.log(req.body, ' post request has come ');
    // res.send('lwda lele');
    const user1 = req.query.user1;
const user2= req.query.user2;
    const {name,message,timestamp,received} = req.body;
const msgModel1 = mongoose.model(`${user1}${user2}`,whatsappSchema);
 const msg1 = new msgModel1({
    name:name,
    message: message,
    timestamp: timestamp,
    receiver: user2,
    poster: user1,
 });

 const msgModel2 = mongoose.model(`${user2}${user1}`,whatsappSchema);
 const msg2= new msgModel2({
  name:name,
  message: message,
  timestamp: timestamp,
  receiver: user2,
  poster: user1,
 });
msg2.save();
 msg1.save().then((result)=>{
   //  console.log(result)
    res.status(200).json(result)
 }).catch((err)=>{
    res.status(404).send(err);
 })

})


router.post('/user', (req,res)=>{
  console.log('enters this')
  const {name, email, password} = req.body;

  const user = new userModel({
name: name , 
email: email,
password : password,
  });

  user.save().then((result)=>{
    console.log(result);
    res.status(200).json(result)
  }).catch((err)=>{
    res.status(404).json(err);
  })

})


router.get('/user',(req,res)=>{
  const email  =req.query.email;
console.log('request to fetch all users entered' , email)
  userModel.find().then((result)=>{
    const resultExcLogged = result.filter(function(res){
      console.log(res.email);
      if(res.email!==email){
        return res;
      }else{
        console.log('email match hori')
      }
    });
    res.status(200).json(resultExcLogged);
  }).catch((err)=>{
    res.status(404).json(err);
  })

  
})

router.post('/contacts',(req,res)=>{
  const {name,email,uid} = req.body; 
  console.log('it came insde the post request contact api ' , uid);
  console.log(name,email);
  const ContactModel = mongoose.model(uid,contactSchema);

  ContactModel.find({email:email}).then((result)=>{
if(result.length>0){
console.log('a copy was found , ' , result);
}else{
  const Contact = new ContactModel({
    name: name,
    email: email,
  });

  Contact.save().then((result)=>{
    res.status(200).json(result);
  }).catch((err)=>{
    res.status(404).json(err);
  })
}
  }).catch((err)=>{
res.status(404).json(err);
  })

 
})


router.get('/contacts',(req,res)=>{
  console.log('inside the contacts get request api')
  const uid = req.query.uid;
  console.log('inside the get contacts api : ' , uid);

  const ContactModel = mongoose.model(uid,contactSchema);
  ContactModel.find().then((result)=>{
    res.status(200).json(result);
  }).catch((err)=>{
    res.status(404).json(err);
  })

})
module.exports = router;