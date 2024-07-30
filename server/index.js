const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 5000

const {regValidation, loginValidation} = require("./middleware/validationAuth.js")
 
const userController = require("./controllers/userController.js")

app.use(cors())
app.use(express.json())


//пользователь
app.get("/auth/me", userController.getInfoUser)
app.post("/auth/register", regValidation, userController.register)
app.post("/auth/login", loginValidation, userController.login)

app.listen(PORT, ()=> console.log("start server..."))