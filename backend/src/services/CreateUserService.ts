import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { User } from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, password, email }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new AppError('Email address already user by another', 400);
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return usersRepository.save(user);
    }
}

export { CreateUserService };
