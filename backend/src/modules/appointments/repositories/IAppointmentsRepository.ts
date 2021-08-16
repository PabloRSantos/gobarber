import { ICreateAppointmentDTO } from '../dtos/ICreateAppointmentDTO';
import { IFindAllInDayFromProviderDTO } from '../dtos/IFindAllInDayFromProviderDTO';
import { IFindAllInMonthFromProviderDTO } from '../dtos/IFindAllInMonthFromProviderDTO';
import { Appointment } from '../infra/typeorm/entities/Appointment';

export interface IAppointmentsRepository {
    findAllInMonthFromProvider(
        date: IFindAllInMonthFromProviderDTO,
    ): Promise<Appointment[]>;
    findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined>;
    findAllInDayFromProvider(
        data: IFindAllInDayFromProviderDTO,
    ): Promise<Appointment[]>;
    create(data: ICreateAppointmentDTO): Appointment;
    save(data: Appointment): Promise<Appointment>;
}
