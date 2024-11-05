const mongoose = require('mongoose')

const dbConnection = process.env.CONNECTION_STRING

mongoose.connect(dbConnection).then(()=>{
    console.log("mongoDB connected succesfully");
    
}).catch(err=>{
    console.log("DB connection failed");
    console.log(err);
})

