import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { FakeTokenProvider } from '../providers/TokenProvider/fakes/FakeTokenProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { AuthenticateUserService } from './AuthenticateUserService';

let authenticateUserService: AuthenticateUserService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeTokenProvider: FakeTokenProvider;
const userData = {
    name: 'John Doe',
    password: '1234',
    email: 'jondow@example.com',
};

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeTokenProvider = new FakeTokenProvider();
        authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeTokenProvider,
        );
    });

    it('should be able to authenticate', async () => {
        const user = fakeUsersRepository.create(userData);

        const authenticateUser = await authenticateUserService.execute({
            email: userData.email,
            password: userData.password,
        });

        expect(authenticateUser).toHaveProperty('token');
        expect(authenticateUser.user).toEqual(user);
    });
});
