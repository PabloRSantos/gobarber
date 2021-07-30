import { Router } from 'express';
import { appointmentsRouter } from '@modules/appointments/infra/http/routes/appointments.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/session.routes';
import { usersRouter } from '@modules/users/infra/http/routes/user.routes';

const routes = Router();
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export { routes };
