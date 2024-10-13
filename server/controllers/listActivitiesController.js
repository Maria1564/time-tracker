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
	ROUND(SUM(EXTRACT(EPOCH FROM (endtime - starttime)))) AS secondsDiff
	FROM activitytracking, userActivities, colors
	WHERE activitytracking.idActivity = userActivities.id and userActivities.idColor = colors.id and activitytracking.idUser = $1 and DATE(startTime) = $2 
	GROUP BY userActivities.nameActivity, colors.hexcode`,
            [req.idUser, req.query.date])

            const updateLogActivitiesDay = logActivitiesDay.rows.map(log => ({
                nameActivity: log.nameactivity,
                hexcode: log.hexcode,
                minutes:Math.floor( log.secondsdiff / 60),
                seconds: log.secondsdiff % 60
            }));
            
            res.json(updateLogActivitiesDay)
    }catch(err){
        console.log(err)
        res.status(400).json({
            message: "Не удалось получить информацию об активностях за день"
        })
    }
}

//получение информации обо всех активностях за неделю
const getWeekLogUserActivities = async(req, res) => {
    try{
        const logActivitiesDay = await db.query(
        `WITH week_dates AS (
        SELECT 
            DATE_TRUNC('week', TO_DATE('2024', 'YYYY') + INTERVAL '1 week' * ($1 - 1)) AS week_start,
            DATE_TRUNC('week', TO_DATE('2024', 'YYYY') + INTERVAL '1 week' * $1) - INTERVAL '1 second' AS week_end
            )
        SELECT 
            TO_CHAR(starttime, 'Day') AS dayOfWeek,
            nameActivity, 
            ROUND(SUM(EXTRACT(EPOCH FROM (endtime - starttime)))) AS secondsDiff,
            hexcode
        FROM 
            activitytracking, 
            useractivities,
            week_dates,
            colors
        WHERE 
            activitytracking.idActivity = useractivities.id 
            AND colors.id = useractivities.idColor
            AND activitytracking.iduser = $2
            AND starttime >= week_start
            AND starttime <= week_end
        GROUP BY 
            dayOfWeek, 
            nameActivity,
            hexcode
        ORDER BY 
            dayOfWeek DESC;`,
            [req.query.numWeek, req.idUser])

            const updateLogActivitiesDay = logActivitiesDay.rows.map(log => ({
                dayWeek:log.dayofweek.trim(),
                nameActivity: log.nameactivity,
                hexcode: log.hexcode,
                minutes:Math.floor( log.secondsdiff / 60),
                seconds: log.secondsdiff % 60
            }));
            
            res.json(updateLogActivitiesDay)
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

    const updateHistoryActivity = historyActivity.rows.map(activity => ({
        id: activity.id,
        nameActivity: activity.nameactivity,
        hexcode: activity.hexcode,
        startTime: activity.starttime,
        endTime: activity.endtime
    }));
    
    res.json(updateHistoryActivity)
    }catch(err){
        console.log(err)
        res.status(400).json({
            message: "Не удалось получить историю выбранной активности"
        })
    }
}

//получение активности дня
const getTopActivity = async(req, res)=> {
    try {
        const activity = await db.query(`SELECT nameActivity,
	ROUND(SUM(EXTRACT(EPOCH FROM (endtime - starttime)))) AS secondsDiff
	FROM activitytracking, useractivities
	where activitytracking.idActivity = useractivities.id and activitytracking.iduser = $1 and DATE(startTime) = current_date 
	group by nameActivity 
	order by secondsDiff desc
	limit 1`, [req.idUser])
    
    res.json(activity.rows[0])
    } catch (error) {
        console.log(err)
        res.status(400).json({
            message: "Не удалось получить активность дня"
        })   
    }
}


module.exports = {
    saveActivityData,
    getLogUserActivities,
    getHistoryActivity,
    getWeekLogUserActivities,
    getTopActivity
}