import * as path from 'path';
import * as request from 'supertest';
import { Uma, IResponse } from '@umajs/core';

import { Router } from '../../../src/index';

const uma = Uma.instance({
    Router,
    ROOT: path.join(__dirname, '../app'),
});

export const start = () => new Promise((resolve, reject) => {
    uma.start(8053, (e) => {
        if (e) return reject();
        resolve(null);
    });
});

export const stop = () => new Promise((resolve, reject) => {
    uma.server.close((e) => {
        if (e) return reject();
        resolve(null);
    });
});

export const send = (path: string): any => new Promise((resolve, reject) => {
    request(uma.app.callback())
        .get(path)
        .end((err: Error, res: IResponse) => {
            if (err) reject(err);
            resolve(res);
        });
});

export const post = (path: string, data?: Object): any => new Promise((resolve, reject) => {
    request(uma.app.callback())
        .post(path)
        .send(data)
        .end((err: Error, res: Response) => {
            if (err) reject(err);
            resolve(res);
        });
});
