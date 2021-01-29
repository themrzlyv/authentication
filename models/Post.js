import mongoose, { Schema } from 'mongoose'


const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim:true
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    image: {
        type:String,
        default: 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
    },
    description: {
        type:String,
        maxlength: [60, 'About must be max 60 characters'],
        default: 'Not any info'
    }
}, {timestamps: true})

export default mongoose.models.Post || mongoose.model("Post" , PostSchema);
