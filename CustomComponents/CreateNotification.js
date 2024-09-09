import * as Notifications from 'expo-notifications';
import Notification from '../Screens/Notification';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  export async function CreateNotification(title,dateAssigned){
console.log("from notify")
                await Notifications.scheduleNotificationAsync({
                    content: {
                             title: 'Reminder',
                             body: `${title} was created successfully on ${new Date(dateAssigned).toDateString()}`,
                             },
                    trigger: {
                            seconds: 1,
                            },
                 });
                 Notification(title,dateAssigned)
  
  }