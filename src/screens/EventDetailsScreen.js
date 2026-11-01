
import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

export default function EventDetailsScreen({
  event,
  onBack,
  onEdit,
  onDelete,
}) {
  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Event not found.</Text>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete && onDelete(event),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Event Details</Text>
        <Text style={styles.headerSubtitle}>
          All information about your event
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.detailsCard}>
          <View style={styles.iconCircle}>
            <Text style={styles.eventIcon}>🎉</Text>
          </View>

          <Text style={styles.eventName}>{event.name}</Text>

          <Text style={styles.statusText}>YOUR PLANNED EVENT</Text>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Text style={styles.emoji}>📅</Text>
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>EVENT DATE</Text>
              <Text style={styles.detailValue}>{event.date}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Text style={styles.emoji}>🕒</Text>
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>EVENT TIME</Text>
              <Text style={styles.detailValue}>{event.time}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Text style={styles.emoji}>📝</Text>
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>DESCRIPTION</Text>
              <Text style={styles.detailValue}>
                {event.description || 'No description added'}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Text style={styles.emoji}>🔔</Text>
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>REMINDER</Text>
              <Text style={styles.detailValue}>
                {event.reminder || 'No reminder details added'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onEdit && onEdit(event)}
          >
            <Text style={styles.editButtonText}>✏️  Edit Event</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.deleteButtonText}>🗑️  Delete Event</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.backHomeButton}
          onPress={onBack}
        >
          <Text style={styles.backHomeText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F3FF',
  },

  header: {
    backgroundColor: '#51408C',
    paddingTop: 45,
    paddingBottom: 40,
    paddingHorizontal: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#6B5AA5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  backArrow: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 36,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
  },

  headerSubtitle: {
    color: '#E4DFFF',
    fontSize: 14,
    marginTop: 7,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 30,
  },

  detailsCard: {
    backgroundColor: '#FFFFFF',
    marginTop: -18,
    borderRadius: 22,
    padding: 22,
    elevation: 4,
  },

  iconCircle: {
    width: 75,
    height: 75,
    borderRadius: 25,
    backgroundColor: '#EEE9FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },

  eventIcon: {
    fontSize: 36,
  },

  eventName: {
    color: '#34285E',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  statusText: {
    color: '#8B7AB9',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 1,
  },

  divider: {
    height: 1,
    backgroundColor: '#EAE5F7',
    marginVertical: 22,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  detailIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#F3F0FC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emoji: {
    fontSize: 22,
  },

  detailInfo: {
    flex: 1,
    marginLeft: 14,
  },

  detailLabel: {
    color: '#9389AB',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  detailValue: {
    color: '#34285E',
    fontSize: 15,
    fontWeight: '600',
  },

  editButton: {
    backgroundColor: '#51408C',
    padding: 16,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 10,
  },

  editButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  deleteButton: {
    backgroundColor: '#FFF0F0',
    padding: 16,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 12,
  },

  deleteButtonText: {
    color: '#D64545',
    fontSize: 15,
    fontWeight: 'bold',
  },

  backHomeButton: {
    backgroundColor: '#EEE9FF',
    padding: 15,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 18,
  },

  backHomeText: {
    color: '#51408C',
    fontSize: 15,
    fontWeight: 'bold',
  },

  emptyText: {
    color: '#34285E',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },

  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
