import { UpdateProfileService } from '@modules/users/services/UpdateProfileService';
import { AppError } from '@shared/errors/AppError';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeHashProvider = new FakeHashProvider();
        fakeUsersRepository = new FakeUsersRepository();

        updateProfileService = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update profile', async () => {
        const user = fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'fulano de tal',
            email: 'fulaninho@example.com',
        });

        expect(updatedUser).toMatchObject({
            name: 'fulano de tal',
            email: 'fulaninho@example.com',
        });
    });

    it('should not be able to update a non-existing user', async () => {
        await expect(
            updateProfileService.execute({
                user_id: 'talcoisa',
                name: 'fulano de tal',
                email: 'fulaninho@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to change to another user email', async () => {
        const user = fakeUsersRepository.create({
            name: 'Fulano',
            email: 'fulano@example.com',
            password: '123123',
        });

        fakeUsersRepository.create({
            name: 'Cicrano',
            email: 'cicrano@example.com',
            password: '123123',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'Beltrano',
                email: 'cicrano@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'Fulano',
            email: 'fulano@example.com',
            old_password: '123123',
            password: '321321',
        });

        expect(updatedUser?.password).toBe('321321');
    });

    it('should not be able to update the password without the old password', async () => {
        const user = fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'Fulano',
                email: 'fulano@example.com',
                password: '321321',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password if the old password is wrong', async () => {
        const user = fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'Fulano',
                email: 'fulano@example.com',
                old_password: '111111',
                password: '321321',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
