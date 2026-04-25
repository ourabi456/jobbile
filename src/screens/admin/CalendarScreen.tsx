import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const JOB_DAYS = new Set([2, 3, 4, 7, 8, 10, 14, 15, 16, 17, 18, 21, 23, 25, 29, 30]);

const scheduleItems = [
  { time: '8:00 AM',  color: Colors.green, title: 'HVAC Maintenance',      sub: 'Alex T. · Johnson ✓ Done' },
  { time: '10:30 AM', color: Colors.brand, title: 'Plumbing Repair',        sub: 'Alex T. · Smith Office' },
  { time: '1:00 PM',  color: Colors.amber, title: 'AC Installation',        sub: 'Maria K. · Metro Plaza' },
  { time: '2:00 PM',  color: Colors.brand, title: 'Electrical Inspection',  sub: 'James R. · Harbor View' },
  { time: '4:00 PM',  color: Colors.gray,  title: 'Annual Inspection',      sub: 'Alex T. · Harbor View Apts' },
];

export default function CalendarScreen() {
  const [selectedDay, setSelectedDay] = useState(18);
  const days = [30, 31, ...Array.from({ length: 30 }, (_, i) => i + 1)];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Schedule</Text>
        <TouchableOpacity onPress={() => Alert.alert('New job created!')}><Text style={styles.addBtn}>+ Job</Text></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Calendar header */}
        <View style={styles.calHeader}>
          <Text style={styles.calMonth}>April 2026</Text>
          <View style={styles.calNav}>
            <TouchableOpacity style={styles.calNavBtn}><Text style={styles.calNavText}>‹</Text></TouchableOpacity>
            <TouchableOpacity style={styles.calNavBtn}><Text style={styles.calNavText}>›</Text></TouchableOpacity>
          </View>
        </View>

        {/* Day labels */}
        <View style={styles.weekLabels}>
          {DAYS.map((d) => <Text key={d} style={styles.dayLabel}>{d}</Text>)}
        </View>

        {/* Grid */}
        <View style={styles.calGrid}>
          {days.map((day, i) => {
            const isOther  = i < 2;
            const isToday  = day === 18 && !isOther;
            const hasJobs  = JOB_DAYS.has(day) && !isOther;
            const isSelected = day === selectedDay && !isOther;
            return (
              <TouchableOpacity
                key={`${day}-${i}`}
                style={[styles.calDay, isToday && styles.calDayToday, isSelected && !isToday && styles.calDaySelected]}
                onPress={() => !isOther && setSelectedDay(day)}
              >
                <Text style={[styles.calDayText, isOther && styles.calDayOther, isToday && styles.calDayTextToday]}>
                  {day}
                </Text>
                {hasJobs && <View style={[styles.dot, isToday && styles.dotWhite]} />}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionHdr}>THURSDAY, APRIL {selectedDay}</Text>
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
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: Colors.bg },
  navBar:         { height: 56, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  navTitle:       { flex: 1, fontSize: 18, fontWeight: '600', color: Colors.text },
  addBtn:         { fontSize: 13, fontWeight: '600', color: Colors.brand },
  calHeader:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 14, paddingBottom: 8 },
  calMonth:       { fontSize: 18, fontWeight: '700', color: Colors.text },
  calNav:         { flexDirection: 'row', gap: 8 },
  calNavBtn:      { width: 32, height: 32, borderRadius: 8, backgroundColor: Colors.brandLight, alignItems: 'center', justifyContent: 'center' },
  calNavText:     { fontSize: 16, color: Colors.brand, fontWeight: '600' },
  weekLabels:     { flexDirection: 'row', paddingHorizontal: 10, marginBottom: 4 },
  dayLabel:       { flex: 1, textAlign: 'center', fontSize: 11, fontWeight: '600', color: Colors.muted, paddingVertical: 4 },
  calGrid:        { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, gap: 2 },
  calDay:         { width: '13.28%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 100, position: 'relative' },
  calDayToday:    { backgroundColor: Colors.brand },
  calDaySelected: { backgroundColor: Colors.brandLight },
  calDayText:     { fontSize: 14, color: Colors.text },
  calDayOther:    { color: '#D1D5DB' },
  calDayTextToday:{ color: '#fff', fontWeight: '600' },
  dot:            { position: 'absolute', bottom: 3, width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.brand },
  dotWhite:       { backgroundColor: '#fff' },
  sectionHdr:     { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, fontSize: 13, fontWeight: '600', color: Colors.muted, letterSpacing: 0.6 },
  scheduleItem:   { flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border },
  scheduleTime:   { fontSize: 12, color: Colors.muted, minWidth: 52, paddingTop: 2, fontWeight: '500' },
  scheduleBar:    { width: 3, borderRadius: 2 },
  scheduleInfo:   { flex: 1 },
  scheduleTitle:  { fontSize: 14, fontWeight: '600', color: Colors.text },
  scheduleSub:    { fontSize: 12, color: Colors.muted, marginTop: 2 },
});
