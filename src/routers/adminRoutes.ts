import { Router ,Request,Response} from "express";
import { expressCallback } from "../utils/expresscallback";
import {AdminController } from "../conrollers/AdminController";
import { AdminRepository} from "../repositories/adminRepository";
import { AdminService } from "../services/adminService"
import {loginValidator } from "../middlewere/validator/loginValidators"
import authMiddleware from "../middlewere/jwt/authentiCateToken";
const router = Router();

const repository = new AdminRepository();

const service = new AdminService(repository);

const controller = new AdminController(service);


router
.route('/adminlogin')
.post(loginValidator,expressCallback(controller.adminLogin))
router
.route('/patients')
.get(authMiddleware,expressCallback(controller.patientDetails))
.patch(authMiddleware,expressCallback(controller.isBlocked))
.delete(authMiddleware,expressCallback(controller.isDelete))
router
.route('/doctors')
.get(authMiddleware,expressCallback(controller.doctorDetails))
.patch(authMiddleware,expressCallback(controller.isVerify))

router
.route('/verifieddoctors')
.get(authMiddleware,expressCallback(controller.verifiedDoctors))
.patch(authMiddleware,expressCallback(controller.blockDoctor))
.delete(authMiddleware,expressCallback(controller.deleteDoctor))

router
.route('/appointments')
.get(authMiddleware,expressCallback(controller.getAppointments))

router
.route('/reviews')
.get(authMiddleware,expressCallback(controller.getReviews))
.delete(authMiddleware,expressCallback(controller.deleteReview))

router.route("/logout").post((req:Request, res:Response) => {
    
    res.clearCookie("accessToken", { path: "/" })
    res.clearCookie("refreshToken", { path: "/" })
    res.status(200).json({ message: "Logged out successfully" });
  });

export default router;