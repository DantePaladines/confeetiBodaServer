const LogoutBossAdmin = (req, res) => {
    try {

        res.clearCookie("RefreshTokenBossAdmin", { 
            expires: new Date(0),
            secure: true,
            sameSite: 'none'
        })
        res.json("Sesion Cerrada")
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    LogoutBossAdmin
}