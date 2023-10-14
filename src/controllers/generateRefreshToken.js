const { UserAdmin } = require("../db")
const jwt = require("jsonwebtoken")
const { SECRET_REFREST_TOKEN, SECRET_TOKEN } = process.env

//const { createRefreshToken } = require("../middlewares/refreshToken")
const { createAccessToken } = require("../middlewares/createAccessToken")

const GenerateRefreshToken = async (req, res) => {
    try {

        //const refreshToken = req.headers.authorization;

        const refreshToken = req.cookies.RefreshToken

        if (!refreshToken) {
            res.status(400).json("No existe un Token")
        }else{
            const VeryToken = jwt.verify(refreshToken, SECRET_REFREST_TOKEN)

            const { ID } = VeryToken

            const user = await UserAdmin.findByPk(ID)

            if (!user) {
                res.status(400).json("El Usario no Existe")
            }else{
                const {token, expiresIn } = await createAccessToken({ ID:user.id, name:user.name, isAdmin:user.admin})

                res.status(200).json({
                    message : "OK",
                    token,
                    expiresIn
                })

            }
        }

        //console.log(authorizationHeader)
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}


module.exports = {
    GenerateRefreshToken
}