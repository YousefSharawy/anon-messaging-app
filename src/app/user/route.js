import { Router } from "express"
const userRouter = Router();
import * as userController from './controller/user.controller.js';
import { guard } from "../../lib/auth/guard.js";
import { uploadSingleFile } from "../../pkg/media/multer.js";
import { fileValidation } from "../../pkg/media/file.validation.js";
userRouter.post('/upload-pp', guard , uploadSingleFile('pp'), fileValidation(), userController.uploadProfilePic)
export default userRouter;