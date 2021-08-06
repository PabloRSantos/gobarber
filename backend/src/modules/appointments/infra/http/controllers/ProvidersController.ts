import { ListProvidersService } from '@modules/appointments/services/ListProvidersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ProvidersController {
    async index(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const listProvidersService = container.resolve(ListProvidersService);

        const providers = await listProvidersService.execute({
            user_id,
        });

        return response.json(providers);
    }
}
