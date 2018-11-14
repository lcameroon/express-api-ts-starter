import Boom from 'boom';
import User from './users.model';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllUsers(): any{
    return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUser(id): any{
    return new User({ id }).fetch().then(user => {
        if (!user) {
            throw Boom.notFound('User not found');
        }

        return user;
    });
}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function createUser(user): any{
    return new User({ name: user.name }).save();
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
export function updateUser(id, user): any{
    return new User({ id }).save({ name: user.name });
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteUser(id): any{
    return new User({ id }).fetch().then(user => user.destroy());
}
