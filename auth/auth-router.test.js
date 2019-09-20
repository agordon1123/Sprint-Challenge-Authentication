const request = require('supertest');
const db = require('../database/dbConfig');
const Users = require('./auth-model');
const server = require('../api/server');

describe('router', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('POST /register', () => {
        it('returns 201 status', () => {
            const body = { username: "test", password: "test" }

            return request(server).post('/api/auth/register').send(body).then(res => {
                expect(res.status).toBe(201)
            })
        })
        it('should return JSON', () => {
            const body = { username: "test", password: "test" }

            return request(server).post('/api/auth/register').send(body).then(res => {
                expect(res.type).toEqual('application/json')
            })
        })
    });

    describe('POST /login', () => {
        it('succesfully logs in a created user', () => {
            const body = { username: "test", password: "test" };

            request(server).post('/api/auth/register').send(body).then(() => {
                return request(server).post('/api/auth/login').send(body).then(res => {
                    expect(res.status).toBe(200);
                });                
            });

        });

        it('should return JSON', () => {
            const body = { username: "test", password: "test" };

            return request(server).post('/api/auth/login').send(body).then(res => {
                expect(res.type).toEqual('application/json')
            })
        })
    });
});
