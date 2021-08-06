import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';
import { IUserTokensRepository } from '../IUserTokensRepository';

export class FakeUserTokensRepository implements IUserTokensRepository {
    private userTokens: UserToken[] = [];

    async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id,
            created_at: new Date(),
            updated_at: new Date(),
        });

        this.userTokens.push(userToken);

        return userToken;
    }

    async findByToken(token: string): Promise<UserToken | undefined> {
        return this.userTokens.find(userToken => userToken.token === token);
    }
}
