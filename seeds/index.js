// require seeds paths
const userSeed = require('./commentSeed');
const postSeed = require('./postSeed');
const commentSeed = require('./userSeed');

const sequelize = require('../config/connection');

const seedAll = async() => {
    // force: true adds a DROP TABLE IF EXISTS before trying to create the table
    await sequelize.sync({ force: true });
    await userSeed();
    await postSeed();
    await commentSeed();
    process.exit(0);
};

seedAll();