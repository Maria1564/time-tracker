const db = require("../db.js")
const bcrypt = require("bcrypt")
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")

//получение данных о пользователе
const getInfoUser = async(req, res)=>{
    try {
        const dataUser = await db.query(`SELECT id, login, email FROM Users WHERE id = $1 `, 
            [req.idUser])
        

        res.json(dataUser.rows[0])
    } catch (error) {
        res.status(400).json("не удалось получить данные пользователя")  
    }
}


//Регистрация пользователя
const register = async(req, res)=>{
    try {
        
        //проверка на наличие соответствующих полей
        const errors = validationResult(req)
        console.log(errors)
        if(!errors.isEmpty()){
            return res.status(400).json(errors)
        }
        const {login, email, password} = req.body
        
        const hashPassword = await bcrypt.hash(password, 7)

        const newUser = await db.query(`INSERT INTO Users (login, email, hashpassword) 
            values ($1, $2, $3) RETURNING *`, 
            [login, email, hashPassword])
        
        const {hashpassword, ...infoNewUser} = newUser.rows[0] 
        console.log(infoNewUser)
        res.json(infoNewUser)

    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            message: "Не удалось зарегистрироваться"
        })
    }
}

//аутентификация  пользователя
const login = async(req, res) => {
    try{
        const errors =validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors)
        }
        
        const {login, password} = req.body

        const  user = await db.query("SELECT * FROM  Users WHERE login = $1", [login])
        if(user.rows.length === 0){
            return res.status(400).json({message: "Пользователь не найден"})
        }

        const {hashpassword: passwordHash, ...infoUser} = user.rows[0]
        const validPassword = await bcrypt.compare(password, passwordHash)

        if(!validPassword){
            return res.status(400).json({
                message: "Неверный логин или пароль"
            })
        }

        //Генерация токена
        const token = jwt.sign({
            idUser: infoUser.id,
            login: infoUser.login
        },
        
        "secretKey",
        {
            expiresIn: "10h"
        })

        res.json({
            ...infoUser,
            token
        })
        
    }catch(err){
        console.log(err.message)
        res.status(400).json({
            message: "Неверный логин или пароль"
        })
    }
}

module.exports = {
    getInfoUser,
    register,
    login
}