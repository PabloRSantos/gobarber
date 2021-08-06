import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';
import { UserToken } from '../entities/UserToken';

export class UserTokensRepository implements IUserTokensRepository {
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    generate(user_id: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({
            user_id,
        });

        return this.ormRepository.save(userToken);
    }

    findByToken(token: string): Promise<UserToken | undefined> {
        return this.ormRepository.findOne({ token });
    }
}
