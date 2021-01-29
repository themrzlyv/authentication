import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validator } from '../helpers/validator.js'


export const register = async (req,res) => {
    try {
        const {name,email,password, avatar, posts, about} = req.body

        const msg = validator(email,password)
        if(msg) return res.status(400).json({err: msg})

        const user = await User.findOne({email})
        if(user) return res.status(400).json({err: "This user is already exists"})

        const passwordhash = await bcrypt.hash(password, 12)
        const newuser = await User({
            name,
            email,
            password: passwordhash,
            avatar,
            posts,
            about
        }).save()

        const accesstoken = jwt.sign({id: newuser._id} ,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})

        res.status(200).json({accesstoken})

    } catch (error) {
        return res.status(500).json({err: error})
    }
}



export const login = async (req,res) => {
    try {
        const {email,password} = req.body

        const msg = validator(email,password)
        if(msg) return res.status(400).json({err: msg})

        const user = await User.findOne({email})
        if(!user) return res.status(400).json({err: "This user does not exists"})

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({err: "Password is not valid"})


        const accesstoken = jwt.sign({id: user._id} ,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
        res.status(200).json({accesstoken})

        
    } catch (error) {
        return res.status(500).json({err: error})
    }
}

export const updateUser = async(req,res) => {
    try {
        const {id , name , email , avatar, about} = req.body
        
        const user = await User.findByIdAndUpdate({_id:id}, {name,email,avatar,about}, {new: true})

        res.json(user)
    } catch (error) {
        return res.status(500).json({error})
    }
}

export const getUser = async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if(!user) return res.status(400).json({err: "User does not exist"})

        res.json(user)
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}