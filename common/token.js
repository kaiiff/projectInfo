const jwt = require("jsonwebtoken")

//genrate jwt token
const genrateToken = async (payload) => {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })
    return token;
}
module.exports = {
    genrateToken
}                        