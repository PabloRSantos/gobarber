import { IFindAllProvidersDTO } from '@modules/appointments/dtos/IFindAllProvidersDTO';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { Repository, getRepository, Not } from 'typeorm';
import { User } from '../entities/User';

export class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    async findAllProviders({
        except_user_id,
    }: IFindAllProvidersDTO): Promise<User[]> {
        let users: User[];

        if (except_user_id) {
            users = await this.ormRepository.find({
                where: {
                    id: Not(except_user_id),
                },
            });
        } else {
            users = await this.ormRepository.find();
        }

        return users;
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
