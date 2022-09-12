'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest( server.app );
// jest.setTimeout(10000);

describe( 'Testing /post Routes', () => {

    test( 'getting all posts', async () => {
        const res = await request.get( '/post' );
        expect( res.status ).toEqual( 200 );
    } );

    test('getting one post', async () => {
        const id = 6;
        const res = await request.get(`/post/${id}`);
        expect(res.status).toEqual(200);
    })

    test('creating a post', async () => {
        const res = await request.post('/post').send({
            postTitle: 'test',
            postContent: 'test'
        });
        expect(res.status).toEqual(201);
    })

    test('updating a post', async () => {
        const id = 7;
        const res = await request.put(`/post/${id}`).send({
            postTitle: 'updated test',
            postContent: 'test updated'
        });
        expect(res.status).toEqual(200);
    })

    test('deleting a post', async () => {
        const id = 11;
        const res = await request.delete(`/post/${id}`);
        expect(res.status).toEqual(204);
    })

})
