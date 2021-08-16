import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { IFindAllInDayFromProviderDTO } from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import { IFindAllInMonthFromProviderDTO } from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import { Appointment } from '@modules/appointments/infra/typeorm/entities/Appointment';
import { isEqual, getYear, getMonth, getDate } from 'date-fns';
import { uuid } from 'uuidv4';
import { IAppointmentsRepository } from '../IAppointmentsRepository';

export class FakeAppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    async findAllInDayFromProvider({
        provider_id,
        month,
        year,
        day,
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        return this.appointments.filter(
            appointment =>
                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year,
        );
    }

    async findAllInMonthFromProvider({
        provider_id,
        month,
        year,
    }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        return this.appointments.filter(
            appointment =>
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year,
        );
    }

    async findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined> {
        return this.appointments.find(
            appointment =>
                isEqual(appointment.date, date) &&
                appointment.provider_id === provider_id,
        );
    }

    create(data: ICreateAppointmentDTO): Appointment {
        const appointment = new Appointment();

        Object.assign(appointment, data, { id: uuid() });

        this.appointments.push(appointment);

        return appointment;
    }

    async save(data: Appointment): Promise<Appointment> {
        const findIndex = this.appointments.findIndex(
            appointment => appointment.id === data.id,
        );

        this.appointments[findIndex] = data;

        return data;
    }
}
