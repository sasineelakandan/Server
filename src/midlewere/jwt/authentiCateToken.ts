import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../../utils/constant';


interface UserPayload extends JwtPayload {
  id: string;
  role: string;
}


export interface CustomRequest extends Request {
  user?: UserPayload;
}


const authMiddleware = (req:CustomRequest, res: Response, next: NextFunction): any => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  
  
  if (accessToken) {
    jwt.verify(accessToken, JWT_SECRET(), (err:any, decoded:any) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired access token.' });
      }

      const user = decoded as UserPayload;
      req.user = user;
      
      return next(); 
    });
  } 
  
  else if (refreshToken) {
    jwt.verify(refreshToken, JWT_SECRET(), (err:any, decoded:any) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired refresh token.' });
      }

      const user = decoded as UserPayload;
      console.log(user);

      
      const newAccessToken = jwt.sign(
        { id: user.id, role: user.role }, 
        JWT_SECRET(),
        { expiresIn: '1h' }
      );

    
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
      
      });

      req.user= user
      return next(); 
    });
  } 
  
  else {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
};

export default authMiddleware;
