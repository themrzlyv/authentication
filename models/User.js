import mongoose, { Schema } from 'mongoose'


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password: {
        type:String,
        required:true,
        trim:true
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    avatar: {
        type:String,
        default: 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
    },
    about: {
        type:String,
        maxlength: [60, 'About must be max 60 characters'],
        default: 'Not any info'
    }
}, {timestamps: true})

export default mongoose.models.User || mongoose.model("User" , UserSchema);
