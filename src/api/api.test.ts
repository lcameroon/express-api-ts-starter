import { expect } from 'chai';
import * as request from 'supertest';

import app from '../index';

describe('Base API Test', () => {
    it('should return API version and title for the app', done => {
        request(app).get('/api').end((err: any, res: any) => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.body.app).to.be.equal(app.locals.title);
            expect(res.body.apiVersion).to.be.equal(app.locals.version);

            done();
        });
    });

    it('should return 405 method not allowed for invalid API hits', done => {
        request(app).get(`/api/invalid-endpoint`).end((err: any, res: any) => {
            expect(res.statusCode).to.be.equal(405);
            expect(res.body.error.code).to.be.equal(405);
            expect(res.body.error.message).to.be.equal('Method Not Allowed');

            done();
        });
    });
});
