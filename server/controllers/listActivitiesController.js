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
        console.log(err)
        res.status(400).json({
            message: "Не удалось занести информацию об активности в журнал"
        })
    }
}


//получение информации обо всех активностях дня
const getLogUserActivities = async(req, res) => {
    try{
        const logActivitiesDay = await db.query(
    `SELECT userActivities.nameActivity, colors.hexcode,
	FLOOR(SUM(EXTRACT(EPOCH FROM (endTime - startTime)) / 60)) AS minutesDiff
	FROM activitytracking, userActivities, colors
	WHERE activitytracking.idActivity = userActivities.id and userActivities.idColor = colors.id and activitytracking.idUser = $1 and DATE(startTime) = $2 
	GROUP BY userActivities.nameActivity, colors.hexcode`,
            [req.idUser, req.query.date])

            res.json(logActivitiesDay.rows)
    }catch(err){
        console.log(err)
        res.status(400).json({
            message: "Не удалось получить информацию об активностях за день"
        })
    }
}

//получение истории выбранной активности
const getHistoryActivity = async(req, res) => {
    try{
        const historyActivity = await db.query(`
    SELECT activityTracking.id, userActivities.nameActivity, colors.hexcode, 
    TO_CHAR(starttime, 'YYYY-MM-DD HH24:MI:SS') AS starttime, 
    TO_CHAR(endtime, 'YYYY-MM-DD HH24:MI:SS') AS endtime 
	FROM activityTracking, userActivities, colors
	WHERE activityTracking.idActivity = userActivities.id and userActivities.idColor = colors.id and
	activityTracking.idUser = $1 and activityTracking.idActivity = $2 order by starttime desc `, [req.idUser, req.params.idAct])
 console.log(historyActivity.rows[0].starttime)
    res.json(historyActivity.rows)
    }catch(err){
        console.log(err)
        res.status(400).json({
            message: "Не удалось получить историю выбранной активности"
        })
    }
}


module.exports = {
    saveActivityData,
    getLogUserActivities,
    getHistoryActivity
}