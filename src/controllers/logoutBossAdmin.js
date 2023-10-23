const LogoutBossAdmin = (req, res) => {
    try {

        res.clearCookie("RefreshTokenBossAdmin")
        res.json("Sesion Cerrada")
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    LogoutBossAdmin
}