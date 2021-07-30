import { Router } from 'express';
import multer from 'multer';
import { uploadConfig } from '@config/upload';
import { ensureAuthenticate } from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import { UsersController } from '../controllers/UsersController';
import { UserAvatarController } from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.patch(
    '/avatar',
    ensureAuthenticate,
    upload.single('avatar'),
    userAvatarController.update,
);

usersRouter.post('/', usersController.create);

export { usersRouter };
