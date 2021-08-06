import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({ user_id }: Request): Promise<User[]> {
        const users = await this.usersRepository.findAllProviders({
            except_user_id: user_id,
        });

        return users;
    }
}

export { ListProvidersService };
