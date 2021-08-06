import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { FakeUserTokensRepository } from '../repositories/fakes/FakeUserTokensRepository';
import { SendForgotPasswordEmailService } from './SendForgotPasswordEmailService';

let sendForgotPasswordEmailService: SendForgotPasswordEmailService;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
const userData = {
    name: 'John Doe',
    password: '1234',
    email: 'jondow@example.com',
};

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );
    });

    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        fakeUsersRepository.create(userData);

        await sendForgotPasswordEmailService.execute({
            email: userData.email,
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing user password', async () => {
        const sendForgotPassswordEmail = sendForgotPasswordEmailService.execute(
            {
                email: userData.email,
            },
        );

        await expect(sendForgotPassswordEmail).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = fakeUsersRepository.create(userData);
        await sendForgotPasswordEmailService.execute({
            email: user.email,
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
