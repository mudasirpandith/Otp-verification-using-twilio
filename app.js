const express=require('express')
const bodyParser=require('body-parser')
var twilio = require('twilio');
const app=express()
 var accountSid = '****Ceccdfcb**************529c9eec41c3c'; // Your Account SID from www.twilio.com/console
var authToken = '****7384c19*****************b9a8501e282';   // Your Auth Token from www.twilio.com/console
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
.services('****6ff052d*******0b277e9068df6f')
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
  .services('*******6ff0***********7e9**df6f')
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
