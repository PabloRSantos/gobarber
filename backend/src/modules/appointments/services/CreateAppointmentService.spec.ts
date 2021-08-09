import { AppError } from '@shared/errors/AppError';
import { FakeAppointmentsRepository } from '../repositories/fakes/FakeAppointmentsRepository';
import { CreateAppointmentService } from './CreateAppointmentService';

let createAppointmentService: CreateAppointmentService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointmentService = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            new Date(2020, 4, 10, 12).getTime(),
        );

        const appointment = await createAppointmentService.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: 'provider_id',
            user_id: 'user_id',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider_id');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date(2020, 4, 10, 13);

        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            new Date(2020, 4, 10, 12).getTime(),
        );

        await createAppointmentService.execute({
            date: appointmentDate,
            provider_id: 'provider_id',
            user_id: 'user_id',
        });

        const appointment = createAppointmentService.execute({
            date: appointmentDate,
            provider_id: 'provider_id',
            user_id: 'user_id',
        });

        await expect(appointment).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            new Date(2020, 4, 10, 12).getTime(),
        );

        const appointment = createAppointmentService.execute({
            date: new Date(2020, 4, 10, 11),
            provider_id: 'provider_id',
            user_id: 'user_id',
        });

        await expect(appointment).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            new Date(2020, 4, 10, 12).getTime(),
        );

        const appointment = createAppointmentService.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: 'user_id',
            user_id: 'user_id',
        });

        await expect(appointment).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            new Date(2020, 4, 10, 12).getTime(),
        );

        const appointmentBeforeTime = createAppointmentService.execute({
            date: new Date(2020, 4, 11, 7),
            provider_id: 'provider_id',
            user_id: 'user_id',
        });

        const appointmentAfterTime = createAppointmentService.execute({
            date: new Date(2020, 4, 11, 18),
            provider_id: 'provider_id',
            user_id: 'user_id',
        });

        await expect(appointmentBeforeTime).rejects.toBeInstanceOf(AppError);
        await expect(appointmentAfterTime).rejects.toBeInstanceOf(AppError);
    });
});
