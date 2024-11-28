import { Router } from "express";
import { expressCallback } from "../utils/expressCallback";
import {AdminController } from "../conrollers/AdminController";
import { AdminRepository} from "../repositories/adminRepository";
import { AdminService } from "../services/adminService"
import {loginValidator } from "../midlewere/validator/loginValidators"
import authMiddleware from "../midlewere/jwt/authentiCateToken";
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

export default router;