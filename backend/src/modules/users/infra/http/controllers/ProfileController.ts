import { ShowProfileService } from '@modules/users/services/ShowProfileService';
import { UpdateProfileService } from '@modules/users/services/UpdateProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export class ProfileController {
    async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const showProfileService = container.resolve(ShowProfileService);

        const user = await showProfileService.execute({
            user_id,
        });

        return response.json(classToClass(user));
    }

    async update(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, old_password, password } = request.body;

        const updateProfileService = container.resolve(UpdateProfileService);

        const user = await updateProfileService.execute({
            user_id,
            name,
            email,
            old_password,
            password,
        });

        return response.json(classToClass(user));
    }
}
