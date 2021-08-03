import { IHashProvider } from '../models/IHashProvider';

export class FakeHashProvider implements IHashProvider {
    async generateHash(payload: string): Promise<string> {
        return payload;
    }

    async compareHash(payload: string, hashed: string): Promise<boolean> {
        return payload === hashed;
    }
}
