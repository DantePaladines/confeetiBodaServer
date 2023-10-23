const Logout = (req, res) => {
    try {

        res.clearCookie("RefreshToken")
        res.json("Sesion Cerrada")
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    Logout
}