import taskModel from '../models/Task.js'
import progressModel from '../models/Progress.js'

const markProgress = async (req, res) => {
    try {
        const { taskId, completed } = req.body

        if (!taskId) {
            return res.status(400).json({
                success: false,
                message: 'task not found'
            })
        }

        const task = await taskModel.findById(taskId)

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            })
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'you are not authorized to check the box'
            })
        }

        const startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date()
        endOfDay.setHours(23, 59, 59, 999)

        let progress = await progressModel.findOne({
            user: req.user.id,
            task: taskId,
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        })

        if (progress) {
            progress.completed = completed
            await progress.save()
        } else {
            progress = await progressModel.create({
                user: req.user.id,
                task: taskId,
                date: new Date(),
                completed
            })
        }

        res.status(200).json({
            success: true,
            message: 'Progress update successfully',
            progress
        })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({
            success: false,
            message: 'server error'
        })
    }
}

const getWeeklyProgress = async (req, res) => {
    try {
        const today = new Date()

        const day = today.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        const startOfDay = new Date(today)
        startOfDay.setDate(today.getDate() + diff)
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date(startOfDay)
        endOfDay.setDate(startOfDay.getDate() + 6)
        endOfDay.setHours(23, 59, 59, 999)

        const progress = await progressModel.find({
            user: req.user.id,
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }).populate('task')

        res.status(200).json({
            success: true,
            message: 'weekly progress successfully get',
            progress
        })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({
            success: false,
            message: 'server error'
        })
    }
}

const getMonthlyProgress = async (req, res) => {
    try {
        const today = new Date()

        const startOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        )
        startOfMonth.setHours(0,0,0,0)

        const endOfMonth = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
        )
        endOfMonth.setHours(23,59,59,999)

        const progress = await progressModel.find({
            user:req.user.id,
            date:{
                $gte:startOfMonth,
                $lte:endOfMonth
            }
        }).populate('task')

        const total = progress.length;

        const completed = progress.filter(item => item.completed).length

        const percentage = total === 0 ? 0 : Math.round((completed/total) * 100)

        res.status(200).json({
            success:true,
            message:'Monthly progress is calculated successfully',
            totalTasks:total,
            completedTasks: completed,
            percentage,
            progress
        })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({
            success: false,
            message: 'server error'
        })
    }
}

export default { markProgress, getMonthlyProgress, getWeeklyProgress }