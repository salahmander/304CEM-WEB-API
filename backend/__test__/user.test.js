const user = require('../models/user/user')

const userData = {
    firstName: "Salahtest",
    surname: "Abdotest",
    email: "abdostest@uni.coventry.ac.uk",
    username: "abdostest",
    password: "Password01."
}

const wrongUserData = {
    firstName: undefined,
    surname: undefined,
    email: undefined,
    username: undefined,
    password: undefined
}

const correctUserData = {
    firstName: "Salahtest",
    surname: "Abdotest",
    email: "abdostest@uni.coventry.ac.uk",
    username: "abdostest",
    password: "Password01."
}


describe('database connection', () => {
    const connData = {
        host: 'localhost',
        user: 'root',
        password: 'wrong',
        database: 'classifiedads'
    };

    test('Trying to add user with incorrect database data', done => {
        user.add(connData, userData, (err) => {
            expect(err.message.length).toBeGreaterThan(1)
            done()
        })
    })

    test('Trying to get all user with incorrect database data', done => {
        user.getAll(connData, (err) => {
            expect(err.message.length).toBeGreaterThan(1)
            done()
        })
    })

})

describe('add', () => {
    const connData = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'classifiedads'
    };

    test('add a new user without any errors', done => {
        user.add(connData, userData, (err) => {
            expect(err).toBeNull()
            done()
        })
    })

    test('check if user has been added', done => {
        user.add(connData, userData, (err, result) => {
            expect(result.protocol41).toBeTruthy()
            expect(result.changedRows).toEqual(0)
            expect(result.affectedRows).toBe(1)
            done()
        })
    })

    test('user can not contain undefined', done => {
        user.add(connData, userData, () => {
            expect(userData).not.toBe(wrongUserData)
            done()
        })
    })

    test('userData must contain user information', done => {
        user.add(connData, userData, () => {
            expect(userData).toEqual(correctUserData)
            done()
        })
    })
})

