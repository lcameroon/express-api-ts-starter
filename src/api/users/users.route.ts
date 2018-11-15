import { Router } from 'express';
import { UserController } from './users.controller';
import { findUser, userValidator } from './users.validator';

const router = Router();

/**
 * GET /api/users
 */
router.get('/', UserController.getAll);

/**
 * GET /api/users/:id
 */
router.get('/:id', UserController.getById);

/**
 * POST /api/users
 */
router.post('/', userValidator, UserController.create);

/**
 * PUT /api/users/:id
 */
router.put('/:id', findUser, userValidator, UserController.update);

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', findUser, UserController.deleteById);

export default router;
