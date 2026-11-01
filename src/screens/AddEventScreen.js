
import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const reminderOptions = [
  { label: '5 minutes', value: 5 },
  { label: '10 minutes', value: 10 },
  { label: '30 minutes', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '1 day', value: 1440 },
];

export default function AddEventScreen({
  onSave,
  onCancel,
  editingEvent,
}) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [reminderMinutes, setReminderMinutes] = useState(null);

  useEffect(() => {
    if (editingEvent) {
      setName(editingEvent.name || '');
      setDate(editingEvent.date || '');
      setTime(editingEvent.time || '');
      setDescription(editingEvent.description || '');

      if (editingEvent.reminderDate && editingEvent.reminderTime) {
        const eventAt = new Date(
          `${editingEvent.date}T${editingEvent.time}:00`
        );

        const reminderAt = new Date(
          `${editingEvent.reminderDate}T${editingEvent.reminderTime}:00`
        );

        const minutes = Math.round(
          (eventAt.getTime() - reminderAt.getTime()) / 60000
        );

        const matchingOption = reminderOptions.find(
          (option) => option.value === minutes
        );

        setReminderMinutes(matchingOption ? minutes : null);
      } else {
        setReminderMinutes(null);
      }
    } else {
      setName('');
      setDate('');
      setTime('');
      setDescription('');
      setReminderMinutes(null);
    }
  }, [editingEvent]);

  const validDate = (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return false;
    }

    const [year, month, day] = value.split('-').map(Number);
    const parsed = new Date(year, month - 1, day);

    return (
      parsed.getFullYear() === year &&
      parsed.getMonth() === month - 1 &&
      parsed.getDate() === day
    );
  };

  const formatDate = (value) => {
    return [
      value.getFullYear(),
      String(value.getMonth() + 1).padStart(2, '0'),
      String(value.getDate()).padStart(2, '0'),
    ].join('-');
  };

  const formatTime = (value) => {
    return (
      String(value.getHours()).padStart(2, '0') +
      ':' +
      String(value.getMinutes()).padStart(2, '0')
    );
  };

  const handleSave = () => {
    if (!name.trim() || !date.trim() || !time.trim()) {
      Alert.alert(
        'Missing Information',
        'Please enter event name, date and time.'
      );
      return;
    }

    if (!validDate(date)) {
      Alert.alert('Invalid Date', 'Enter date in YYYY-MM-DD format.');
      return;
    }

    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
      Alert.alert('Invalid Time', 'Enter time in HH:MM format.');
      return;
    }

    const eventAt = new Date(
      Number(date.slice(0, 4)),
      Number(date.slice(5, 7)) - 1,
      Number(date.slice(8, 10)),
      Number(time.slice(0, 2)),
      Number(time.slice(3, 5))
    );

    if (eventAt <= new Date()) {
      Alert.alert(
        'Invalid Date',
        'Please select a future date and time.'
      );
      return;
    }

    let reminderDate = null;
    let reminderTime = null;
    let reminderLabel = 'No reminder';

    if (reminderMinutes !== null) {
      const reminderAt = new Date(
        eventAt.getTime() - reminderMinutes * 60000
      );

      if (reminderAt <= new Date()) {
        Alert.alert(
          'Invalid Reminder',
          'The selected reminder time has already passed. Choose an earlier reminder option or a later event time.'
        );
        return;
      }

      reminderDate = formatDate(reminderAt);
      reminderTime = formatTime(reminderAt);

      const selectedOption = reminderOptions.find(
        (option) => option.value === reminderMinutes
      );

      reminderLabel = selectedOption
        ? `${selectedOption.label} before`
        : 'No reminder';
    }

    onSave({
      ...(editingEvent || {}),
      name: name.trim(),
      date,
      time,
      description: description.trim(),
      reminder: reminderLabel,
      reminderDate,
      reminderTime,
      reminderId: editingEvent?.reminderId || null,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel} style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            {editingEvent ? 'Edit Event' : 'Create Event'}
          </Text>

          <Text style={styles.headerSubtitle}>
            Plan your special moments
          </Text>
        </View>

        <View style={styles.formCard}>
          <View style={styles.iconCircle}>
            <Text style={styles.eventIcon}>📅</Text>
          </View>

          <Text style={styles.formTitle}>
            {editingEvent ? 'Update Your Event' : 'New Event Details'}
          </Text>

          <Text style={styles.formSubtitle}>
            Fill in the details below
          </Text>

          <Text style={styles.label}>Event Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event name"
            placeholderTextColor="#A49ABF"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Event Date *</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#A49ABF"
            value={date}
            onChangeText={setDate}
          />

          <Text style={styles.label}>Event Time *</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM (Example: 14:30)"
            placeholderTextColor="#A49ABF"
            value={time}
            onChangeText={setTime}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Write about your event..."
            placeholderTextColor="#A49ABF"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text style={styles.label}>🔔 Reminder</Text>
          <Text style={styles.reminderHint}>
            Choose when you want to receive a notification.
          </Text>

          <View style={styles.reminderGrid}>
            {reminderOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.reminderOption,
                  reminderMinutes === option.value &&
                    styles.selectedReminder,
                ]}
                onPress={() => setReminderMinutes(option.value)}
              >
                <Text
                  style={[
                    styles.reminderOptionText,
                    reminderMinutes === option.value &&
                      styles.selectedReminderText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.noReminderButton,
              reminderMinutes === null && styles.selectedNoReminder,
            ]}
            onPress={() => setReminderMinutes(null)}
          >
            <Text
              style={[
                styles.noReminderText,
                reminderMinutes === null &&
                  styles.selectedReminderText,
              ]}
            >
              No Reminder
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>
              {editingEvent ? '✓  Update Event' : '+  Save Event'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Make every moment memorable ✨
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F3FF',
  },

  scrollContent: {
    paddingBottom: 30,
  },

  header: {
    backgroundColor: '#51408C',
    paddingTop: 45,
    paddingBottom: 45,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#6B5AA5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  backText: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 36,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  headerSubtitle: {
    color: '#E4DFFF',
    fontSize: 14,
    marginTop: 7,
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -20,
    padding: 22,
    borderRadius: 22,
    elevation: 5,
  },

  iconCircle: {
    width: 65,
    height: 65,
    borderRadius: 22,
    backgroundColor: '#EEE9FF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },

  eventIcon: {
    fontSize: 30,
  },

  formTitle: {
    color: '#34285E',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  formSubtitle: {
    color: '#9389AB',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },

  label: {
    color: '#51408C',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 13,
  },

  input: {
    backgroundColor: '#F8F6FF',
    borderWidth: 1,
    borderColor: '#E5DFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 14,
    color: '#34285E',
  },

  descriptionInput: {
    height: 100,
  },

  reminderHint: {
    color: '#9389AB',
    fontSize: 12,
    marginBottom: 12,
  },

  reminderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  reminderOption: {
    width: '47%',
    padding: 13,
    borderRadius: 11,
    backgroundColor: '#F3F0FC',
    borderWidth: 1,
    borderColor: '#E5DFFF',
    alignItems: 'center',
  },

  selectedReminder: {
    backgroundColor: '#51408C',
    borderColor: '#51408C',
  },

  reminderOptionText: {
    color: '#51408C',
    fontWeight: '600',
    fontSize: 13,
  },

  selectedReminderText: {
    color: '#FFFFFF',
  },

  noReminderButton: {
    backgroundColor: '#F3F0FC',
    borderRadius: 11,
    padding: 13,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5DFFF',
  },

  selectedNoReminder: {
    backgroundColor: '#51408C',
    borderColor: '#51408C',
  },

  noReminderText: {
    color: '#51408C',
    fontWeight: 'bold',
    fontSize: 13,
  },

  saveButton: {
    backgroundColor: '#51408C',
    padding: 16,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 28,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  cancelButton: {
    backgroundColor: '#EEE9FF',
    padding: 15,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 12,
  },

  cancelButtonText: {
    color: '#51408C',
    fontSize: 15,
    fontWeight: 'bold',
  },

  footer: {
    color: '#9389AB',
    textAlign: 'center',
    marginTop: 22,
    fontSize: 13,
  },
});
