import taskModel from '../models/Task.js'

const createTask = async (req,res) => {

    try {
        const {title,color,icon} = req.body

        if(!title.trim()){
            return res.status(400).json({
                success:false,
                message:'Title is required'
            })
        }

        const task = await taskModel.create({
            title,
            color,
            icon,
            user:req.user.id
        })

        res.status(201).json({
            success:true,
            message:'Task created successfully',
            data:task
        })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({
            success:false,
            message:'server error'
        })
    }

}

const getAllTask = async (req,res) => {
    try {
        const allTask = await taskModel.find({
            user:req.user.id,
            isActive:true
        }).sort({createdAt:-1})

        res.status(200).json({
            success:true,
            message:'get all task successfully',
            tasks:allTask
        })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({
            success:false,
            message:'server error'
        })
    }
}

const updateTask = async (req,res) => {
    try {
        const id = req.params.id

        const {title,color,icon} = req.body

        const task = await taskModel.findById(id)

        if(!task){
            return res.status(404).json({
                success:false,
                message:'Task not found'
            })
        }

        if(task.user.toString() !== req.user.id){
            return res.status(403).json({
                success:false,
                message:'you are not authorized to change the task'
            })
        }

        task.title = title || task.title
        task.color = color || task.color
        task.icon = icon || task.icon

        await task.save()

        res.status(200).json({
            success:true,
            message:'Task updated successfully',
            tasks: task
        })

    } catch (error) {
        console.log(error.message)

        res.status(500).json({
            success:false,
            message:'server error'
        })
    }
}

const deleteTask = async (req,res) => {
    try {
        const id = req.params.id

        const task = await taskModel.findById(id)

        if(!task){
            return res.status(404).json({
                success:false,
                message:'task not found'
            })
        }

        if(task.user.toString() !== req.user.id){
            return res.status(403).json({
                success:false,
                message:'you are unathorized to change the task'
            })
        }

        task.isActive = false

        await task.save()

        res.status(200).json({
            success:true,
            message:'task deleted successfully',
            tasks:task
        })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({
            success:false,
            message:'server error'
        })
    }
}

export default {createTask,getAllTask,updateTask,deleteTask}