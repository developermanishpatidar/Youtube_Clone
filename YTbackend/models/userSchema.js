import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        max: 20
    }
});

const UserModel = mongoose.model('users',userSchema);

export default UserModel;