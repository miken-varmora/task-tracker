import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    color:{
        type:String,
        default:'#3B82F6'
    },
    icon:{
        type:String,
        default:'📚'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
})

const taskModel = mongoose.model('Task',taskSchema)

export default taskModel