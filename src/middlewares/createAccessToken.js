const jwt = require("jsonwebtoken")

const { SECRET_TOKEN } = process.env

const expiresIn = 60 * 15 // quince minutos

const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET_TOKEN, {expiresIn}, (err, token) => {
            if (err) reject(err)
            resolve({token, expiresIn})
        })
    })
}

module.exports = {
    createAccessToken
}