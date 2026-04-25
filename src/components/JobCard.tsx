import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import StatusBadge from './StatusBadge';
import type { Job } from '../store/useStore';

const stripeColor = {
  completed:   Colors.green,
  in_progress: Colors.brand,
  scheduled:   Colors.amber,
  draft:       '#D1D5DB',
} as const;

interface Props { job: Job; onPress: () => void }

export default function JobCard({ job, onPress }: Props) {
  const isActive = job.status === 'in_progress';
  return (
    <TouchableOpacity
      style={[styles.card, isActive && styles.activeCard]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={[styles.stripe, { backgroundColor: stripeColor[job.status] }]} />
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{job.title}</Text>
          <StatusBadge status={job.status} />
        </View>
        <Text style={styles.meta}>🕗 {job.scheduledAt}  ·  📍 {job.clientName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:       { backgroundColor: Colors.white, borderRadius: 16, marginHorizontal: 16, marginVertical: 4, flexDirection: 'row', overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2, borderWidth: 1.5, borderColor: 'transparent' },
  activeCard: { borderColor: Colors.brand, backgroundColor: Colors.brandLight },
  stripe:     { width: 4 },
  body:       { flex: 1, padding: 12 },
  header:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  title:      { fontSize: 15, fontWeight: '600', color: Colors.text, flex: 1, marginRight: 8 },
  meta:       { fontSize: 12, color: Colors.muted },
});
