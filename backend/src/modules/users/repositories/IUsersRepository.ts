import { IFindAllProvidersDTO } from '@modules/appointments/dtos/IFindAllProvidersDTO';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface IUsersRepository {
    findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): User;
    save(data: User): Promise<User>;
}
