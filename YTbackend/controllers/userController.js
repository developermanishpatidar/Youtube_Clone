import UserModel from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/server.js'



//User registration
export async function register(req,res){
    try{
        let {avatar,username,email,password} = req.body;
        UserModel.findOne({email})
        .then((data)=>{
            if(data){
                return res.status(409).json({message:"User already exists"})
            }
            else{
                UserModel.create({
                    avatar,
                    username,
                    email,
                    password: bcrypt.hashSync(password, 10)
                })
                res.status(201).json({message: "User created successfully"})
            }
        })
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}

// User login and generate token
export async function login(req,res){
    try{
        let {email,password} = req.body;
        UserModel.findOne({email}).then((data)=>{
            if(!data){
                return res.status(403).json({message:"User doesnot exists"})
            }
            let validPassword = bcrypt.compareSync(password, data.password); 
            if(!validPassword){
                return res.status(403).json({message:"Wrong credentials"})
            }

            const token = jwt.sign({data}, JWT_SECRET_KEY , {expiresIn:'60m'});

            return res.status(200).json({
                user : {
                    avatar:data.avatar,
                    email: data.email,
                    username: data.username
                },
                AccessToken: token
            })
        })
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}