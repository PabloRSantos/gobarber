import { ListProviderAppointmentsService } from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ProviderAppointmentsController {
    async index(request: Request, response: Response): Promise<Response> {
        const { day, month, year } = request.query;
        const provider_id = request.user.id;

        const listProviderAppointmentsService = container.resolve(
            ListProviderAppointmentsService,
        );

        const appointments = await listProviderAppointmentsService.execute({
            provider_id,
            month: Number(month),
            year: Number(year),
            day: Number(day),
        });

        return response.json(classToClass(appointments));
    }
}
