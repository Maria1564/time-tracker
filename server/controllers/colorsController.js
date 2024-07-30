const db = require("../db.js")

//Получение всех цветов
const getAllColors = async(_, res)=>{
    try{
        const colors = await db.query("SELECT * FROM Colors")

        res.json(colors.rows)
    }catch(err){
        res.status(400).json({
            message: "Не удалось получить цвета"
        })
    }
}

module.exports = {
    getAllColors
}