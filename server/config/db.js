import mongoose from "mongoose";

const connetDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://mikenkvarmora:mikenkvarmora@mikenvarmora.rdbg93i.mongodb.net/task-tracker')
        console.log('MongoDB is connected successfully')
    } catch (error) {
        console.log('MongoDb connection failed')
        console.log(error.message)
    }
}

export default connetDb