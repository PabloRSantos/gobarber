import { Router } from 'express';
import { ensureAuthenticate } from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import { celebrate, Segments, Joi } from 'celebrate';
import { AppointmentsController } from '../controllers/AppointmentsController';
import { ProviderAppointmentsController } from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticate);

// appointmentsRouter.get('/', appointmentsController.list);

appointmentsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date(),
        },
    }),
    appointmentsController.create,
);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export { appointmentsRouter };
