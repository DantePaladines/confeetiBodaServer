const { Response, UserAdmin } = require("./db")
const { Responses } = require("./controllers/responseInvited")
const { CreateUsersAdmin } = require("./controllers/createUserAdmin")
//const { DeleteUserAdmins } = require("./controllers/deleteUserAdmins")

const Conexion = (io) => { // esto es la conexion
    io.on("connection", (socket) => {
        console.log(`Users connect`)

        //console.log(socket)

        // peticiones de Usuarios
        socket.on("client:getUser", async () => {

            const users = await Response.findAll()

            if (users.length === 0) {
                const message = "En estos Momentos no hay Invitados"

                io.emit("server:getUser", message)
            }else{
                io.emit("server:getUser", users)
            }

        })

        // respuesta de usuarios
        socket.on("rptas", async (datos) => {
            //console.log(datos)// guardamos datos a la db

            const data = await Responses(datos)

            io.emit("res", data)
        })
    
        socket.on("disconnect", () => {
            console.log("User Desconnect")
        })

        //peticiones de admins
        //socket.on("client:createAdmins", async () => {
        //    const userAdmin = await UserAdmin.findAll()
//
        //    if (userAdmin.length === 0) {
        //        const message = "En estos Momentos no hay Admins"
//
        //        io.emit("server:createAdmins", message)
        //    }else{
        //        io.emit("server:createAdmins", userAdmin)
        //    }
        //})

        // creacion de Administrador
        socket.on("client:createAdmin", async (datos) => {
            //console.log(datos)

            const data = await CreateUsersAdmin(datos)

            if (typeof data === "string") {
                io.emit("createAdminError:server", data)
            }else{
                io.emit("createAdmin:server")
            }

        })

        //socket.on("client:DeleteUserAdmin", async (id) => {
//
        //    const datoEliminado = await DeleteUserAdmins(id)
//
        //    console.log(datoEliminado)
//
        //    io.emit("server:deleteAdmins", datoEliminado)
//
        //})

        socket.on("cliente:getUserAdmins", async (id) => {
            const datos = await UserAdmin.findByPk(id)

            io.emit("server:getAdmins", datos)
        })

    })
}

module.exports = {
    Conexion
}