import bookshelf from '../../db';

const TABLE_NAME = 'users';

export interface IUser {
    id?: number | string;
    name: string;
}
/**
 * User model.
 */
class User extends bookshelf.Model<User> {
    get tableName() {
        return TABLE_NAME;
    }

    get hasTimestamps() {
        return true;
    }
}

export default User;
