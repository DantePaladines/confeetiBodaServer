require("dotenv").config()

const { 
    DB_USER, 
    DB_PASSWORD, 
    DB_HOST, 
    DB_NAME,
    DB_PORT,
    DB_USER_DEVELOPMENT,
    DB_PASSWORD_DEVELOPMENT,
    DB_HOST_DEVELOPMENT,
    DB_NAME_DEVELOPMENT,
    DB_PORT_DEVELOPMENT
} = process.env


module.exports = {
    development : {
        user : DB_USER_DEVELOPMENT,
        password : DB_PASSWORD_DEVELOPMENT,
        host : DB_HOST_DEVELOPMENT,
        dbName : DB_NAME_DEVELOPMENT,
        dialect : "mysql",
        port : DB_PORT_DEVELOPMENT
    },
    production : {
        user : DB_USER,
        password : DB_PASSWORD,
        host : DB_HOST,
        dbName : DB_NAME,
        dialect : "mysql",
        port : DB_PORT
    }
}