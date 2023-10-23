const {Sequelize} = require("sequelize")
const fs = require('fs');
const path = require('path');

const { development, production } = require("./config/configDataBase")
//const sequelize = new Sequelize( `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/eventoboda` , {
//  logging: false, // set to console.log to see the raw SQL queries
//  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//})

//const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//  host : DB_HOST,
//  dialect : "mysql",
//  port : 3306
//})

//const sequelize = new Sequelize('confeeti_eventoboda', 'confeeti_wendding', '7506Mub$', {
//  host: 'localhost',  // or host: '127.0.0.1'
//  dialect : "mysql",
//  operatorAlias:false,
//  logging:false,
//  port : 3306,
//  set : "utf8"
//})

const sequelize = new Sequelize({
  database : production.dbName || development.dbName,
  username : production.user || development.user,
  password : production.password || development.password,
  host: production.host || development.host,
  dialect : production.dialect || development.dialect,
  port : production.port || development.port,
})

//wepanel_confeeti

//const sequelize = new Sequelize({
//  dialect: 'mysql',
//  host: 'localhost',
//  username: 'confeeti_wendding',
//  password: '7506Mub$',
//  database: 'confeeti_eventoboda',
//  logging: false,
//});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models  DANTE LE GUSTA COMER ELEFANTES Y A DONA ROSITA Y TODAVIA SE HACE EL LOCO> DE ESO SI LO PUEDO ASEGURAR, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Response, UserAdmin, UserBossAdmin } = sequelize.models

console.log(sequelize.models)


module.exports = {
    conn : sequelize,
    Response,
    UserAdmin,
    UserBossAdmin,
    ...sequelize.models
}