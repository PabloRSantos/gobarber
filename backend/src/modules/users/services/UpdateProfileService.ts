import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { User } from '../infra/typeorm/entities/User';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface Request {
    name: string;
    email: string;
    password?: string;
    old_password?: string;
    user_id: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    async execute({
        name,
        password,
        email,
        user_id,
        old_password,
    }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        user.name = name;
        user.email = email;

        if (password && !old_password) {
            throw new AppError(
                'You nedd to inform the old password to set a new password',
            );
        }

        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,
                user.password,
            );

            if (!checkOldPassword) {
                throw new AppError('Old password does not match');
            }

            user.password = await this.hashProvider.generateHash(password);
        }

        return this.usersRepository.save(user);
    }
}

export { UpdateProfileService };
