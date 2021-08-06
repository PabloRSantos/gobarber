import { IFindAllProvidersDTO } from '@modules/appointments/dtos/IFindAllProvidersDTO';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';
import { IUsersRepository } from '../IUsersRepository';

export class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    async findAllProviders({
        except_user_id,
    }: IFindAllProvidersDTO): Promise<User[]> {
        let { users } = this;

        if (except_user_id) {
            users = this.users.filter(user => user.id !== except_user_id);
        }

        return users;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    async findById(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }

    create(data: ICreateUserDTO): User {
        const newUser = new User();

        Object.assign(newUser, data, { id: uuid() });

        this.users.push(newUser);

        return newUser;
    }

    async save(data: User): Promise<User> {
        const findIndex = this.users.findIndex(user => user.id === data.id);

        this.users[findIndex] = data;

        return data;
    }
}
