import { IActivityWithTime } from "../../interfaces";

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