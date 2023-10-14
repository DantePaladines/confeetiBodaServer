const { Response } = require("../db.js")

const GetUser = async (req, res) => {
    try {

        //const datos = req.user
//
        //console.log(datos)
//
        //if (!datos) {
        //    res.status(401).json("Peticion Denegada")
        //}else{
//
        //    if (datos.IsAdmin === true) {
//
        //        const data = await Response.findAll()
//
        //        if (data.length === 0) {
        //            res.status(400).json("No hay invitaciones")
        //        }else{
        //            res.status(200).json(data)
        //        }
        //    }
        //}

        const data = await Response.findAll()

        if (data.length === 0) {
            res.status(404).json("En estos Momentos no hay Invitados")
        }else{
            res.status(200).json(data)
        }

    } catch (error) {
        res.status(500).json(error.message)
    }
}

// Esta función se encargará de emitir los datos de los usuarios a través de Socket.io
//const emitUserData = async (socket) => {
//    try {
//      const data = await Response.findAll();
//  
//      if (data.length === 0) {
//        // Si no hay invitados, envía un mensaje de error al cliente
//        socket.emit("nuevo_registro_error", "En estos Momentos no hay Invitados");
//      } else {
//        // Si hay invitados, emite los datos al cliente
//        socket.emit("nuevo_registro_exitoso", data);
//      }
//    } catch (error) {
//      // En caso de error en la consulta a la base de datos, emite un mensaje de error
//      socket.emit("nuevo_registro_error", error.message);
//    }
//};
//  
//// Maneja la solicitud GET para obtener datos de usuarios
//const GetUser = async (req, res) => {
//  try {
//    // Llamamos a la función emitUserData y pasamos el socket como argumento
//    emitUserData(io);
//
//    // Enviamos una respuesta al cliente indicando que los datos se emitirán a través de Socket.io
//    res.status(200).json("Obteniendo datos de usuarios...");
//  } catch (error) {
//    res.status(500).json(error.message);
//  }
//};

module.exports = {
    GetUser
}

