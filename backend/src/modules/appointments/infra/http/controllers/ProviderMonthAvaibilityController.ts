import { ListProviderMonthAvailabilityService } from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ProviderMonthAvaibilityController {
    async index(request: Request, response: Response): Promise<Response> {
        const { month, year } = request.query;
        const { provider_id } = request.params;

        const listProviderMonthAvailabilityService = container.resolve(
            ListProviderMonthAvailabilityService,
        );

        const providers = await listProviderMonthAvailabilityService.execute({
            provider_id,
            month: Number(month),
            year: Number(year),
        });

        return response.json(providers);
    }
}
