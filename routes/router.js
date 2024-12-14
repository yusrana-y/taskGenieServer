const express = require('express')
const userController = require('../controllers/userController')
const taskController = require('../controllers/taskController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const router = new express.Router()

// register router http://localhost:3000/regsiter

router.post("/register",userController.registerController)

//login route http://localhost:3000/login

router.post("/login",userController.loginController)


//add a task http://localhost:3000/add-task

router.post("/api/tasks",jwtMiddleware,taskController.addTaskController)

// get all tasks http://localhost:3000/get-AllTask

router.get("/api/tasks",jwtMiddleware,taskController.getAllTaskController)

//delete a single task http://localhost:3000/tId/delete-task

router.delete("/api/tasks/:tId",jwtMiddleware,taskController.deleteTaskController)

//update a single task http://localhost:3000/api/tasks/:tId

router.put("/api/tasks/:tId",jwtMiddleware,taskController.editTaskController)


module.exports = router