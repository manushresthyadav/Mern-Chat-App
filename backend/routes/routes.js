const express = require('express');
const messageModel = require('../Model/whatsappdb');
const router = express.Router();



router.get('/',(req,res)=>{
    console.log('request received');
    // res.json('ok')
  messageModel.find().then((result)=>{
    console.log(result)
    res.status(200).json(result);
  }).catch((err)=>{
    res.status(404).send(err);
  })
})

router.post('/',(req,res)=>{
    console.log('entered into the post request')
    console.log(req.body, ' post request has come ');
    // res.send('lwda lele')
    const {name,message,timestamp,received} = req.body;

 const msg = new messageModel({
    name:name,
    message: message,
    timestamp: timestamp,
    received: received,
 });

 msg.save().then((result)=>{
   //  console.log(result)
    res.status(200).json(result)
 }).catch((err)=>{
    res.status(404).send(err);
 })

})

module.exports = router;