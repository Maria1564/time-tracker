import { IActivityWithTime, IDataActivities, logActivities } from "../../interfaces";

export const formatTimer = (value: number): string => {
    return String(value).padStart(2, "0")
}

//Группировка данных об активности по дате
export const groupActivitiesByDate = (activities: IActivityWithTime[]): [string, IActivityWithTime[]][] => {
    const activitiesByDate = new Map<string, IActivityWithTime[]>();
    activities.forEach((activity) => {
      const date = activity.endTime.split(" ")[0];
      if (!activitiesByDate.has(date)) {
        activitiesByDate.set(date, [{
          ...activity, 
          startTime: activity.startTime.split(" ")[1],
          endTime: activity.endTime.split(" ")[1]
        }]);
      } else {
        const currentActivities = activitiesByDate.get(date);

        if(currentActivities){
            activitiesByDate.set(date, [...currentActivities, {
              ...activity, 
              startTime: activity.startTime.split(" ")[1],
              endTime: activity.endTime.split(" ")[1]
            }]);
        }
      }
    });

    return Array.from(activitiesByDate.entries())
  };

  //приведение даты к дд.месяц.гг
  export const formatDate = (date: Date)=> {
    // date.setMonth(date.getMonth()-2)
    const day = date.getDate()
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

    return `${day} ${monthNames[month]} ${year}`
  }




const checkDayWeek = (day: string, elem: (logActivities & {dayWeek: string})) =>{
   if(elem.dayWeek === day){
                 
   return  {[day]: {minutes: elem.minutes, seconds: elem.seconds}}
       
  }
 
   return {[day]: {minutes: 0, seconds: 0}}
              
          
}


export const groupActivitiesByWeek = (data: (logActivities & {dayWeek: string})[]): IDataActivities => {
    const weekDays = {
        "Monday": "Понедельник",
        "Tuesday": "Вторник",
        "Wednesday": "Среда",
        "Thursday": "Четверг",
        "Friday": "Пятница",
        "Saturday": "Суббота",
        "Sunday": "Воскресенье"
    }

    const dataActivities: IDataActivities = {}
    
    for (const elem of data){
        
        if(dataActivities[elem.nameActivity]){
           const infoActivity = dataActivities[elem.nameActivity]
          for(const dataDay of infoActivity["week"]!){
            const day = elem.dayWeek            
                if(dataDay[day]){
                  dataDay[day]= {
                minutes: elem.minutes as number,
                seconds: elem.seconds as number
              }
            }
          }
            
        }else{
            dataActivities[elem.nameActivity] = {
                color: elem.hexcode,
            }
            const infoActivity = dataActivities[elem.nameActivity]
            infoActivity["week"] = []

            for(const day in weekDays){
              infoActivity["week"].push(checkDayWeek(day, elem))
            }            
        }
    }

  return dataActivities
}


