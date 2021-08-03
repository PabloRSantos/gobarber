import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { Appointment } from '@modules/appointments/infra/typeorm/entities/Appointment';
import { isEqual } from 'date-fns';
import { uuid } from 'uuidv4';
import { IAppointmentsRepository } from '../IAppointmentsRepository';

export class FakeAppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    async findByDate(date: Date): Promise<Appointment | undefined> {
        return this.appointments.find(appointment =>
            isEqual(appointment.date, date),
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
