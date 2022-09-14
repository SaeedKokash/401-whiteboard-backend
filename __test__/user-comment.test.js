'use strict';

const Collection = require( '../collections/user-comment-routes' );

describe('Test Collections', () => {

    it('create new instance from collection', () => {
        const newCollection = new Collection();
        expect(newCollection).toBeDefined();
    });

    it('testing each method', () => {
        const newCollection = new Collection();
        expect(newCollection.create).toBeDefined();
        expect(newCollection.read).toBeDefined();
        expect(newCollection.update).toBeDefined();
        expect(newCollection.delete).toBeDefined();
        expect(newCollection.readWithComments).toBeDefined();
        expect(newCollection.readOneWithComments).toBeDefined();
        });
});