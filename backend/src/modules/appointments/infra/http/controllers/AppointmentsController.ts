import { CreateAppointmentService } from '@modules/appointments/services/CreateAppointmentService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AppointmentsController {
    async create(request: Request, response: Response): Promise<Response> {
        const { provider_id, date } = request.body;
        const user_id = request.user.id;

        const createAppointmentService = container.resolve(
            CreateAppointmentService,
        );

        const appointment = await createAppointmentService.execute({
            date,
            provider_id,
            user_id,
        });

        return response.json(appointment);
    }
}
