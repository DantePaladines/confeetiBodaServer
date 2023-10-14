const express = require("express")
const { GetUser } = require("../controllers/getUsers.js")
const { Excel, ExcelDrive } = require("../controllers/generateExcel.js")
const { ValidateTokenUser } = require("../middlewares/validateUser.js")
const { Logout } = require("../controllers/logout.js")
const { LogoutBossAdmin } = require("../controllers/logoutBossAdmin.js")
const { DeleteUserAdmins } = require("../controllers/deleteUserAdmins.js")
const { GetUserAdmins } = require("../controllers/getUsersAdmins.js")
const Router = express.Router()

Router.get("/", GetUser)
Router.get("/generateExcel", Excel)
Router.get("/generateExcelDrive", ExcelDrive)
Router.get("/logout", Logout)
Router.get("/logoutBossAdmin", LogoutBossAdmin)
Router.delete("/deleteUserAdmin/:id", DeleteUserAdmins)
Router.get("/getUsersAdmins", GetUserAdmins)

module.exports = Router

//ValidateTokenUser