const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("UserBossAdmin", {
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
        bossAdmin : {
            type : DataTypes.BOOLEAN,
            allownull : false
        }
    }, {
        timestamps : false
    });
}