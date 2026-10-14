import * as userService from '../service/user.service.js';

export async function uploadProfilePic(req, res, next) {
   try {
      await userService.uploadProfilePic(req.user.id, req.file);
      res.status(201).json({ message: "File uploaded successfully", success: true });
   }
   catch (error) {
      next(error)
   }
}