import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, type RouteProp } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { useStore } from '../../store/useStore';
import StatusBadge from '../../components/StatusBadge';
import type { TechStackParams } from '../../navigation/TechNavigator';

type Route = RouteProp<TechStackParams, 'JobDetail'>;

export default function JobDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const { jobs, updateJobStatus } = useStore();
  const [signed, setSigned] = useState(false);

  const job = jobs.find((j) => j.id === route.params.jobId);
  if (!job) return null;

  const markComplete = () => {
    if (!signed) { Alert.alert('Signature Required', 'Please capture client signature first.'); return; }
    Alert.alert('Complete Job', 'Mark this job as complete?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Complete', onPress: () => { updateJobStatus(job.id, 'completed'); navigation.goBack(); } },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>←</Text></TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>{job.title}</Text>
        <TouchableOpacity onPress={() => Alert.alert('Options', 'Share job details')}><Text style={styles.more}>⋯</Text></TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Status bar */}
        <View style={styles.statusRow}>
          <StatusBadge status={job.status} style={{ paddingHorizontal: 14, paddingVertical: 6 }} />
          <Text style={styles.priority}>Priority: <Text style={{ color: Colors.amber, fontWeight: '600' }}>{job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}</Text></Text>
        </View>

        {/* Client */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CLIENT</Text>
          <Text style={styles.sectionValue}>{job.clientName}</Text>
          <Text style={styles.sectionSub}>client@example.com · (415) 555-0192</Text>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>LOCATION</Text>
          <Text style={styles.sectionValue}>{job.address}</Text>
          <TouchableOpacity style={styles.mapThumb} onPress={() => Alert.alert('Opening Maps…')}>
            <Text style={styles.mapThumbText}>🗺️  View in Maps</Text>
          </TouchableOpacity>
        </View>

        {/* Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SCHEDULED WINDOW</Text>
          <Text style={styles.sectionValue}>Today {job.scheduledAt} – +1.5 hrs</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>JOB DESCRIPTION</Text>
          <Text style={styles.desc}>{job.description}</Text>
        </View>

        {/* Photos */}
        <Text style={styles.sectionHdr}>PHOTOS (2)</Text>
        <View style={styles.photoGrid}>
          <View style={styles.photoThumb}><Text style={{ fontSize: 28 }}>🔧</Text></View>
          <View style={styles.photoThumb}><Text style={{ fontSize: 28 }}>💧</Text></View>
          <TouchableOpacity style={[styles.photoThumb, styles.photoAdd]} onPress={() => Alert.alert('Camera opened')}>
            <Text style={{ fontSize: 24, color: Colors.muted }}>➕</Text>
          </TouchableOpacity>
        </View>

        {/* Signature */}
        <Text style={styles.sectionHdr}>CLIENT SIGNATURE</Text>
        <TouchableOpacity
          style={[styles.sigPad, signed && styles.sigPadSigned]}
          onPress={() => { setSigned(!signed); if (!signed) Alert.alert('Signature captured!'); }}
        >
          <Text style={{ fontSize: 28 }}>{signed ? '✅' : '✍️'}</Text>
          <Text style={{ fontSize: 13, color: Colors.muted }}>{signed ? 'Signature captured' : 'Tap to capture signature'}</Text>
        </TouchableOpacity>

        {/* Line Items */}
        {job.lineItems && (
          <>
            <Text style={styles.sectionHdr}>LINE ITEMS</Text>
            <View style={styles.invoiceCard}>
              {job.lineItems.map((item) => (
                <View key={item.id} style={styles.invoiceRow}>
                  <Text style={styles.invoiceLabel}>{item.description}</Text>
                  <Text style={styles.invoiceAmount}>${item.total.toFixed(2)}</Text>
                </View>
              ))}
              <View style={styles.invoiceTotal}>
                <Text style={styles.invoiceTotalLabel}>Total</Text>
                <Text style={styles.invoiceTotalVal}>${job.totalAmount?.toFixed(2)}</Text>
              </View>
            </View>
          </>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.btnGreen, job.status === 'completed' && styles.btnCompleted]}
          onPress={markComplete}
          disabled={job.status === 'completed'}
        >
          <Text style={styles.btnGreenText}>
            {job.status === 'completed' ? '✓ Job Completed!' : '✓ Mark Job Complete'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => Alert.alert('Job paused')}>
          <Text style={styles.btnOutlineText}>Pause / Reschedule</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: Colors.bg },
  navBar:           { height: 56, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  back:             { fontSize: 20, color: Colors.brand, padding: 4 },
  navTitle:         { flex: 1, fontSize: 17, fontWeight: '600', color: Colors.text, marginHorizontal: 8 },
  more:             { fontSize: 20, color: Colors.brand },
  scroll:           { flex: 1 },
  statusRow:        { backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14 },
  priority:         { fontSize: 13, color: Colors.muted },
  section:          { padding: 14, borderBottomWidth: 1, borderBottomColor: Colors.border },
  sectionLabel:     { fontSize: 12, color: Colors.muted, marginBottom: 3, fontWeight: '500' },
  sectionValue:     { fontSize: 15, color: Colors.text, fontWeight: '500' },
  sectionSub:       { fontSize: 13, color: Colors.muted, marginTop: 2 },
  desc:             { fontSize: 14, color: Colors.muted, lineHeight: 22 },
  mapThumb:         { marginTop: 8, backgroundColor: '#bfdbfe', borderRadius: 10, height: 80, alignItems: 'center', justifyContent: 'center' },
  mapThumbText:     { fontSize: 15, color: '#1e40af' },
  sectionHdr:       { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, fontSize: 13, fontWeight: '600', color: Colors.muted, letterSpacing: 0.6 },
  photoGrid:        { flexDirection: 'row', gap: 6, paddingHorizontal: 16, paddingBottom: 16 },
  photoThumb:       { flex: 1, aspectRatio: 1, borderRadius: 10, backgroundColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  photoAdd:         { borderWidth: 2, borderColor: Colors.border, borderStyle: 'dashed', backgroundColor: 'transparent' },
  sigPad:           { marginHorizontal: 16, marginBottom: 16, borderWidth: 2, borderColor: Colors.border, borderStyle: 'dashed', borderRadius: 16, height: 120, alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#FAFAFA' },
  sigPadSigned:     { backgroundColor: Colors.greenLight, borderColor: Colors.green, borderStyle: 'solid' },
  invoiceCard:      { backgroundColor: Colors.white, borderRadius: 16, marginHorizontal: 16, marginBottom: 8, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2 },
  invoiceRow:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border },
  invoiceLabel:     { fontSize: 14, color: Colors.text },
  invoiceAmount:    { fontSize: 14, fontWeight: '600', color: Colors.text },
  invoiceTotal:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: Colors.brandLight },
  invoiceTotalLabel:{ fontSize: 15, fontWeight: '600', color: Colors.brand },
  invoiceTotalVal:  { fontSize: 22, fontWeight: '700', color: Colors.brand },
  footer:           { backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.border, padding: 12, paddingBottom: 24, gap: 8 },
  btnGreen:         { backgroundColor: Colors.green, borderRadius: 14, padding: 16, alignItems: 'center' },
  btnCompleted:     { backgroundColor: '#15803D' },
  btnGreenText:     { color: '#fff', fontSize: 16, fontWeight: '600' },
  btnOutline:       { borderWidth: 2, borderColor: Colors.brand, borderRadius: 14, padding: 14, alignItems: 'center' },
  btnOutlineText:   { color: Colors.brand, fontSize: 15, fontWeight: '500' },
});
