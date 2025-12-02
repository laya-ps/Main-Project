import express from 'express'
import { addPlotOwner,  addPlotWithSlots,  addSeats,  addUser, bookSlot } from '../controllers/addServices.js'


const router= express.Router()


router.post('/addPlotOwner', addPlotOwner)
router.post('/addUser', addUser)
router.post('/addPlotSlots', addPlotWithSlots)

router.post('/addSeats', addSeats)
router.post('/bookslot', bookSlot)


export default router

