const jwt = require("jsonwebtoken")

const { SECRET_REFREST_TOKEN } = process.env

const expiresInRefresh = 60 * 60 * 24 * 30

const createRefreshToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET_REFREST_TOKEN, {expiresIn : expiresInRefresh}, (err, Refreshtoken) => {
            if (err) reject(err)
            resolve({Refreshtoken, expiresInRefresh})
        })
    })
}


module.exports = {
    createRefreshToken
}