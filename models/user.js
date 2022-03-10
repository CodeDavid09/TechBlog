const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/index');
const bcrypt = require('bcrypt');

// create  User model
class User extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}


User.init(
    {
        // define id 
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // define username 
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        // define password 
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // the password must be at least 4-8 characters long
                len: [4, 8]
            }
        }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;

            },
            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },

        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'user'
    }
);

module.exports = User;