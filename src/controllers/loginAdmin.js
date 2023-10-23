const { UserAdmin } = require("../db.js")
const bcrypt = require("bcryptjs")
const { createAccessToken } = require("../middlewares/createAccessToken.js")
const { createRefreshToken } = require("../middlewares/refreshToken.js")


//const refreshTokens = []

const LoginAdmin = async (req, res) => {
    try {

        const { name, password } = req.body

        if (name.length === 0 || password.length === 0 || !password || !name) {

            return res.status(400).json("Vuelve a intentarlo")

        } else {

            const nombre = await capitalizeFirstLetterName(name)

            const user = await UserAdmin.findOne({
                where : {
                    name : nombre
                }
            })

            if (!user) {
                return res.status(400).json("El Usuario no existe")
            }else{
                const comparePassword = await bcrypt.compare( password, user.password )

                if (!comparePassword) {

                    return res.status(400).json("Password Invalid")

                }else{

                    // crear token de acceso
                    const { token, expiresIn } = await createAccessToken({ ID:user.id, IsAdmin:user.admin})
                    const {Refreshtoken, expiresInRefresh} = await createRefreshToken({ID:user.id}) // lo enviamos por cookies

                    //refreshTokens.push(refreshToken)

                    res.cookie("RefreshToken", Refreshtoken, {
                        httpOnly : true, // solo vive en el intercambio de datos, no puede ser accedido en el front
                        expires : new Date(Date.now() + expiresInRefresh * 1000),
                        secure: true
                    })

                    res.status(200).json({
                        message : "Sesion Iniciada",
                        //id : existUser.id,
                        name : user.name,
                        lastName : user.lastName,
                        //isAdmin : user.admin,
                        //name : user.name,
                        //lastname : user.lastName,
                        token,
                        expiresIn,
                        //refreshToken
                    })

                }
            }

            //if (!comparePassword) {
//
            //    res.status(400).json("Password Invalid")
//
            //}else {
//
            //    const existUser = await UserAdmin.findOne({
            //        where : {
            //            name : name
            //        }
            //    })
//
            //    if (!existUser) {
            //        res.status(400).json("El Usuario no existe")
            //    }else{
//
            //        // crear token de acceso
            //        const { token, expiresIn } = await createAccessToken({ ID:existUser.id, IsAdmin:existUser.admin})
            //        const {Refreshtoken, expiresInRefresh} = await createRefreshToken({ID:existUser.id}) // lo enviamos por cookies
//
            //        //refreshTokens.push(refreshToken)
//
            //        res.cookie("RefreshToken", Refreshtoken, {
            //            httpOnly : true, // solo vive en el intercambio de datos, no puede ser accedido en el front
            //            expires : new Date(Date.now() + expiresInRefresh * 1000)
            //        })
//
            //        res.status(200).json({
            //            message : "Sesion Iniciada",
            //            //id : existUser.id,
            //            //name : existUser.name,
            //            //lastName : existUser.lastName,
            //            isAdmin : existUser.admin,
            //            name : existUser.name,
            //            lastname : existUser.lastName
            //            //token,
            //            //expiresIn,
            //            //refreshToken
            //        })
            //    }
            //}
        }
        
    } catch (error) {
        //console.log(error)
        res.status(500).json(error.message)
    }
}


function capitalizeFirstLetterName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

//function capitalizeFirstLetterLastName(lastName) {
//    return lastName.charAt(0).toUpperCase() + lastName.slice(1);
//}

module.exports = {
    LoginAdmin,
    //refreshTokens
}