import { Response, NextFunction } from 'express'; // Import Express types
import User from '../../models/userModel'; // Import User model and its TypeScript interface if defined
import { CustomRequest } from '../jwt/authentiCateToken';


const checkIfBlocked = async (
    httpRequest:CustomRequest , // Extend Request to include a possible userId property
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = httpRequest?.user?.id; 
        console.log(userId)
        if (!userId) {
            res.status(401).json({ message: "Unauthorized: No user ID provided." });
            return;
        }

        const user= await User.findOne({_id:userId}); // Retrieve user from the database
        console.log(user)
        if (!user) {
            throw new Error("User Not Found");
        }

        if (user.isBlock) {
            console.log('hai')
           throw new Error("Access denied: Your account is blocked." );
           
        }

        next(); 
    } catch (error) {
        console.error("Error checking blocked status:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export default checkIfBlocked;
