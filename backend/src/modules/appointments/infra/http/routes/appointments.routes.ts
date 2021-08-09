import { Router } from 'express';
import { ensureAuthenticate } from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import { AppointmentsController } from '../controllers/AppointmentsController';
import { ProviderAppointmentsController } from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticate);

// appointmentsRouter.get('/', appointmentsController.list);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export { appointmentsRouter };
