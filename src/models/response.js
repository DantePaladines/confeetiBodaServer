const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('response', {
        accept : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        },
        numberGuests: {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        nameGuests:{
            type : DataTypes.STRING,
            allowNull : false
        },
        allergies : {
            type : DataTypes.STRING,
            allowNull : false
        },
        meatDishes : {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        chickenDishes : {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        fishDishes : {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        phone : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false
        }
    }, {
        timestamps : false
    })
}