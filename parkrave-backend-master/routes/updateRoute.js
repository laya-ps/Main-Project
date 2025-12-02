import express from 'express'
import { UpdateUserStatus, updateUser } from '../controllers/editServices.js'

const router= express.Router()

router.put('/UpdateUser',updateUser)
router.put('/UpdateUserStatus',UpdateUserStatus)

export default router