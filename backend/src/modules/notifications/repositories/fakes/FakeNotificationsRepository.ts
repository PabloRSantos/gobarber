import { ICreateNotificationDTO } from '@modules/notifications/dtos/ICreateNotificationDTO';
import { Notification } from '@modules/notifications/infra/typeorm/schemas/Notification';
import { ObjectId } from 'mongodb';
import { INotificationsRepository } from '../INotificationsRepository';

class FakeNotificationsRepository implements INotificationsRepository {
    private notifications: Notification[] = [];

    create(data: ICreateNotificationDTO): Notification {
        const notification = new Notification();

        Object.assign(notification, data, { id: new ObjectId() });

        this.notifications.push(notification);

        return notification;
    }

    async save(data: Notification): Promise<Notification> {
        const findIndex = this.notifications.findIndex(
            notification => notification.id === data.id,
        );

        this.notifications[findIndex] = data;

        return data;
    }
}

export { FakeNotificationsRepository };
