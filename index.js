const { serverUno } = require("./src/App.js")
const { conn } = require("./src/db.js")

const PORT = 3001


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