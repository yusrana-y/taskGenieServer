const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    sDate:{
        type:String,
        required:true
    },
    eDate:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const tasks = mongoose.model("tasks",taskSchema)
module.exports = tasks