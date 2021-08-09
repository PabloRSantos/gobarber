import { ICreateNotificationDTO } from '../dtos/ICreateNotificationDTO';
import { Notification } from '../infra/typeorm/schemas/Notification';

export interface INotificationsRepository {
    create(data: ICreateNotificationDTO): Notification;
    save(data: Notification): Promise<Notification>;
}
