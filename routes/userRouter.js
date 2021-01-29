import express from 'express'
import { getUser, login, register, updateUser } from '../controllers/userCtrl.js';
import { Auth } from '../helpers/middlewares/Auth.js';

const userRouter = express.Router()


userRouter.post("/register" , register)
userRouter.post("/login" , login)

userRouter.get("/info" ,Auth, getUser)


userRouter.put('/update',Auth, updateUser)

export default userRouter;