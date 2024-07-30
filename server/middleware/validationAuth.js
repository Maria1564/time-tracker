const {body} = require("express-validator")

//проверка на валидность при регистрации
const regValidation = [
    body("login",  "Укажите логин").isLength({min:3, max: 20}),
    body("email",  "Введён неверный формат почты").isEmail(),
    body("password","Пароль должен состоять минимум из 5 символов").isLength({min:5})
]

const loginValidation = [
    body("login",  "Укажите логин").isLength({min:3, max: 20}),
    body("password","Пароль должен состоять минимум из 5 символов").isLength({min:5})
]


module.exports = {
    regValidation,
    loginValidation
}