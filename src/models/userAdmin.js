const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("UserAdmin", {
        name : {
            type : DataTypes.STRING,
            allownull : false
        },
        lastName : {
            type : DataTypes.STRING,
            allownull : false
        },
        email : {
            type : DataTypes.STRING,
            allownull : false
        },
        password : {
            type : DataTypes.STRING,
            allownull : false
        },
        admin : {
            type : DataTypes.BOOLEAN,
            allownull : false
        }
    }, {
        timestamps : false
    });
}