'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest( server.app );

describe('Testing user Routes', () => {

    // it('testing getting all users from /users without authentication', async () => {
    //     const res = await request.get( '/users' );
    //     expect( res.status ).toEqual( 500 );
    // });

    // can only be tested once
    // test('testing sign up a new user ', async () => {
    //     const res = await request.post( '/signup' ).send({
    //         userName: 'Testing Account',
    //         email: 'testing@testing.com',
    //         password: 'test'
    //     });
    //     expect(res.status).toEqual(201);
    // })

    test('testing sign up with an existing username', async () => {
        const res = await request.post( '/signup' ).send({
            userName: 'Testing Account',
            email: 'nottesting@testing.com',
            password: 'test'
        });
        expect(res.status).toEqual(409);
        expect(res.text).toEqual('Username already exists')
    })

    test('testing sign up with an existing email', async () => {
        const res = await request.post( '/signup' ).send({
            userName: 'not Testing Account',
            email: 'testing@testing.com',
            password: 'test'
        });
        expect(res.status).toEqual(409);
        expect(res.text).toEqual('Email already exists')
    })
    
});