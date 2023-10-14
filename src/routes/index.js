const express = require("express")
const Router = express.Router()

const getUsers = require("./users.js")
const ress = require("./response.js")

Router.use("/getUser", getUsers)//get
Router.use("/", ress)// post

module.exports = Router