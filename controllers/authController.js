const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

require("dotenv-safe").config();

router.post("/login", (req, res) => {
    const { email, senha } = req.body

    console.log('Email: '+ email + ' Senha: ' + senha);
    if(email === 'usuario@gmail.com' && senha === '123456'){
        console.log('logado!')
        const token = jwt.sign(
            {
                id: 10,
                email: "usuario@email.com"
            },
            process.env.jwt_secret,
            // É uma má prática porque a aplicação se torna mais exposta e vulnéravel a ataques maliciosos.
            {expiresIn: '60m'}
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });
        console.log("Token ativo:" + token)
        return res.json({
            "mensagem": "Login realizado com sucesso",
            "token": "TOKEN_GERADO"
        });
    }
});

module.exports = router;