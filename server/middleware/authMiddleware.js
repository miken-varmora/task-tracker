import jwt from 'jsonwebtoken'

const authMiddleware = (req,res,next) => {
    
    try {

        // Step 1: getting token from frontend
        const authHeader = req.headers.authorization;

        // Step 2: check token coming or not
        if(!authHeader){
            return res.status(401).json({
                success:false,
                message:'Authorization token required'
            })
        }

        // Step 3: remove bearer
        const token = authHeader.split(" ")[1]

        // Step 4: verify the token
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        // Step 5: store it in req.user
        req.user = decoded

        // Step 6: next middleware/controller
        next()

    } catch (error) {
        console.log(error.message)

        res.status(401).json({
            success: false,
            message:'Invalid or expired token'
        })
    }
}
export default authMiddleware