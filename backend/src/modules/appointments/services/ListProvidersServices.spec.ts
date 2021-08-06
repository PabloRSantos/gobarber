import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { ListProvidersService } from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        listProvidersService = new ListProvidersService(fakeUsersRepository);
    });

    it('should be able to list the providers', async () => {
        const user1 = fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123',
        });
        const user2 = fakeUsersRepository.create({
            name: 'John Tre',
            email: 'johnTre@example.com',
            password: '123123',
        });
        const loggedUser = fakeUsersRepository.create({
            name: 'John Qua',
            email: 'johnqua@example.com',
            password: '123123',
        });

        const providers = await listProvidersService.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });
});
