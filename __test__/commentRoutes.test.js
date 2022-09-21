'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest( server.app );
// jest.setTimeout(10000);

describe( 'Testing /comment Routes', () => {

    test( 'getting all comments', async () => {
        const res = await request.get( '/comment' );
        expect( res.status ).toEqual( 200 );
    } );

    test('getting one comment', async () => {
        const id = 1;
        const res = await request.get(`/comment/${id}`);
        expect(res.status).toEqual(200);
    })

    // test('creating a comment', async () => {
    //     const id = 20;
    //     const res = await request.post(`/comment/${id}`).send({
    //         comment: 'creating a test comment through jest',
    //         postID: 3
    //     });
    //     expect(res.status).toEqual(201);
    // })

    test('updating a comment', async () => {
        const id = 2;
        const res = await request.put(`/comment/${id}`).send({
            comment: 'comment updated by testing',
            postID: 5
        });
        expect(res.status).toEqual(202);
    })

    test('deleting a comment', async () => {
        const id = 5;
        const res = await request.delete(`/comment/${id}`);
        expect(res.status).toEqual(204);
    })

})
