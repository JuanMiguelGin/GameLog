import { Router } from 'express'
import * as ctrl from '../controllers/games.controller'

const router = Router()

router.get('/', ctrl.getGames)
router.get('/:id', ctrl.getGame)
router.post('/', ctrl.createGame)
router.patch('/:id', ctrl.updateGame)
router.delete('/:id', ctrl.deleteGame)

export default router
