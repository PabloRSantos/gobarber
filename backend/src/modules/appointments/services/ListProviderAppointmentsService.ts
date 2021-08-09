import { inject, injectable } from 'tsyringe';
import { Appointment } from '../infra/typeorm/entities/Appointment';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

interface Request {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

@injectable()
class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    async execute({
        provider_id,
        year,
        month,
        day,
    }: Request): Promise<Appointment[]> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            {
                provider_id,
                month,
                year,
                day,
            },
        );

        return appointments;
    }
}

export { ListProviderAppointmentsService };
