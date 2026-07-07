import userModel from '../models/User.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const registerUser = async (req,res) => {
    try {
        // Step 1: get data from frontend
        const { name,email,password } = req.body

        // Step 2: check that all field are coming
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message:"All field are required"
            })
        }

        // Step 3: check user are already exists
        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist"
            })
        }

        // Step 4: hashed password
        const hashedPassword = await bcryptjs.hash(password,10)

        // Step 5: create user
        const user = await userModel.create({
            name,
            email,
            password:hashedPassword
        })

        // Step 6: token generate
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )

        // Step 7: response
        res.status(200).json({
            success:true,
            message:'User created successfully',
            token,
            user:{
                id : user._id,
                name : user.name,
                email : user.email
            }
        })

    } catch (error) {
        console.log(error.message)

        res.status(500).json({
            success:false,
            message:'server error'
        })
    }
}

const loginUser = async (req,res) => {
    try {
        // Step 1: get data from frotend or user
        const {email,password} = req.body

        // Step 2: check all field are coming
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'All field are required'
            })
        }
        
        // Step 3: user exist or not
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({
                success:false,
                message:'email and password are incorrect'
            })
        }

        // Step 4: compare the password
        const isMatch = await bcryptjs.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:'email and password are incorrect'
            })
        }

        // Step 5: Generate the token
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )

        // Step 6: response
        res.status(200).json({
            success:true,
            message:"Login Successfully",
            token,
            user:{
                id: user._id,
                name:user.name,
                email:user.email,
            }
        })

    } catch (error) {
        console.log(error.message)

        res.status(500).json({
            success:false,
            message:'server error'
        })
    }
}

const profileUser = async (req,res) => {
    try {
        // Step 1: get user from database 
        const user = await userModel.findById(req.user.id).select('-password')

        // Step 2: check user is exist or not
        if(!user){
            return res.status(404).json({
                success:false,
                message:'Login required'
            })
        }

        // Step 3: response
        res.status(200).json({
            success: true,
            message:'Successfully',
            data:{
                id: user._id,
                name:user.name,
                email:user.email
            }
        })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({
            success:false,
            message:'server error'
        })
    }
}

export default {registerUser,loginUser,profileUser}