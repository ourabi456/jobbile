import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { useStore } from '../../store/useStore';
import JobCard from '../../components/JobCard';
import type { TechStackParams } from '../../navigation/TechNavigator';

export default function DashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<TechStackParams>>();
  const { user, jobs, isOffline } = useStore();

  const todayJobs = jobs.slice(0, 4);
  const completed = todayJobs.filter((j) => j.status === 'completed').length;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Good morning, {user?.name?.split(' ')[0]} 👋</Text>
        <TouchableOpacity>
          <Text style={styles.bell}>🔔</Text>
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>⚠ Offline — changes queued</Text>
        </View>
      )}

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroDate}>{today}</Text>
          <Text style={styles.heroName}>{user?.name}</Text>
          <View style={styles.heroStats}>
            <View><Text style={styles.heroStatVal}>{todayJobs.length}</Text><Text style={styles.heroStatLbl}>Jobs Today</Text></View>
            <View><Text style={styles.heroStatVal}>$340</Text><Text style={styles.heroStatLbl}>Est. Earnings</Text></View>
            <View><Text style={styles.heroStatVal}>{completed}/{todayJobs.length}</Text><Text style={styles.heroStatLbl}>Completed</Text></View>
          </View>
        </View>

        {/* Sync Banner */}
        <View style={styles.syncBanner}>
          <Text style={styles.syncText}>⟳  Syncing 2 changes…</Text>
          <Text style={styles.syncTime}>Just now</Text>
        </View>

        <Text style={styles.sectionHdr}>TODAY'S JOBS</Text>
        {todayJobs.map((job) => (
          <JobCard key={job.id} job={job} onPress={() => navigation.navigate('JobDetail', { jobId: job.id })} />
        ))}

        <Text style={styles.sectionHdr}>PROGRESS</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Jobs completed today</Text>
            <Text style={styles.progressCount}>{completed} / {todayJobs.length}</Text>
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${(completed / todayJobs.length) * 100}%` as any }]} />
          </View>
          <Text style={styles.progressSub}>{todayJobs.length - completed} jobs remaining</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: Colors.bg },
  navBar:        { height: 56, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  navTitle:      { flex: 1, fontSize: 18, fontWeight: '600', color: Colors.text },
  bell:          { fontSize: 22 },
  notifDot:      { width: 8, height: 8, backgroundColor: Colors.red, borderRadius: 4, position: 'absolute', top: 0, right: 0 },
  offlineBanner: { backgroundColor: Colors.red, padding: 8, alignItems: 'center' },
  offlineText:   { color: '#fff', fontSize: 12, fontWeight: '600' },
  scroll:        { flex: 1 },
  hero:          { margin: 12, backgroundColor: Colors.brandDark, borderRadius: 20, padding: 20 },
  heroDate:      { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  heroName:      { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 12 },
  heroStats:     { flexDirection: 'row', gap: 20 },
  heroStatVal:   { fontSize: 20, fontWeight: '700', color: '#fff' },
  heroStatLbl:   { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 1 },
  syncBanner:    { margin: 8, marginHorizontal: 16, backgroundColor: Colors.amberLight, borderWidth: 1, borderColor: '#FDE68A', borderRadius: 12, padding: 10, flexDirection: 'row', alignItems: 'center' },
  syncText:      { flex: 1, fontSize: 13, color: Colors.amber },
  syncTime:      { fontSize: 11, color: Colors.amber, opacity: 0.7 },
  sectionHdr:    { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, fontSize: 13, fontWeight: '600', color: Colors.muted, letterSpacing: 0.6 },
  progressCard:  { backgroundColor: Colors.white, borderRadius: 16, marginHorizontal: 16, marginBottom: 8, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2 },
  progressRow:   { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: 13, color: Colors.muted },
  progressCount: { fontSize: 13, fontWeight: '600', color: Colors.text },
  progressBg:    { height: 6, backgroundColor: Colors.border, borderRadius: 3, overflow: 'hidden', marginBottom: 6 },
  progressFill:  { height: '100%', backgroundColor: Colors.brand, borderRadius: 3 },
  progressSub:   { fontSize: 12, color: Colors.muted },
});
