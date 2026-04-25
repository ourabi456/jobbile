import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Colors } from '../../theme/colors';
import { useStore } from '../../store/useStore';
import type { AdminTabParams } from '../../navigation/AdminNavigator';

type Nav = BottomTabNavigationProp<AdminTabParams>;

const scheduleItems = [
  { time: '8:00 AM',  color: Colors.green,  title: 'HVAC Maintenance',       sub: 'Alex T. · Johnson Residence ✓' },
  { time: '10:30 AM', color: Colors.brand,  title: 'Plumbing Repair',         sub: 'Alex T. · Smith Office — In Progress' },
  { time: '1:00 PM',  color: Colors.amber,  title: 'AC Installation',         sub: 'Maria K. · Metro Plaza' },
  { time: '2:00 PM',  color: Colors.brand,  title: 'Electrical Inspection',   sub: 'James R. · Harbor View Apts' },
];

const teamStatus = [
  { name: '👨‍🔧 Alex Turner',  status: 'On Job',    bg: Colors.brandLight, color: Colors.brand },
  { name: '👩‍🔧 Maria Kim',    status: 'En Route',  bg: Colors.amberLight, color: Colors.amber },
  { name: '👨‍🔧 James Rivera', status: 'Available', bg: Colors.greenLight, color: Colors.green },
];

export default function AdminDashboardScreen() {
  const navigation = useNavigation<Nav>();
  const invoices = useStore((s) => s.invoices);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Jobbile Admin</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Calendar')}><Text style={styles.addJob}>+ Job</Text></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsRow}>
          {[['12', 'Active Jobs', Colors.brand], ['$4.2k', 'This Week', Colors.green], ['3', 'Invoices Due', Colors.amber]].map(([val, lbl, color]) => (
            <View key={lbl as string} style={styles.statCard}>
              <Text style={[styles.statVal, { color: color as string }]}>{val as string}</Text>
              <Text style={styles.statLbl}>{lbl as string}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionHdr}>TODAY'S SCHEDULE</Text>
        {scheduleItems.map((item) => (
          <View key={item.title} style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>{item.time}</Text>
            <View style={[styles.scheduleBar, { backgroundColor: item.color }]} />
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleTitle}>{item.title}</Text>
              <Text style={styles.scheduleSub}>{item.sub}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionHdr}>TEAM STATUS</Text>
        <View style={styles.card}>
          {teamStatus.map((m, i) => (
            <View key={m.name} style={[styles.row, i === 2 && { borderBottomWidth: 0 }]}>
              <Text style={styles.rowLabel}>{m.name}</Text>
              <View style={[styles.badge, { backgroundColor: m.bg }]}>
                <Text style={[styles.badgeText, { color: m.color }]}>{m.status}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionHdr}>PENDING INVOICES</Text>
        <View style={styles.card}>
          {invoices.map((inv, i) => (
            <TouchableOpacity key={inv.id} style={[styles.row, i === 2 && { borderBottomWidth: 0 }]} onPress={() => navigation.navigate('Invoices')}>
              <Text style={styles.rowLabel}>{inv.number} · {inv.clientName.split(' ')[0]}</Text>
              <Text style={[styles.invoiceAmt, { color: inv.status === 'paid' ? Colors.green : inv.status === 'sent' ? Colors.amber : Colors.red }]}>
                {inv.status === 'paid' ? 'Paid ✓' : `$${inv.total.toFixed(2)} ›`}
              </Text>
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
  addJob:        { fontSize: 13, fontWeight: '600', color: Colors.brand },
  statsRow:      { flexDirection: 'row', gap: 10, padding: 12 },
  statCard:      { flex: 1, backgroundColor: Colors.white, borderRadius: 14, padding: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2 },
  statVal:       { fontSize: 22, fontWeight: '700' },
  statLbl:       { fontSize: 11, color: Colors.muted, marginTop: 2 },
  sectionHdr:    { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, fontSize: 13, fontWeight: '600', color: Colors.muted, letterSpacing: 0.6 },
  scheduleItem:  { flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border },
  scheduleTime:  { fontSize: 12, color: Colors.muted, minWidth: 52, paddingTop: 2, fontWeight: '500' },
  scheduleBar:   { width: 3, borderRadius: 2 },
  scheduleInfo:  { flex: 1 },
  scheduleTitle: { fontSize: 14, fontWeight: '600', color: Colors.text },
  scheduleSub:   { fontSize: 12, color: Colors.muted, marginTop: 2 },
  card:          { backgroundColor: Colors.white, borderRadius: 16, marginHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2, overflow: 'hidden' },
  row:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  rowLabel:      { fontSize: 14, color: Colors.text },
  badge:         { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  badgeText:     { fontSize: 11, fontWeight: '600' },
  invoiceAmt:    { fontSize: 14, fontWeight: '600' },
});
