import express from 'express'
import { getAllPlots, getAllSlotBookings, getAllUsers, getAllproducts, getAllseats, getOwnerPlots, getPlotSlotsByIdAndType, getStaff } from '../controllers/getServices.js'


const router= express.Router()

router.post('/getStaff', getStaff)
router.get('/getAllUsers', getAllUsers)
router.get('/getAllproducts', getAllproducts)
router.get('/getAllplots', getAllPlots)
router.get('/getPlotslots', getPlotSlotsByIdAndType)
router.get('/getOwnerPlots/:id', getOwnerPlots)

router.get('/getAllseats', getAllseats)
router.get('/getAllBookings', getAllSlotBookings)


export default router