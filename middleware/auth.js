const jwt = require("jsonwebtoken")

function autenticarToken(req, res, next){
    const token = req.cookies.token

    if(!token){
        console.log("Sem token!")
        return res.redirect('/login')
    }
    jwt.verify(token, process.env.jwt_secret, (err, decoded)=> {
        if (err){
            console.log("Token inválido!")
            return res.status(401)
        }
        next()
    })
}

module.exports = autenticarToken;