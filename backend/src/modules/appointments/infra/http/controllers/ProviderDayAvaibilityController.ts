import { ListProviderDayAvailabilityService } from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ProviderDayAvaibilityController {
    async index(request: Request, response: Response): Promise<Response> {
        const { month, year, day } = request.body;
        const { provider_id } = request.params;

        const listProviderDayAvailabilityService = container.resolve(
            ListProviderDayAvailabilityService,
        );

        const providers = await listProviderDayAvailabilityService.execute({
            provider_id,
            month,
            year,
            day,
        });

        return response.json(providers);
    }
}
