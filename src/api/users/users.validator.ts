import Joi from 'joi';
import validate from '../../utils/validate';
import * as userService from './users.service';

const SCHEMA = {
    name: Joi.string().label('Name').max(90).required()
};

/**
 * Validate create/update user request.
 *
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 * @return {Promise}
 */
function userValidator(req, res, next){
    return validate(req.body, SCHEMA).then(() => next()).catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 * @return {Promise}
 */
function findUser(req, res, next){
    return userService.getUser(req.params.id).then(() => next()).catch(err => next(err));
}

export { findUser, userValidator };
