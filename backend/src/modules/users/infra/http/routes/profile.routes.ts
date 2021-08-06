import { Router } from 'express';
import { ensureAuthenticate } from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import { ProfileController } from '../controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthenticate);

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export { profileRouter };
