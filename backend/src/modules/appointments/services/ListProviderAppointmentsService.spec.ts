import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { FakeAppointmentsRepository } from '../repositories/fakes/FakeAppointmentsRepository';
import { ListProviderAppointmentsService } from './ListProviderAppointmentsService';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvailability', () => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    beforeEach(() => {
        listProviderAppointmentsService = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to list the apppintments on a specific day', async () => {
        const appointment1 = fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });

        const appointment2 = fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });

        const appointments = await listProviderAppointmentsService.execute({
            provider_id: 'provider',
            year: 2020,
            month: 5,
            day: 20,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
