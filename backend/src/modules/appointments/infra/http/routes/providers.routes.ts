import { Router } from 'express';
import { ensureAuthenticate } from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import { celebrate, Segments, Joi } from 'celebrate';
import { ProvidersController } from '../controllers/ProvidersController';
import { ProviderDayAvaibilityController } from '../controllers/ProviderDayAvaibilityController';
import { ProviderMonthAvaibilityController } from '../controllers/ProviderMonthAvaibilityController';

const providersRouter = Router();

const providersController = new ProvidersController();
const providerMonthAvaibilityController = new ProviderMonthAvaibilityController();
const providerDayAvaibilityController = new ProviderDayAvaibilityController();

providersRouter.use(ensureAuthenticate);

providersRouter.get('/', providersController.index);
providersRouter.get(
    '/:provider_id/month-availability',
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required(),
        },
        [Segments.QUERY]: {
            year: Joi.string().required(),
            month: Joi.string().required(),
        },
    }),
    providerMonthAvaibilityController.index,
);
providersRouter.get(
    '/:provider_id/day-availability',
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required(),
        },
        [Segments.QUERY]: {
            year: Joi.string().required(),
            month: Joi.string().required(),
            day: Joi.string().required(),
        },
    }),
    providerDayAvaibilityController.index,
);

export { providersRouter };
