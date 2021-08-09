import { ICreateNotificationDTO } from '@modules/notifications/dtos/ICreateNotificationDTO';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { Notification } from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
    private ormRepository: MongoRepository<Notification>;

    constructor() {
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    create(data: ICreateNotificationDTO): Notification {
        return this.ormRepository.create(data);
    }

    save(data: Notification): Promise<Notification> {
        return this.ormRepository.save(data);
    }
}

export { NotificationsRepository };
