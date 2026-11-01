import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'EVENT_PLANNER_DATA';

// Save events
export const saveEvents = async (events) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(events)
    );
  } catch (error) {
    console.log('Save Error:', error);
  }
};

// Load events
export const loadEvents = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Load Error:', error);
    return [];
  }
};