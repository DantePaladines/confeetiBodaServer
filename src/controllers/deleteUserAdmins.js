const { UserAdmin } = require("../db")

//const DeleteUserAdmins = async (id) => {
//    try {
//
//        //const { id } = req.params
//
//        if (!id) {
//            //res.status(400).json("El dato no se pudo eliminar")
//            
//            return "El dato no se pudo eliminar"
//
//        }else{
//            
//            const dataDelete = await UserAdmin.destroy({
//                where : {
//                    id :id
//                }
//            })
//
//            if (!dataDelete) {
//                //res.status(400).json("El dato no existe")
//
//                return "El dato no existe"
//            }else{
//                //res.json("El dato fue eliminado")
//
//                return id
//            }
//        }
//        
//    } catch (error) {
//        //res.status(500).json(error.message)
//        return error.message
//    }
//}


const DeleteUserAdmins = async (req, res) => {
    try {

        const { id } = req.params

        if (!id) {
            res.status(400).json("El dato no se pudo eliminar")
            
            //return "El dato no se pudo eliminar"

        }else{
            
            const dataDelete = await UserAdmin.destroy({
                where : {
                    id :id
                }
            })

            if (!dataDelete) {
                res.status(400).json("El dato no existe")

                //return "El dato no existe"
            }

            res.status(204).send()

            //return id
        }
        
    } catch (error) {
        res.status(500).json(error.message)
        //return error.message
    }
}

module.exports = {
    DeleteUserAdmins
}