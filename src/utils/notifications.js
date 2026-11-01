
import * as Notifications from 'expo-notifications';

// Request notification permission
export const configureNotifications = async () => {
  try {
    const existingPermission =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingPermission.status;

    if (finalStatus !== 'granted') {
      const permission =
        await Notifications.requestPermissionsAsync();

      finalStatus = permission.status;
    }

    return finalStatus === 'granted';
  } catch (error) {
    console.log('Notification permission error:', error);
    return false;
  }
};

// Schedule event reminder
export const scheduleReminder = async (event) => {
  if (!event.reminderDate || !event.reminderTime) {
    return null;
  }

  const reminderDate = new Date(
    `${event.reminderDate}T${event.reminderTime}:00`
  );

  if (
    isNaN(reminderDate.getTime()) ||
    reminderDate <= new Date()
  ) {
    throw new Error(
      'Reminder must be set to a future date and time.'
    );
  }

  const permissionGranted = await configureNotifications();

  if (!permissionGranted) {
    throw new Error('Notification permission was not granted.');
  }

  return await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Event Reminder 🔔',
      body: `${event.name} is coming soon!`,
      sound: 'default',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: reminderDate,
    },
  });
};

// Cancel existing reminder
export const cancelReminder = async (reminderId) => {
  if (reminderId) {
    await Notifications.cancelScheduledNotificationAsync(
      reminderId
    );
  }
};
