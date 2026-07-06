import express from 'express'
import progressController from '../controllers/progressController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/',authMiddleware,progressController.markProgress)
router.get('/week',authMiddleware,progressController.getWeeklyProgress)
router.get('/month',authMiddleware,progressController.getMonthlyProgress)

export default router