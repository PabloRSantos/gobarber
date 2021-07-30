import { ICreateAppointmentDTO } from '../dtos/ICreateAppointmentDTO';
import { Appointment } from '../infra/typeorm/entities/Appointment';

export interface IAppointmentsRepository {
    findByDate(date: Date): Promise<Appointment | undefined>;
    create(data: ICreateAppointmentDTO): Appointment;
    save(data: Appointment): Promise<Appointment>;
}
