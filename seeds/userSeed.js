const { User } = require('../models');

const userData = [
    {
        username: 'JohnSmith',
        password: 'password1'
    },
    {
        username: 'Pocahontas',
        password: 'password2'
    },
    {
        username: 'Meeko',
        password: 'password3'
    },
    {
        username: 'GrandmotherWillow',
        password: 'password4'
    },
];

const userSeed = () => User.bulkCreate(userData);

module.exports = userSeed;