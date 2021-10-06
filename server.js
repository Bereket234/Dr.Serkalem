const express=  require('express');
const nodemailer= require('nodemailer');
const path= require('path');

const app= express();

const PORT= process.env.PORT|| 3000;

app.use(express.static('public')); 
app.use(express.json());

app.post('/', (req, res)=>{

    const { name, email, phone, message }= req.body;
    // sendMail(email, name, phone, message, (err, data)=>{
    //     if(err){
    //         res.status(500).send({message: 'error in sending data!!'});
    //     }else{
    //         res.send({message: 'message sent.'})
    //     }
    // })
    console.log(name+" " +phone+" "+ email+ " "+ message)
    
const transporter= nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email',
        pass: 'pass'
    }
})

    const mailOption= {
        from:email ,
        to: 'bereketnigussie9@gmaol.com',
        subject: `message from ${name}: ${phone}` ,
        text:  message
    }
    
    transporter.sendMail(mailOption, (err, data)=>{
        if(err){
            console.log(err);
            res.json('error')
        }else{
            console.log(data)
            res.json('success')
        }
    })
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname+ '/public/index.html'))
})

app.listen(PORT, ()=>{
    console.log("server listenening on port: ", PORT);
}) 
