import { CreateAppointmentService } from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AppointmentsController {
    async create(request: Request, response: Response): Promise<Response> {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointmentService = container.resolve(
            CreateAppointmentService,
        );

        const appointment = await createAppointmentService.execute({
            date: parsedDate,
            provider_id,
        });

        return response.json(appointment);
    }

    async list(request: Request, response: Response): Promise<Response> {
        // const appointments = await appointmentsRepository.find();
        // return response.json(appointments);
    }
}