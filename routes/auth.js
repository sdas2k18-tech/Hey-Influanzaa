const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')


// router.get('/',(req,res)=>{
//     res.send("hello")
// })

router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body
    if(!email || !password || !name){
        return res.status(422).json({error:"please add all the fields"})
    }
    res.json({message:"successfully posted"})
    //console.log(req.body)
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exist with that emaol"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
                const user = new User({
                    email,
                    password:hashedpassword,
                    name
                })
        
                user.save()
                .then(user=>{
                    res.json({message :"saved successfully"})
                })
                .catch(err=>{
                    console.log(err)
                })

            })
   
    })
    .catch(err=>{
        console.log(err)
    })  // ending for route
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            res.status(422).json({error:"invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                res.json({message:"successfully signed in"})
            }
            else{
                return res.status(422).json({error:"invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err) // error from developer side
        })
    })

})

module.exports = router