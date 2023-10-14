const { UserAdmin } = require("../db")
const bcrypt = require("bcryptjs")


const UpdateUserAdmin = async (req, res) => {
    try {
        const { id } = req.params

        const { name, lastName, password, email } = req.body

        if (name.length === 0 || 
            password.length === 0 || 
            !password || !name || 
            !lastName || 
            lastName.length === 0 || 
            !email || 
            email.length === 0
            ) {

            return res.status(400).json("Vuelve a intentarlo")

        }else{

            const user = await UserAdmin.findByPk(id)

            if (!user) {
                res.status(400).json("Usuario no Encontrado")
            }else{

                //const searchEmail = await UserAdmin.findOne({
                //    where : {
                //        email : email
                //    }
                //})
//
                //if (searchEmail) {
                //    res.status(400).json("El Email no debe de coincidir con los de la db")
//
                //}else{
//
                //}

                const salt = await bcrypt.genSalt(12) // y cuando se crean las mismas contrasenas??
                const changePassword = await bcrypt.hashSync(password, salt)

                const nombre = await capitalizeFirstLetterName(name)
                const apellido = await capitalizeFirstLetterLastName(lastName)

                const [updatedUser] = await UserAdmin.update(
                    {
                        name: nombre,
                        lastName: apellido,
                        password: changePassword,
                        email: email, // preferible el mismo email(si no hay apuros)
                    },
                    {
                        where: { id: id }, // Condición de actualización
                    }
                )

                if (updatedUser === 1) {
                    const updatedUserDotos = await UserAdmin.findByPk(id);
                    return res.status(200).json(updatedUserDotos);
                    //return res.status(200).json(updatedUser); Devolver los datos del usuario actualizados
                } 
                //else {
                //    return res.status(500).json("Error al actualizar el usuario.");
                //}
            }
        }
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

function capitalizeFirstLetterName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function capitalizeFirstLetterLastName(lastName) {
    return lastName.charAt(0).toUpperCase() + lastName.slice(1);
}


module.exports = {
    UpdateUserAdmin
}