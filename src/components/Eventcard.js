import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function EventCard({
  event,
  onPress,
  onEdit,
  onDelete,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.eventName}>{event.name}</Text>

      <Text style={styles.info}>
        📅 Date: {event.date}
      </Text>

      <Text style={styles.info}>
        🕒 Time: {event.time}
      </Text>

      <Text style={styles.description}>
        {event.description || 'No description'}
      </Text>

      {event.reminderDate && (
        <Text style={styles.reminder}>
          🔔 Reminder: {event.reminderDate} at {event.reminderTime}
        </Text>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 3,
  },
  eventName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#176B55',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555555',
    marginTop: 8,
  },
  reminder: {
    color: '#176B55',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  editButton: {
    backgroundColor: '#2878C8',
    padding: 10,
    borderRadius: 7,
    flex: 1,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#D94343',
    padding: 10,
    borderRadius: 7,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});