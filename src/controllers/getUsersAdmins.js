const { UserAdmin } = require("../db")

const GetUserAdmins = async (req, res) => {
    try {
        const data = await UserAdmin.findAll()

        if (data.length === 0) {
            res.status(404).json("En estos Momentos no hay Invitados")
        }else{
            res.status(200).json(data)
        }
        
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    GetUserAdmins
}