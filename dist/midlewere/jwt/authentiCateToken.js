import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../utils/constant';
const authMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    const isTokenExpired = (exp) => Date.now() >= exp * 1000;
    if (accessToken) {
        try {
            const decoded = jwt.decode(accessToken);
            if (decoded && !isTokenExpired(decoded.exp)) {
                req.user = decoded;
                return next();
            }
            console.log('Access token expired.');
        }
        catch (err) {
            return res.status(401).json({ message: 'Invalid access token.' });
        }
    }
    // Check for refresh token if access token expired
    if (refreshToken) {
        try {
            // Decode the refresh token without verifying (to manually check expiry)
            const decoded = jwt.decode(refreshToken);
            if (decoded && !isTokenExpired(decoded.exp)) {
                // Generate a new access token
                const newAccessToken = jwt.sign({ id: decoded.id, role: decoded.role }, JWT_SECRET(), { expiresIn: '1h' });
                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    domain: ".docreserva.site",
                });
                req.user = decoded; // Attach user payload to the request
                return next(); // Proceed to the next controlle
            }
            console.log('Refresh token expired.');
            return res.status(403).json({ message: 'Refresh token expired. Please log in again.' });
        }
        catch (err) {
            return res.status(403).json({ message: 'Invalid refresh token.' });
        }
    }
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
};
export default authMiddleware;
