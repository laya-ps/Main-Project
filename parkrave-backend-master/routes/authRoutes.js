import express from 'express'
import { Adminlogin, login } from '../controllers/auth.js'


const router= express.Router()


router.post('/Login', login)
router.post('/AdminLogin', Adminlogin)


export default router
