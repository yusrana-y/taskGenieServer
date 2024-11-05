const users = require('../models/userModel')

const jwt = require('jsonwebtoken')

//register logic

exports.registerController = async(req,res)=>{
    console.log("inside register controller");
    //get the data from front end
    const {username,email,password} = req.body
    console.log(username,email,password)
    
    //check if email is present in mongoDb
    try{
    const existingUSer = await users.findOne({email})
    console.log(`existing uer: ${existingUSer}`)
    if(existingUSer)
    {
        res.status(406).json("Account already exists, Please log in")
    }
    else
    {
        const newUser = new users({
            username,email,password
        })
        console.log(newUser);
        await newUser.save()
        res.status(200).json(`${newUser} newuser saved`)

    }
    }
    catch(err){
        res.status(401).json(err)
    }
}

// login logic

exports.loginController=async (req,res)=>{
    console.log("inside login controller");
    //take the data from body
    const {email,password} = req.body
    console.log(`front end ${email} ${password}`);
    
    //check if email,password correct ni mongoDB
    try
    {
        const existingUSer = await users.findOne({email,password})
        console.log(existingUSer);
        if(existingUSer)
        {
            //login success
            const token = jwt.sign({userId:existingUSer._id},process.env.JWT_PASSWORD)
            res.status(200).json({
                user:existingUSer,
                token
            })
            console.log("logged in");
            
        }
        else
        {
            res.status(404).json("Incorrect email/password")
            console.log("inccorect emailll");
            
        }
        
    }
    catch(err)
    {
        res.status(401).json(err)
    }
}