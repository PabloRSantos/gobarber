import { Router } from 'express';
import { ensureAuthenticate } from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import { ProvidersController } from '../controllers/ProvidersController';

const providersRouter = Router();

const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticate);

providersRouter.get('/', providersController.index);

export { providersRouter };
