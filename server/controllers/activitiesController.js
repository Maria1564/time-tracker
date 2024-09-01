const db = require("../db.js")

//получение списка активностей
const getActivities = async(req, res) => {
    try {

        const activities = await db.query(`SELECT useractivities.id, nameactivity, colors.hexcode 
            FROM useractivities, colors
            WHERE useractivities.idcolor = colors.id and useractivities.idUser = $1 order by useractivities.id`, [req.idUser]) 
            

            const updatedActivities = activities.rows.map(activity => ({
                id: activity.id, 
                nameActivity: activity.nameactivity,
                hexcode: activity.hexcode 
            }));


            res.json(updatedActivities)
    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            message:"Не удалось получить список активностей"
        })
    }
}

//добавление новой активности
const createActivity = async(req, res) => {
   try {
        const {idColor, nameNewActivity} = req.body
        const idUser = req.idUser

        const newActivity = await db.query(`INSERT INTO public.useractivities (
	 nameactivity, iduser, idcolor) VALUES ( $1, $2, $3) RETURNING id, nameactivity, idcolor`, [nameNewActivity, idUser, idColor])

     const selectColor = await db.query(`select hexcode from colors where id = $1`, [newActivity.rows[0]["idcolor"]])

     const {id, nameactivity: nameActivity} = newActivity.rows[0]
     res.json({
        id,
        nameActivity,
        hexColor: selectColor.rows[0].hexcode
     })
   } catch (err) {
    console.log(err.message)
        res.status(400).json({
            message: "Не удалось создать новую активность"
        })
   }
}

//удаление активности
const deleteActivity = async (req, res) => {
    try {
        const deletedActivity = await db.query(`DELETE FROM useractivities
	    WHERE id = $1 RETURNING id`, [req.params.id])
        
        res.json({
            id: deletedActivity.rows[0].id
        })

    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            message: "Не удалось удалить активность"
        })
    }
}

//редактирование выбранной активности
const updateActivity = async(req, res) => {
    try {
        const {idActivity, nameNewActivity, idColor} = req.body
        
        const changedActivity = await db.query(`UPDATE useractivities SET  nameactivity=$1, idcolor=$2 where id = $3 RETURNING id, nameActivity, idColor`, [nameNewActivity, idColor, idActivity])
        const selectedColor = await db.query(`SELECT hexcode FROM colors where id = $1`, [changedActivity.rows[0].idcolor])
        
        const {id, nameactivity: nameActivity} = changedActivity.rows[0]
        
        res.json({
            id,
            nameActivity,
            hexcode: selectedColor.rows[0].hexcode
        })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            message: "Не удалось обновить активность"
        })
    }
}

module.exports = {
    getActivities,
    createActivity,
    deleteActivity,
    updateActivity
}