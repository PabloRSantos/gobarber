import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import provider from 'tsyringe/dist/typings/providers/provider';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { Appointment } from '../infra/typeorm/entities/Appointment';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    async execute({
        date,
        provider_id,
        user_id,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError(
                "You can't create an appointmente on a past date",
            );
        }

        if (user_id === provider_id) {
            throw new AppError(
                "You can't create an appointment with yourself'",
            );
        }

        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError(
                'You can only cfreate appoiments between 8am and 5pm',
            );
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
            provider_id,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });

        const dateFormatted = format(
            appointmentDate,
            "dd/MM/yyyy '??s' HH:mm'h'",
        );

        const notification = this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para dia ${dateFormatted}`,
        });
        await this.notificationsRepository.save(notification);

        await this.cacheProvider.invalidate(
            `provider-appointments:${provider_id}:${format(
                appointmentDate,
                'yyyy-M-d',
            )}`,
        );

        return this.appointmentsRepository.save(appointment);
    }
}

export { CreateAppointmentService };
