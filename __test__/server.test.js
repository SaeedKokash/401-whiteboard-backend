'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest( server.app );

describe( 'API server', () => {

    test( 'Server not working', async () => {
        const res = await request.get( '/invalid' );
        expect( res.status ).toEqual( 404 );
    } );

    test('Server Works', async () => {
        const res = await request.get('/');
        expect(res.status).toEqual(200);
        expect(res.text).toEqual('Home Page')
    })

})