import { getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

interface Request {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    async execute({
        provider_id,
        year,
        month,
        day,
    }: Request): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            {
                provider_id,
                month,
                year,
                day,
            },
        );

        const hourStart = 8;
        const eachHourArray = Array.from(
            { length: 10 },
            (_, index) => hourStart + index,
        );

        const availability = eachHourArray.map(hour => {
            const hasAppointmentInHour = appointments.find(
                appointment => getHours(appointment.date) === hour,
            );

            return {
                hour,
                available: !hasAppointmentInHour,
            };
        });

        return availability;
    }
}

export { ListProviderDayAvailabilityService };
