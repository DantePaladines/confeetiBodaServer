const { UserBossAdmin } = require("../db")
const jwt = require("jsonwebtoken")
const { SECRET_REFREST_TOKEN, SECRET_TOKEN } = process.env

//const { createRefreshToken } = require("../middlewares/refreshToken")
const { createAccessToken } = require("../middlewares/createAccessToken")

const GenerateRefreshTokenBossAdmin = async (req, res) => {
    try {

        //const refreshToken = req.headers.authorization;

        const refreshToken = req.cookies.RefreshTokenBossAdmin

        if (!refreshToken) {
            res.status(400).json("No existe un Token")
        }else{
            const VeryToken = jwt.verify(refreshToken, SECRET_REFREST_TOKEN)

            const { ID } = VeryToken

            const user = await UserBossAdmin.findByPk(ID)

            if (!user) {
                res.status(400).json("El Usario no Existe")
            }else{
                const {token, expiresIn } = await createAccessToken({ ID:user.id, isAdmin:user.bossAdmin})

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
    GenerateRefreshTokenBossAdmin
}