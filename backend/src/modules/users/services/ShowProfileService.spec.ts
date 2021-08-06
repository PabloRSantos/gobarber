import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { ShowProfileService } from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        showProfileService = new ShowProfileService(fakeUsersRepository);
    });

    it('should be able to show profile', async () => {
        const user = fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123',
        });

        const profile = await showProfileService.execute({
            user_id: user.id,
        });

        expect(profile).toMatchObject({
            name: 'John Doe',
            email: 'johndoe@example.com',
        });
    });

    it('should not be able to show profile from non-existing user', async () => {
        const profile = showProfileService.execute({
            user_id: 'non-existing-user',
        });

        await expect(profile).rejects.toBeInstanceOf(AppError);
    });
});
