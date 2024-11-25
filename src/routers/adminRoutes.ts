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
.route('/api/admin/adminlogin')
.post(loginValidator,expressCallback(controller.adminLogin))
router
.route('/api/admin/patients')
.get(authMiddleware,expressCallback(controller.patientDetails))
.patch(authMiddleware,expressCallback(controller.isBlocked))
export default router;