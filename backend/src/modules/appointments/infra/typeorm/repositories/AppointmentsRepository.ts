import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { IFindAllInDayFromProviderDTO } from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import { IFindAllInMonthFromProviderDTO } from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';
import { getRepository, Raw, Repository } from 'typeorm';
import { Appointment } from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    async findAllInDayFromProvider({
        provider_id,
        month,
        year,
        day,
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        // alternative way
        // const startOfDayDate = startOfDay(new Date(year, month, day));
        // const endOfDayDate = endOfDay(new Date(year, month, day));

        const parsedMonth = String(month).padStart(2, '0');
        const parsedDay = String(day).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                // date: Between(startOfDayDate, endOfDayDate),
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
                ),
            },
            relations: ['user'],
        });

        return appointments;
    }

    async findAllInMonthFromProvider({
        provider_id,
        month,
        year,
    }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        // alternative way
        // const startOfMonthDate = startOfMonth(new Date(year, month));
        // const endOfMonthDate = endOfMonth(new Date(year, month));

        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            provider_id,
            // date: Between(startOfMonthDate, endOfMonthDate),
            date: Raw(
                dateFieldName =>
                    `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
            ),
        });

        return appointments;
    }

    async findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date, provider_id },
        });

        return findAppointment;
    }

    create(data: ICreateAppointmentDTO): Appointment {
        return this.ormRepository.create(data);
    }

    save(data: Appointment): Promise<Appointment> {
        return this.ormRepository.save(data);
    }
}

export { AppointmentsRepository };
