import { Request, Response, NextFunction, Errback } from 'express';
import * as HttpStatus from 'http-status-codes';

import { IUser } from './users.model';
import { UserService } from './users.service';

export class UserController {
    static getAll(req: Request, res: Response, next: NextFunction) {
        return UserService.fetchAll()
            .then((data: IUser[]) => res.json({ data }))
            .catch((err: Errback) => next(err));
    }

    static getById(req: Request, res: Response, next: NextFunction) {
        return UserService.getById(req.params.id)
            .then((data: IUser) => res.json({ data }))
            .catch((err: Errback) => next(err));
    }

    static create(req: Request, res: Response, next: NextFunction) {
        return UserService.create(req.body)
            .then((data: any) => res.status(HttpStatus.CREATED).json({ data }))
            .catch((err: Errback) => next(err));
    }

    static update(req: Request, res: Response, next: NextFunction) {
        return UserService.update(req.params.id, req.body)
            .then((data: any) => res.json({ data }))
            .catch((err: Errback) => next(err));
    }

    static deleteById(req: Request, res: Response, next: NextFunction) {
        return UserService.deleteById(req.params.id)
            .then((data: any) => res.status(HttpStatus.NO_CONTENT).json({ data }))
            .catch((err: Errback) => next(err));
    }
}
