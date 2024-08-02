const db = require("../db.js")

// добавление записи о времени, затраченном пользователем на активность, в журнал.
const saveActivityData = async(req, res)=>{
    try {
        const {idActivity, startTime, endTime} = req.body
    const activityLogItem = await db.query(`INSERT INTO activitytracking( iduser, idactivity, starttime, endtime) 
        VALUES ( $1, $2, $3, $4) returning *`, [req.idUser, idActivity, startTime, endTime])

    res.json({newActivity: activityLogItem.rows[0]})
    // res.json({startTime, endTime: new Date(endTime).toLocaleString()})
    } catch (err) {
        // console.log(err)
        res.status(400).json({
            message: "Не удалось занести информацию об активности в журнал"
        })
    }
}


//получение информации обо всех активностях дня
const getLogUserActivities = async(req, res) => {
    try{
        const logActivitiesDay = await db.query(
    `SELECT userActivities.nameActivity, userActivities.idColor,
	FLOOR(SUM(EXTRACT(EPOCH FROM (endTime - startTime)) / 60)) AS minutesDiff
	FROM activitytracking, userActivities
	WHERE activitytracking.idActivity = userActivities.id and activitytracking.idUser = $1 and DATE(startTime) = $2 
	GROUP BY userActivities.nameActivity, userActivities.idColor`,
            [req.idUser, req.query.date])

            res.json(logActivitiesDay.rows)
    }catch(err){
        console.log(err)
        res.status(400).json({
            message: "Не удалось получить информацию об активностях за день"
        })
    }
}


module.exports = {
    saveActivityData,
    getLogUserActivities
}