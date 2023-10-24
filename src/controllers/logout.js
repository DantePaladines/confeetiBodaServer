const Logout = (req, res) => {
    try {

        res.clearCookie("RefreshToken", {
            expires : new Date(0)
        })
        res.json("Sesion Cerrada")
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    Logout
}