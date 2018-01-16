const chai = require('chai');
const assert = chai.assert;
const objectifier = require('../src/objectifyQueryString.js');

describe('ObjectifyQueryString', () => {
    describe('objectify', () => {
        it('converts correctly formatted key/value pairs', () => {
            const queryString = '?name=dan&city=seattle&neighborhood=beacon&height=tall';

            assert.deepEqual(objectifier.objectify(queryString), {
                city: 'seattle',
                height: 'tall',
                name: 'dan',
                neighborhood: 'beacon'
            });
        });

        it('converts key/value pairs with missing values', () => {
            const queryString = '?name=&city=seattle&neighborhood=&height=tall';

            assert.deepEqual(objectifier.objectify(queryString), {
                city: 'seattle',
                height: 'tall',
                name: '',
                neighborhood: ''
            });
        });

        it('does not convert key/value pairs with missing keys', () => {
            const queryString = '?name=dan&=seattle&neighborhood=beacon&=tall';

            assert.deepEqual(objectifier.objectify(queryString), {
                name: 'dan',
                neighborhood: 'beacon'
            });
        });

        it('creates an array in the case of duplicate keys', () => {
            const queryString = '?name=dan&city=seattle&name=john&neighborhood=beacon&height=tall&neighborhood=columbia&neighborhood=capitol';

            assert.deepEqual(objectifier.objectify(queryString), {
                city: 'seattle',
                height: 'tall',
                name: ['dan', 'john'],
                neighborhood: ['beacon', 'columbia', 'capitol']
            });
        });

        it('converts query strings with erroneous ampersands', () => {
            const queryString = '?name=dan&&city=seattle&neighborhood=beacon&&&height=tall';

            assert.deepEqual(objectifier.objectify(queryString), {
                city: 'seattle',
                height: 'tall',
                name: 'dan',
                neighborhood: 'beacon'
            });
        });
    });
});