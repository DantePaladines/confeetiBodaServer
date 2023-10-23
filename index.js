const { serverUno } = require("./src/App.js")
const { conn } = require("./src/db.js")

const PORT = 3001

conn.authenticate()
.then(() => {
    console.log("database autenticado")
})

.catch((error) => {
    console.log(error.message)
})

conn.sync({force : false, alert : true}).then(() => {
    serverUno.listen(PORT, (req, res) => {
        try {
            console.log(`Ejecutando en el Local ${PORT}`)
        } catch (error) {
            console.log(error)
        }
    })
})
.catch((error) => {
    console.log(error)
})

//ngxfnzgudmaoxkoh