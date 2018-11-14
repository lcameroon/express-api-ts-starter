import bookshelf from '../../db';

const TABLE_NAME = 'users';

interface IUser {
    name: string;
}
/**
 * User model.
 */
class User extends bookshelf.Model<any> {
    get tableName() {
        return TABLE_NAME;
    }

    get hasTimestamps() {
        return true;
    }
}

export default User;
