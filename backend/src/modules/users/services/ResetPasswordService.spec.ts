import { AppError } from '@shared/errors/AppError';
import { addHours } from 'date-fns';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { FakeUserTokensRepository } from '../repositories/fakes/FakeUserTokensRepository';
import { ResetPasswordService } from './ResetPasswordService';

let resetPasswordService: ResetPasswordService;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
const userData = {
    name: 'John Doe',
    password: '1234',
    email: 'jondow@example.com',
};

describe('ResetPassword', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();
        resetPasswordService = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository,
            fakeHashProvider,
        );
    });

    it('should be able to reset the password', async () => {
        const user = fakeUsersRepository.create(userData);
        const userToken = await fakeUserTokensRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPasswordService.execute({
            token: userToken.token,
            password: '123123',
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updatedUser?.password).toBe('123123');
    });

    it('should not be able to reset password with non-existing token', async () => {
        const resetPassword = resetPasswordService.execute({
            token: 'non-existing-token',
            password: '123123',
        });

        await expect(resetPassword).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password with non-existing user', async () => {
        const userToken = await fakeUserTokensRepository.generate(
            'non-existing-user',
        );

        const resetPassword = resetPasswordService.execute({
            token: userToken.token,
            password: '123123',
        });

        await expect(resetPassword).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password if passed more than 2 hours', async () => {
        const user = fakeUsersRepository.create(userData);
        const userToken = await fakeUserTokensRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            addHours(new Date(), 3).getTime(),
        );

        const resetPassword = resetPasswordService.execute({
            token: userToken.token,
            password: '123123',
        });

        await expect(resetPassword).rejects.toBeInstanceOf(AppError);
    });
});
