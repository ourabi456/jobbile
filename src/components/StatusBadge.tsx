import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import type { JobStatus } from '../store/useStore';

interface Props { status: JobStatus; style?: object }

const config = {
  completed:   { bg: Colors.greenLight,  text: Colors.green,  label: 'Done ✓' },
  in_progress: { bg: Colors.brandLight,  text: Colors.brand,  label: 'Active ⚡' },
  scheduled:   { bg: Colors.amberLight,  text: Colors.amber,  label: 'Upcoming' },
  draft:       { bg: '#F3F4F6',          text: Colors.gray,   label: 'Scheduled' },
} as const;

export default function StatusBadge({ status, style }: Props) {
  const c = config[status] ?? config.draft;
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }, style]}>
      <Text style={[styles.text, { color: c.text }]}>{c.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  text:  { fontSize: 11, fontWeight: '600' },
});
