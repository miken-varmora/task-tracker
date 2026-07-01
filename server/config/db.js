import mongoose from "mongoose";

const connetDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB is connected successfully')
    } catch (error) {
        console.log('MongoDb connection failed')
        console.log(error.message)
    }
}

export default connetDb