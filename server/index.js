const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 5000

const userController = require("./controllers/userController.js")
const colorsController = require("./controllers/colorsController")

const {regValidation, loginValidation} = require("./middleware/validationAuth.js")
const checkAuth = require("./middleware/checkAuth.js")

app.use(cors())
app.use(express.json())

//пользователь
app.get("/auth/me", checkAuth, userController.getInfoUser)
app.post("/auth/register", regValidation, userController.register)
app.post("/auth/login", loginValidation, userController.login)


//получение палитры цветов
app.get("/colors", colorsController.getAllColors)

app.listen(PORT, ()=> console.log("start server..."))