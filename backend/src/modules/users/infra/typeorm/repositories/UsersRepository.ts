import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { Repository, getRepository } from 'typeorm';
import { User } from '../entities/User';

export class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    findByEmail(email: string): Promise<User | undefined> {
        return this.ormRepository.findOne({ email });
    }

    findById(id: string): Promise<User | undefined> {
        return this.ormRepository.findOne({ id });
    }

    create(data: ICreateUserDTO): User {
        return this.ormRepository.create(data);
    }

    save(data: User): Promise<User> {
        return this.ormRepository.save(data);
    }
}
