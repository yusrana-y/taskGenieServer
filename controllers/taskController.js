const tasks = require('../models/taskModel')


//add a task

exports.addTaskController = async (req, res) => {
    console.log("inside add task controller")
    //take data from the frontend 
    const { title, desc, sDate, eDate } = req.body
    console.log(title, desc, sDate, eDate)
    //take the userId from the token using jwtMiddleware.
    //check if present in db already
    try {
        const existingTask = await tasks.findOne({ title })
        if (existingTask) {
            res.status(406).json("Task already added to db..")
        }
        else {
            const newTask = new tasks({
                title, desc, sDate, eDate, userId: req.userId
            })
            await newTask.save()
            res.status(200).json(newTask)
        }
    }
    catch (err) {
        res.status(401).json(err)
    }

}

//get all tasks

exports.getAllTaskController = async (req, res) => {
    console.log("inside get all task controller")
    const userId = req.userId

    const searchKey = req.query.search
    console.log(searchKey);
    
    const query = {
        title:{
            $regex:searchKey,$options:"i"
        }
    }
    //read data from mongoDB
    try 
    {
        const allTasks = await tasks.find({ ...query, userId });
        console.log(allTasks);
        if (allTasks) {
            res.status(200).json(allTasks)
        }
        else {
            res.status(404).json("NO tasks! Please add a task")
        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}

//delete a single task

exports.deleteTaskController = async(req,res)=>{
    console.log("inside delete task controller");
    //get the task id from front ent
    const {tId} = req.params
    console.log(tId);
    //api call
    try
    {
        const deletedTask = await tasks.findByIdAndDelete({_id:tId})
        console.log(deletedTask)
        res.status(200).json(deletedTask)        
    }
    catch(err)
    {
        res.status(401).json(err)
    }
}

// edit a single task

exports.editTaskController = async(req,res)=>{
    console.log("inside edit task controller")
    //update in mongoDB using mongoose
    const {tId} = req.params
    const {title,desc,sDate,eDate} = req.body
    const userId = req.userId
    console.log(tId,userId);
    

    try
    {
        const updatedTask = await tasks.findByIdAndUpdate({_id:tId},{title,desc,sDate,eDate,userId},{new:true})
        await updatedTask.save()
        res.status(200).json(updatedTask)

    }
    catch(err)
    {
        res.status(401).json(err)
    }
}

