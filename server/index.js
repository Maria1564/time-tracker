const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 5000

const userController = require("./controllers/userController.js")
const colorsController = require("./controllers/colorsController")
const activitiesController = require("./controllers/activitiesController.js")
const listActivitiesController = require("./controllers/listActivitiesController.js")

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

//активности (действия) 
app.get("/activities", checkAuth, activitiesController.getActivities) 
app.post("/activities", checkAuth, activitiesController.createActivity)
app.patch("/activities", checkAuth, activitiesController.updateActivity)
app.delete("/activities/:id",checkAuth, activitiesController.deleteActivity)

//данные обо всех активностях
app.get("/activity-log", checkAuth, listActivitiesController.getLogUserActivities)
app.post("/activity-log", checkAuth, listActivitiesController.saveActivityData)

//данные одной активности
app.get("/activity/history/:idAct", checkAuth, listActivitiesController.getHistoryActivity)

app.listen(PORT, ()=> console.log("start server..."))