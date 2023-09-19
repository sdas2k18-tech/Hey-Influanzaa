const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")


router.post('/createpost',(req,res)=>{
    const {title,body} = req.body
    if(!title || !body){
        return res.status(422).json({error:"Please add all the fields"})
    }
    console.log(req.user)
    res.send("ok")
    // const post = new this.post({
    //     title,
    //     body,
    //     //postedBy
    // })
})

module.exports = router
