import { FakeStorageProvider } from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { UpdateUserAvatarService } from './UpdateUserAvatarService';

let updateUserAvatarService: UpdateUserAvatarService;
let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();
        updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );
    });

    it('should be able to update avatar', async () => {
        const user = fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: '1234',
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to update avatar from non existing user', async () => {
        const updatedUser = updateUserAvatarService.execute({
            user_id: 'non-existing-user',
            avatarFilename: 'avatar.jpg',
        });

        await expect(updatedUser).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updaating new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const user = fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: '1234',
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'avatar2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    });
});
