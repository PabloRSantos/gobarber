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
        const appointment = await createAppointmentService.execute({
            date: new Date(),
            provider_id: '1232131',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('1232131');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date();

        await createAppointmentService.execute({
            date: appointmentDate,
            provider_id: '1232131',
        });

        const appointment = createAppointmentService.execute({
            date: appointmentDate,
            provider_id: '1232131',
        });

        await expect(appointment).rejects.toBeInstanceOf(AppError);
    });
});
