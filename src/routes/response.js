const express = require("express")
const Router = express.Router()
const { Responses } = require("../controllers/responseInvited.js")
const { CreateUsersAdmin } = require("../controllers/createUserAdmin.js")
const { LoginAdmin } = require("../controllers/loginAdmin.js")
const { LoginBossAdmin } = require("../controllers/loginBossAdmin.js")
const { GenerateRefreshToken } = require("../controllers/generateRefreshToken.js")
const { GenerateRefreshTokenBossAdmin } = require("../controllers/generateRefreshTokenBossAdmin.js")
const { UpdateUserAdmin } = require("../controllers/updateAdmins.js")

Router.post("/response", Responses)
Router.post("/createAdmin", CreateUsersAdmin)
Router.post("/login", LoginAdmin)
Router.post("/loginBossAdmin", LoginBossAdmin)
Router.put("/updateUserAdmin/:id", UpdateUserAdmin)
Router.get("/refreshToken", GenerateRefreshToken)// esto es en prueba
Router.get("/refreshTokenBossAdmin", GenerateRefreshTokenBossAdmin)

module.exports = Router