const sequelize = require("../config/index");

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");


    process.exit(0);
};

seedAll();
