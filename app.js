const express=require('express')
const bodyParser=require('body-parser')
var twilio = require('twilio');
const app=express()
 var accountSid = 'ACa60d145aaf9252389f5557018cf3462b'; // Your Account SID from www.twilio.com/console
var authToken = 'a4a47de77ba8fcdb1d767f30133bb296';   // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);
var ph;
var code;
app.use(bodyParser.urlencoded({ extended:true}))

app.get('/',(req,res)=>{
  
res.sendFile(__dirname+"/views/index.html")


})
app.post('/',(req,res)=>{
   ph=req.body.phnum;
  code=req.body.code;
 // console.log(code+ph)

client
.verify
.services('VAff4dd74b8a896b6b5aa717383fd7d5ad')
.verifications
.create({
    to:code+ph,
    channel:"sms"
    
}).then(()=>{console.log(res.statusCode)
})


  
    res.sendFile(__dirname+"/views/otp.html")

})
app.post('/signin/result',(req,res)=>{
  client
  .verify
  .services('VAff4dd74b8a896b6b5aa717383fd7d5ad')
  .verificationChecks
  .create({
    to:code+ph,
    code:req.body.otp
  }).then(verification_check => {console.log(verification_check.status)

var st=verification_check.status
  if(st==="approved"){
    console.log("PASS")
    res.sendFile(__dirname+"/views/success.html")
  }else{
    console.log("FAIL!!!")
    res.sendFile(__dirname+"/views/fail.html")
  }
 } );
 
  
  
  
  
 
 
  

})
 

 
app.listen(process.env.PORT||3000,()=>{
  console.log("http://localhost:3000")
})