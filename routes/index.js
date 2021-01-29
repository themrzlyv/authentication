import express from 'express'
import postsRouter from './postsRouter.js';
import userRouter from './userRouter.js';

const routes = express.Router()

routes.use("/user" , userRouter)
routes.use('/post' , postsRouter)

export default routes;