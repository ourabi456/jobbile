import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { useStore } from '../../store/useStore';
import JobCard from '../../components/JobCard';
import type { TechStackParams } from '../../navigation/TechNavigator';

export default function JobsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<TechStackParams>>();
  const jobs = useStore((s) => s.jobs);

  const thisWeek   = jobs.filter((j) => !j.scheduledAt.startsWith('Apr 1'));
  const past7Days  = jobs.filter((j) => j.scheduledAt.startsWith('Apr 1'));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>All Jobs</Text>
        <TouchableOpacity><Text style={styles.filter}>Filter</Text></TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHdr}>THIS WEEK</Text>
        {thisWeek.map((job) => (
          <JobCard key={job.id} job={job} onPress={() => navigation.navigate('JobDetail', { jobId: job.id })} />
        ))}
        {past7Days.length > 0 && (
          <>
            <Text style={styles.sectionHdr}>PAST 7 DAYS</Text>
            {past7Days.map((job) => (
              <JobCard key={job.id} job={job} onPress={() => navigation.navigate('JobDetail', { jobId: job.id })} />
            ))}
          </>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: Colors.bg },
  navBar:     { height: 56, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  navTitle:   { flex: 1, fontSize: 18, fontWeight: '600', color: Colors.text },
  filter:     { fontSize: 13, fontWeight: '500', color: Colors.brand },
  scroll:     { flex: 1 },
  sectionHdr: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, fontSize: 13, fontWeight: '600', color: Colors.muted, letterSpacing: 0.6 },
});
