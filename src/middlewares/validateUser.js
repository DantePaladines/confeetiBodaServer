const jwt = require("jsonwebtoken")

require("dotenv").config()

const { SECRET_TOKEN } = process.env

const ValidateTokenUser = (req, res, next) => {
    try {

        const validateToken = req.headers.authorization

        if (!validateToken) {
            res.status(401).json("Autorizacion Denegada")
        }else{
            jwt.verify( validateToken, SECRET_TOKEN, (err, user) => {
                if (err) {
                    res.status(403).json("Token Invalido")
                }

                req.user = user
                next()
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    ValidateTokenUser
}