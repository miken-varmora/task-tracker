import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})

const progressModel = mongoose.model('Progress',progressSchema)

export default progressModel