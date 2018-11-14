import { Router } from 'express';
import swaggerSpec from './utils/swagger';
// Api routes
import userRoutes from './api/users/users.route';

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api/swagger.json
 */
router.get('/swagger.json', (req, res) => {
    res.json(swaggerSpec);
});

/**
 * GET /api
 */
router.get('/', (req, res) => {
    res.json({
        app: req.app.locals.title,
        apiVersion: req.app.locals.version
    });
});

// users
router.use('/users', userRoutes);

export default router;
