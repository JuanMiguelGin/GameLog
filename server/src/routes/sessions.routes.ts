import { Router } from 'express'
import * as ctrl from '../controllers/sessions.controller'

const router = Router()

router.get('/', ctrl.getSessions)
router.post('/', ctrl.createSession)
router.delete('/:id', ctrl.deleteSession)

export default router
