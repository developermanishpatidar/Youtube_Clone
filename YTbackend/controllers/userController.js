import UserModel from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



//User registration
export async function register(req,res){
    try{
        let {username,email,password} = req.body;
        UserModel.findOne({email})
        .then((data)=>{
            if(data){
                return res.status(409).json({message:"User already exists"})
            }
            else{
                UserModel.create({
                    username,
                    email,
                    password: bcrypt.hashSync(password, 10)
                })
                res.status(201).json({message: "user created successfully"})
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

            const token = jwt.sign({data}, 'secretKey' , {expiresIn:'60m'});

            return res.status(200).json({
                user : {
                    email: data.email,
                    username: data.username
                },
                accessToken: token
            })
        })
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}