import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Alert,
  BackHandler,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import AddEventScreen from './src/screens/AddEventScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import SearchScreen from './src/screens/SearchScreen';

import { saveEvents, loadEvents } from './src/utils/storage';

import {
  configureNotifications,
  scheduleReminder,
  cancelReminder,
} from './src/utils/notifications';

export default function App() {
  const [events, setEvents] = useState([]);
  const [screen, setScreen] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load saved events
  useEffect(() => {
    const initializeApp = async () => {
      const savedEvents = await loadEvents();
      setEvents(savedEvents);
      setLoading(false);
    };

    initializeApp();
  }, []);

  // Save events whenever they change
  useEffect(() => {
    if (!loading) {
      saveEvents(events);
    }
  }, [events, loading]);

  // Handle Android back button
  useEffect(() => {
    const backAction = () => {
      if (screen !== 'home') {
        setScreen('home');
        return true;
      }

      return false;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => subscription.remove();
  }, [screen]);

  // Add or update an event
  const handleSaveEvent = async (eventData) => {
    try {
      let reminderId = eventData.reminderId || null;

      if (reminderId) {
        await cancelReminder(reminderId);
        reminderId = null;
      }

      if (eventData.reminderDate && eventData.reminderTime) {
        const permissionGranted = await configureNotifications();

        if (!permissionGranted) {
          Alert.alert(
            'Notification Permission',
            'Notifications are disabled. The event will be saved without a reminder.'
          );
        } else {
          reminderId = await scheduleReminder(eventData);
        }
      }

      const updatedEvent = {
        ...eventData,
        reminderId,
      };

      let updatedEvents;

      if (editingEvent) {
        updatedEvents = events.map((event) =>
          event.id === editingEvent.id ? updatedEvent : event
        );
      } else {
        updatedEvents = [...events, updatedEvent];
      }

      setEvents(updatedEvents);
      setEditingEvent(null);
      setSelectedEvent(null);
      setScreen('home');

      Alert.alert(
        'Success',
        editingEvent ? 'Event updated successfully!' : 'Event created successfully!'
      );
    } catch (error) {
      Alert.alert('Error', error.message || 'Unable to save event.');
    }
  };

  // Open add screen
  const openAddScreen = () => {
    setEditingEvent(null);
    setScreen('add');
  };

  // Open edit screen
  const openEditScreen = (event) => {
    setEditingEvent(event);
    setSelectedEvent(null);
    setScreen('add');
  };

  // Delete event
  const handleDeleteEvent = (event) => {
    Alert.alert(
      'Delete Event',
      `Are you sure you want to delete "${event.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await cancelReminder(event.reminderId);

              const updatedEvents = events.filter(
                (item) => item.id !== event.id
              );

              setEvents(updatedEvents);
              setSelectedEvent(null);
              setScreen('home');
            } catch (error) {
              Alert.alert('Error', 'Unable to delete event.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading Event Planner...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {screen === 'home' && (
        <HomeScreen
          events={events}
          onAdd={openAddScreen}
          onSearch={() => setScreen('search')}
          onDetails={(event) => {
            setSelectedEvent(event);
            setScreen('details');
          }}
          onEdit={openEditScreen}
          onDelete={handleDeleteEvent}
        />
      )}

      {screen === 'add' && (
        <AddEventScreen
          editingEvent={editingEvent}
          onSave={handleSaveEvent}
          onCancel={() => {
            setEditingEvent(null);
            setScreen('home');
          }}
        />
      )}

      {screen === 'details' && (
        <EventDetailsScreen
          event={selectedEvent}
          onBack={() => setScreen('home')}
          onEdit={() => openEditScreen(selectedEvent)}
          onDelete={() => handleDeleteEvent(selectedEvent)}
        />
      )}

      {screen === 'search' && (
        <SearchScreen
          events={events}
          onBack={() => setScreen('home')}
          onDetails={(event) => {
            setSelectedEvent(event);
            setScreen('details');
          }}
          onEdit={openEditScreen}
          onDelete={handleDeleteEvent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7F5',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F7F5',
  },
  loadingText: {
    fontSize: 18,
    color: '#176B55',
  },
});