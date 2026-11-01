
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function HomeScreen({
  events,
  onAdd,
  onSearch,
  onDetails,
  onEdit,
  onDelete,
}) {
  const now = new Date();

  const getDate = (event) =>
    new Date(`${event.date}T${event.time}:00`);

  const upcoming = events
    .filter(event => getDate(event) >= now)
    .sort((a, b) => getDate(a) - getDate(b));

  const past = events
    .filter(event => getDate(event) < now)
    .sort((a, b) => getDate(b) - getDate(a));

  const EventItem = ({ event, index }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => onDetails(event)}
      activeOpacity={0.85}
    >
      <View style={[
        styles.eventIcon,
        { backgroundColor: index % 2 === 0 ? '#EAE3FF' : '#FFE8EF' }
      ]}>
        <Text style={styles.iconText}>
          {index % 2 === 0 ? '🎉' : '🎂'}
        </Text>
      </View>

      <View style={styles.eventInfo}>
        <Text style={styles.eventName}>{event.name}</Text>
        <Text style={styles.eventDate}>
          📅 {event.date}
        </Text>
        <Text style={styles.eventTime}>
          🕒 {event.time}
        </Text>
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => onEdit(event)}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => onDelete(event)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.brand}>EVENTIFY ✦</Text>
        <Text style={styles.greeting}>Make Every Moment</Text>
        <Text style={styles.greetingHighlight}>Special!</Text>
        <Text style={styles.subtitle}>
          Organize your events beautifully.
        </Text>
      </View>

      <View style={styles.statsCard}>
        <View>
          <Text style={styles.statsLabel}>MY EVENTS</Text>
          <Text style={styles.statsNumber}>{events.length}</Text>
          <Text style={styles.statsDescription}>
            Total events planned
          </Text>
        </View>
        <Text style={styles.bigEmoji}>🗓️</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={onAdd}
        >
          <Text style={styles.addText}>＋ Create Event</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={onSearch}
        >
          <Text style={styles.searchText}>⌕ Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <Text style={styles.badge}>{upcoming.length}</Text>
      </View>

      {upcoming.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>🌷</Text>
          <Text style={styles.emptyTitle}>Nothing planned yet!</Text>
          <Text style={styles.emptyText}>
            Create an event and make a new memory.
          </Text>
        </View>
      ) : (
        upcoming.map((event, index) => (
          <EventItem
            key={event.id}
            event={event}
            index={index}
          />
        ))
      )}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Past Events</Text>
        <Text style={styles.badge}>{past.length}</Text>
      </View>

      {past.length === 0 ? (
        <Text style={styles.noPast}>No past events available.</Text>
      ) : (
        past.map((event, index) => (
          <EventItem
            key={event.id}
            event={event}
            index={index}
          />
        ))
      )}

      <Text style={styles.footer}>
        ✦ Make memories that last forever ✦
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F3FF',
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#51408C',
    marginHorizontal: -20,
    paddingHorizontal: 24,
    paddingTop: 42,
    paddingBottom: 32,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  brand: {
    color: '#E8DEFF',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 27,
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
  },
  greetingHighlight: {
    color: '#E6CFFF',
    fontSize: 31,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#E0D8F5',
    marginTop: 10,
    fontSize: 14,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 22,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  statsLabel: {
    color: '#8878B6',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  statsNumber: {
    color: '#51408C',
    fontSize: 38,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statsDescription: {
    color: '#9991AA',
    fontSize: 13,
  },
  bigEmoji: {
    fontSize: 48,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 27,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#7259B8',
    padding: 15,
    borderRadius: 13,
    alignItems: 'center',
  },
  addText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  searchButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8CEEF',
  },
  searchText: {
    color: '#51408C',
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 19,
    color: '#30264F',
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: '#E7DFFF',
    color: '#6049A0',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 17,
    marginBottom: 13,
    flexDirection: 'row',
    elevation: 2,
  },
  eventIcon: {
    width: 52,
    height: 52,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  iconText: {
    fontSize: 25,
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    color: '#392D61',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  eventDate: {
    color: '#777084',
    fontSize: 13,
    marginBottom: 4,
  },
  eventTime: {
    color: '#777084',
    fontSize: 13,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 9,
    marginTop: 12,
  },
  editBtn: {
    backgroundColor: '#EEE9FF',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 8,
  },
  editText: {
    color: '#6049A0',
    fontWeight: 'bold',
  },
  deleteBtn: {
    backgroundColor: '#FFE9EE',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 8,
  },
  deleteText: {
    color: '#D34B69',
    fontWeight: 'bold',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyEmoji: {
    fontSize: 35,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#51408C',
  },
  emptyText: {
    fontSize: 13,
    color: '#9991AA',
    marginTop: 7,
    textAlign: 'center',
  },
  noPast: {
    color: '#9991AA',
    marginBottom: 20,
  },
  footer: {
    color: '#9287AE',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 35,
    fontSize: 12,
  },
});
