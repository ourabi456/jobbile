import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Map View</Text>
      </View>
      <View style={styles.mapArea}>
        <Text style={styles.mapIcon}>🗺️</Text>
        <Text style={styles.mapTitle}>Live Map</Text>
        <Text style={styles.mapSub}>Your location and today's job sites shown here.{'\n'}GPS tracking active during jobs.</Text>

        <View style={styles.locationCard}>
          <Text style={styles.locPin}>📍</Text>
          <View style={styles.locInfo}>
            <Text style={styles.locName}>Smith Office Park</Text>
            <Text style={styles.locSub}>Current job · 0.2 mi away</Text>
          </View>
          <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>Active</Text></View>
        </View>

        <View style={styles.locationCard}>
          <Text style={styles.locPin}>📌</Text>
          <View style={styles.locInfo}>
            <Text style={styles.locName}>Metro Plaza</Text>
            <Text style={styles.locSub}>Next job · 1.4 mi away</Text>
          </View>
          <View style={styles.upcomingBadge}><Text style={styles.upcomingBadgeText}>1:00 PM</Text></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:              { flex: 1, backgroundColor: Colors.bg },
  navBar:            { height: 56, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  navTitle:          { fontSize: 18, fontWeight: '600', color: Colors.text },
  mapArea:           { flex: 1, backgroundColor: '#dbeafe', alignItems: 'center', justifyContent: 'center', padding: 20, gap: 12 },
  mapIcon:           { fontSize: 48 },
  mapTitle:          { fontSize: 16, fontWeight: '600', color: '#1e40af' },
  mapSub:            { fontSize: 13, color: '#3b82f6', textAlign: 'center', lineHeight: 20 },
  locationCard:      { backgroundColor: Colors.white, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  locPin:            { fontSize: 20 },
  locInfo:           { flex: 1 },
  locName:           { fontSize: 13, fontWeight: '600', color: Colors.text },
  locSub:            { fontSize: 11, color: Colors.muted, marginTop: 2 },
  activeBadge:       { backgroundColor: Colors.brandLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  activeBadgeText:   { fontSize: 10, fontWeight: '600', color: Colors.brand },
  upcomingBadge:     { backgroundColor: Colors.amberLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  upcomingBadgeText: { fontSize: 10, fontWeight: '600', color: Colors.amber },
});
