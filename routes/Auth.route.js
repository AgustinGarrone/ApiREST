import express from "express";
import { body} from "express-validator";
import { infoUser, login, register } from "../controllers/Auth.controller.js";
import { authValidation } from "../middlewares/authValidation.js";
import { requireToken } from "../middlewares/requireToken.js";
const router=express.Router()

router.post('/register',[
    body('email',"Formato de email incorrecto")
        .trim() 
        .isEmail()
        .normalizeEmail(),
    body("password","Formato de password incorrecto")
        .trim()
        .isLength({min:6})
],
 authValidation
,register)


router.post('/login',[
    body('email',"Formato de email incorrecto")
        .trim() 
        .isEmail()
        .normalizeEmail(),
    body("password","Formato de password incorrecto")
        .trim()
        .isLength({min:6})
],authValidation,login)

router.get('/protected',requireToken,infoUser)

export default router;