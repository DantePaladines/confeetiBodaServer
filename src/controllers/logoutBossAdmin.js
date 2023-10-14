const LogoutBossAdmin = (req, res) => {
    try {

        res.clearCookie("RefreshTokenBossAdmin")
        res.json("Sesion Cerrada")
        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    LogoutBossAdmin
}