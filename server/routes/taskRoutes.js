import express from 'express'
import taskController from '../controllers/taskController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/',authMiddleware,taskController.createTask)
router.get('/',authMiddleware,taskController.getAllTask)
router.put('/:id',authMiddleware,taskController.updateTask)
router.delete('/:id',authMiddleware,taskController.deleteTask)

export default router