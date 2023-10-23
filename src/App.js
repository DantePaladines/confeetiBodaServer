const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const http = require("http")
const { Server } = require("socket.io")
const server = express()
const cors = require("cors")
const Router = require("./routes/index.js")
const { Conexion } = require("../src/socket.js")
const { CreateBossUserAdmin } = require("./controllers/createBossUserAdmin.js")
const { firstUser, secondUser } = require("./BossAdmins/bossAdmins.js")

const serverUno = http.createServer(server)

//const io = SocketIo(serverUno)
server.use(express.json())
server.use(morgan("dev"))

server.use(cookieParser())

const local = 'http://localhost:3000'
const deploy = 'https://confeeti-boda-client.vercel.app/'

server.use(cors({
    origin: deploy,
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

const io = new Server(serverUno, {
    cors : {
        origin: deploy,
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
})

Conexion(io)
CreateBossUserAdmin(firstUser)
//CreateBossUserAdmin(secondUser)
.then((res) => {
    console.log(res)
})

server.use('/', Router)

module.exports = {
    serverUno,
    io
}