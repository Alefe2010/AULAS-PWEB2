const express = require("express")
const app = express()
const PORT = 3000
const cookieParser = require("cookie-parser")
require("dotenv-safe").config()
const produtoRouter = require("./routes/produtoRoutes")
const authRouter = require("./routes/authRoutes")

app.use(express.json())
app.use(cookieParser())

app.use("/produtos", produtoRouter)
app.use("/auth", authRouter)

app.listen(PORT, () => {
    console.log(`Ta rodando em http://localhost:${PORT}`)
})
