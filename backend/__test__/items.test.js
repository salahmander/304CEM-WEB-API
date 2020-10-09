const items = require('../models/items/items')

const connData = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'classifiedads'
};

describe('getAll', () => {
    test('retrieving all items with no error', done => {
        items.getAll(connData, (err) => {
            expect(err).toBeNull()
            done()
        })
    })

    test('check if items are being retrieved', done => {
        items.getAll(connData, (err, computerData) => {
            expect(computerData.length).toBeGreaterThan(1)
            done()
        })
    })
})

describe('add', () => {

    const itemData = {
        userID: 1,
        title: "testing title",
        description: "A short description for the purpose of a test",
        location: "NN4 5BQ",
        condition: "New",
        image: "test image",
        mobile: "07485621456",
        price: 5000
    }

    const wrongItemData = {
        userID: undefined,
        title: undefined,
        description: undefined,
        location: undefined,
        condition: undefined,
        image: undefined,
        mobile: undefined,
        price: undefined
    }

    const correctItemData = {
        userID: 1,
        title: "testing title",
        description: "A short description for the purpose of a test",
        location: "NN4 5BQ",
        condition: "New",
        image: "test image",
        mobile: "07485621456",
        price: 5000
    }

    test('add item with no error', done => {
        items.add(connData, itemData, (err) => {
            expect(err).toBeNull()
            done()
        })
    })

    test('check if item has been added', done => {
        items.add(connData, itemData, (err, result) => {
            expect(result.protocol41).toBeTruthy()
            expect(result.changedRows).toEqual(0)
            expect(result.affectedRows).toBe(1)
            done()
        })
    })

    test('itemData can not contain undefined', done => {
        items.add(connData, itemData, () => {
            expect(itemData).not.toBe(wrongItemData)
            done()
        })
    })

    test('itemData must contain items', done => {
        items.add(connData, itemData, () => {
            expect(itemData).toEqual(correctItemData)
            done()
        })
    })
})