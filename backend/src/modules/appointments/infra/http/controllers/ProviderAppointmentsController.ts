import { ListProviderAppointmentsService } from '@modules/appointments/services/ListProviderAppointmentsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ProviderAppointmentsController {
    async index(request: Request, response: Response): Promise<Response> {
        const { day, month, year } = request.body;
        const provider_id = request.user.id;

        const listProviderAppointmentsService = container.resolve(
            ListProviderAppointmentsService,
        );

        const appointments = await listProviderAppointmentsService.execute({
            provider_id,
            month,
            year,
            day,
        });

        return response.json(appointments);
    }
}
