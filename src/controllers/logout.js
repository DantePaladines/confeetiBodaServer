
const Logout = (req, res) => {
    try {

        res.clearCookie("RefreshToken")
        res.json("Sesion Cerrada")
        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    Logout
}