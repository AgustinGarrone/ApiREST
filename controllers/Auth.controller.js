import jwt from "jsonwebtoken"
import { generateRefreshToken } from "../middlewares/requireToken.js"
import { User } from "../models/User.js"
import { generateToken } from "../utils/generateToken.js"


export const register = async (req,res)=>{
    const {email,password}=req.body
    try {
        let user=await User.findOne({email:email})
        if (user) throw new Error ("Email ya registrado")
        user= new User({email:email,password:password})
        await user.save()

        //jwt
        const token=jwt.sign({uid:user._id},process.env.JWT_SECRET)

        return res.json(token)
    } catch (error) {
        console.log(error)
        res.json(error.message)
    }
}
export const login = async (req,res)=>{
    try {
        const {email,password}=req.body
        let user=await User.findOne({email:email})
        if(!user) throw new Error ("No existe este usuario")
        const respuestaPassword=await user.comparePassword(password)
        if(!respuestaPassword) throw new Error ("Contraseña incorrecta")
        const {token,expiresIn}=generateToken(user.id)

        generateRefreshToken(user.id,res)
        
        return res.json({token,expiresIn})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

export const infoUser= async (req,res) => {
    try {
        const user= await User.findById(req.uid).lean()
        res.json({email:user.email,uid:user.id})
    } catch (error) {
        return res.status(500).json({error:"error de server"})
    }
}