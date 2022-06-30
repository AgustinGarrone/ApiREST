import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const {Schema,model}=mongoose


const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre("save",async function (next) {
    if (!this.isModified("password")) return next()
    try {
        const salt=await bcryptjs.genSalt(10)
        this.password= await bcryptjs.hash(this.password,salt)
        next()
    } catch (err) {
        throw new Error("Falló al hashear contraseña")
        console.log(err)
    }
})

userSchema.methods.comparePassword= async function (candidatePass) {
    return await bcryptjs.compare(candidatePass,this.password)
}

export const User = model('user',userSchema)