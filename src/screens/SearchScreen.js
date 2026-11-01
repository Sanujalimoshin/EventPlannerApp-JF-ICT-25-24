
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function SearchScreen({
  events = [],
  onDetails,
  onBack,
}) {
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState('name');

  const filteredEvents = events.filter((event) => {
    const value = searchText.trim().toLowerCase();

    if (!value) {
      return false;
    }

    if (searchType === 'name') {
      return (event.name || '').toLowerCase().includes(value);
    }

    return (event.date || '').includes(value);
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Search Events</Text>

        <Text style={styles.headerSubtitle}>
          Find your planned events easily
        </Text>
      </View>

      <View style={styles.searchCard}>
        <Text style={styles.cardTitle}>Find an Event 🔍</Text>

        <Text style={styles.label}>Search By</Text>

        <View style={styles.optionRow}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              searchType === 'name' && styles.selectedOption,
            ]}
            onPress={() => {
              setSearchType('name');
              setSearchText('');
            }}
          >
            <Text
              style={[
                styles.optionText,
                searchType === 'name' && styles.selectedOptionText,
              ]}
            >
              Event Name
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              searchType === 'date' && styles.selectedOption,
            ]}
            onPress={() => {
              setSearchType('date');
              setSearchText('');
            }}
          >
            <Text
              style={[
                styles.optionText,
                searchType === 'date' && styles.selectedOptionText,
              ]}
            >
              Event Date
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder={
            searchType === 'name'
              ? 'Enter event name...'
              : 'YYYY-MM-DD'
          }
          placeholderTextColor="#A49ABF"
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => setSearchText('')}
        >
          <Text style={styles.clearText}>✕  Clear Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>Search Results</Text>
        <Text style={styles.resultCount}>
          {filteredEvents.length} Found
        </Text>
      </View>

      <ScrollView
        style={styles.resultsList}
        contentContainerStyle={styles.resultsContent}
      >
        {!searchText.trim() ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🔎</Text>
            <Text style={styles.emptyTitle}>Start Searching</Text>
            <Text style={styles.emptyText}>
              Enter an event name or date to find your events.
            </Text>
          </View>
        ) : filteredEvents.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>No Events Found</Text>
            <Text style={styles.emptyText}>
              No matching events. Try another search.
            </Text>
          </View>
        ) : (
          filteredEvents.map((event, index) => (
            <TouchableOpacity
              key={event.id ?? event.event_id ?? index}
              style={styles.eventCard}
              onPress={() => onDetails && onDetails(event)}
            >
              <View style={styles.eventIcon}>
                <Text style={styles.eventEmoji}>📅</Text>
              </View>

              <View style={styles.eventInfo}>
                <Text style={styles.eventName}>
                  {event.name}
                </Text>

                <Text style={styles.eventDate}>
                  📆 {event.date}
                </Text>

                <Text style={styles.eventTime}>
                  🕒 {event.time}
                </Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))
        )}
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
    paddingBottom: 35,
    paddingHorizontal: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#6B5AA5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  backText: {
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

  searchCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    marginTop: -15,
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#34285E',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: '#51408C',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  optionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },

  optionButton: {
    flex: 1,
    backgroundColor: '#F3F0FC',
    padding: 12,
    borderRadius: 11,
    alignItems: 'center',
  },

  selectedOption: {
    backgroundColor: '#51408C',
  },

  optionText: {
    color: '#51408C',
    fontWeight: '600',
    fontSize: 13,
  },

  selectedOptionText: {
    color: '#FFFFFF',
  },

  searchInput: {
    backgroundColor: '#F8F6FF',
    borderWidth: 1,
    borderColor: '#E5DFFF',
    borderRadius: 12,
    padding: 14,
    color: '#34285E',
    fontSize: 14,
  },

  clearButton: {
    backgroundColor: '#EEE9FF',
    padding: 13,
    borderRadius: 11,
    alignItems: 'center',
    marginTop: 12,
  },

  clearText: {
    color: '#51408C',
    fontWeight: 'bold',
    fontSize: 14,
  },

  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 22,
    marginTop: 25,
    marginBottom: 12,
  },

  resultsTitle: {
    color: '#34285E',
    fontSize: 19,
    fontWeight: 'bold',
  },

  resultCount: {
    color: '#51408C',
    fontWeight: 'bold',
    fontSize: 13,
  },

  resultsList: {
    flex: 1,
  },

  resultsContent: {
    paddingHorizontal: 18,
    paddingBottom: 25,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    marginTop: 8,
  },

  emptyIcon: {
    fontSize: 42,
    marginBottom: 12,
  },

  emptyTitle: {
    color: '#34285E',
    fontSize: 18,
    fontWeight: 'bold',
  },

  emptyText: {
    color: '#9389AB',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },

  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },

  eventIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#EEE9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  eventEmoji: {
    fontSize: 23,
  },

  eventInfo: {
    flex: 1,
    marginLeft: 13,
  },

  eventName: {
    color: '#34285E',
    fontSize: 16,
    fontWeight: 'bold',
  },

  eventDate: {
    color: '#756A91',
    fontSize: 12,
    marginTop: 6,
  },

  eventTime: {
    color: '#756A91',
    fontSize: 12,
    marginTop: 4,
  },

  arrow: {
    color: '#51408C',
    fontSize: 28,
  },
});
