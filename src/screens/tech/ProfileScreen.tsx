import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import { useStore } from '../../store/useStore';

export default function ProfileScreen() {
  const { user, logout } = useStore();

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Profile</Text>
        <TouchableOpacity onPress={handleLogout}><Text style={styles.logout}>Log Out</Text></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}><Text style={styles.avatarEmoji}>👨‍🔧</Text></View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.role}>Technician · Senior</Text>
          <View style={styles.availBadge}><Text style={styles.availText}>● Available</Text></View>
        </View>

        <View style={styles.statsRow}>
          {[['142', 'Jobs Done'], ['4.9★', 'Rating'], ['$8.4k', 'This Month']].map(([val, lbl]) => (
            <View key={lbl} style={styles.statCard}>
              <Text style={styles.statVal}>{val}</Text>
              <Text style={styles.statLbl}>{lbl}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionHdr}>SETTINGS</Text>
        <View style={styles.card}>
          {[
            ['📡 Offline Mode', 'Enabled', Colors.green],
            ['🔔 Push Notifications', 'On ›', Colors.muted],
            ['📍 GPS Tracking', 'Active', Colors.green],
            ['⌾ Face ID', 'Enabled', Colors.green],
          ].map(([label, value, color], i) => (
            <TouchableOpacity
              key={label as string}
              style={[styles.settingRow, i === 3 && { borderBottomWidth: 0 }]}
              onPress={() => Alert.alert(label as string)}
            >
              <Text style={styles.settingLabel}>{label as string}</Text>
              <Text style={[styles.settingValue, { color: color as string }]}>{value as string}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: Colors.bg },
  navBar:        { height: 56, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  navTitle:      { flex: 1, fontSize: 18, fontWeight: '600', color: Colors.text },
  logout:        { fontSize: 13, fontWeight: '500', color: Colors.brand },
  avatarSection: { backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border, alignItems: 'center', padding: 24 },
  avatar:        { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.brandLight, borderWidth: 3, borderColor: Colors.brand, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarEmoji:   { fontSize: 32 },
  name:          { fontSize: 20, fontWeight: '700', color: Colors.text },
  role:          { fontSize: 13, color: Colors.muted, marginTop: 4 },
  availBadge:    { marginTop: 8, backgroundColor: Colors.greenLight, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  availText:     { fontSize: 12, fontWeight: '600', color: Colors.green },
  statsRow:      { flexDirection: 'row', gap: 10, padding: 12 },
  statCard:      { flex: 1, backgroundColor: Colors.white, borderRadius: 14, padding: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2 },
  statVal:       { fontSize: 22, fontWeight: '700', color: Colors.text },
  statLbl:       { fontSize: 11, color: Colors.muted, marginTop: 2 },
  sectionHdr:    { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, fontSize: 13, fontWeight: '600', color: Colors.muted, letterSpacing: 0.6 },
  card:          { backgroundColor: Colors.white, borderRadius: 16, marginHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2 },
  settingRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.border },
  settingLabel:  { fontSize: 14, color: Colors.text },
  settingValue:  { fontSize: 14, fontWeight: '600' },
});
