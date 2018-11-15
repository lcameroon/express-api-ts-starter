import * as Boom from 'boom';
import { Response } from 'express';

import User, { IUser } from './users.model';

export class UserService {
    // fetchAll
    static fetchAll(): Promise<IUser[]> {
        return User.fetchAll();
    }

    // getById
    static getById(id: number | string): Promise<IUser> {
        return new User().set({ id }).fetch().then(user => {
            if (!user) {
                throw Boom.notFound('User not found');
            }
            return user;
        });
    }

    // create
    static create(user: IUser): Promise<Response> {
        return new User().set({ name: user.name }).save();
    }

    // update
    static update(id: number | string, user: IUser): Promise<Response> {
        return new User().set({ id }).save({ name: user.name }, { patch: true });
    }

    // deleteById
    static deleteById(id: number | string) {
        return new User().set({ id }).fetch().then(user => user.destroy());
    }
}
