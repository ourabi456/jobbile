import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import { useStore } from '../../store/useStore';
import type { Invoice } from '../../store/useStore';

const statusConfig = {
  sent:  { bg: Colors.amberLight, color: Colors.amber, label: 'Sent' },
  paid:  { bg: Colors.greenLight, color: Colors.green, label: 'Paid ✓' },
  draft: { bg: '#F3F4F6',         color: Colors.gray,  label: 'Draft' },
  void:  { bg: Colors.redLight,   color: Colors.red,   label: 'Void' },
} as const;

function InvoiceListItem({ inv, onPress }: { inv: Invoice; onPress: () => void }) {
  const cfg = statusConfig[inv.status];
  return (
    <TouchableOpacity style={styles.invRow} onPress={onPress}>
      <View style={styles.invLeft}>
        <Text style={styles.invNumber}>{inv.number}</Text>
        <Text style={styles.invClient}>{inv.clientName}</Text>
      </View>
      <View style={styles.invRight}>
        <Text style={[styles.invAmount, { color: inv.status === 'paid' ? Colors.green : Colors.text }]}>
          ${inv.total.toFixed(2)}
        </Text>
        <View style={[styles.invBadge, { backgroundColor: cfg.bg }]}>
          <Text style={[styles.invBadgeText, { color: cfg.color }]}>{cfg.label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function InvoiceScreen() {
  const { invoices } = useStore();
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [paidIds, setPaidIds] = useState<Set<string>>(new Set());

  if (selected) {
    const inv = { ...selected, status: paidIds.has(selected.id) ? 'paid' as const : selected.status };
    const cfg = statusConfig[inv.status];
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => setSelected(null)}><Text style={styles.back}>←</Text></TouchableOpacity>
          <Text style={styles.navTitle} numberOfLines={1}>Invoice #{inv.number.split('-').pop()}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.invHeader}>
            <View>
              <Text style={styles.invHeaderSub}>Client</Text>
              <Text style={styles.invHeaderName}>{inv.clientName}</Text>
            </View>
            <View style={[styles.invBadgeLg, { backgroundColor: cfg.bg }]}>
              <Text style={[styles.invBadgeLgText, { color: cfg.color }]}>{cfg.label}</Text>
            </View>
          </View>
          <View style={styles.section}><Text style={styles.sectionLabel}>JOB</Text><Text style={styles.sectionValue}>{inv.jobTitle}</Text></View>
          <View style={styles.section}><Text style={styles.sectionLabel}>DUE DATE</Text><Text style={styles.sectionValue}>{inv.dueDate} (30 days)</Text></View>
          <Text style={styles.sectionHdr}>LINE ITEMS</Text>
          <View style={styles.card}>
            {inv.lineItems.map((item) => (
              <View key={item.id} style={styles.lineRow}>
                <View><Text style={styles.lineDesc}>{item.description}</Text><Text style={styles.lineSub}>@ ${item.unitPrice}/unit</Text></View>
                <Text style={styles.lineAmount}>${item.total.toFixed(2)}</Text>
              </View>
            ))}
            <View style={styles.lineRow}><Text style={styles.lineSubtotal}>Subtotal</Text><Text style={styles.lineSubtotalAmt}>${inv.subtotal.toFixed(2)}</Text></View>
            <View style={styles.lineRow}><Text style={styles.lineSubtotal}>Tax (8%)</Text><Text style={styles.lineSubtotalAmt}>${inv.tax.toFixed(2)}</Text></View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Due</Text>
              <Text style={styles.totalVal}>${inv.total.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.btnPrimary} onPress={() => { setPaidIds((s) => new Set([...s, inv.id])); Alert.alert(`Payment of $${inv.total.toFixed(2)} received!`); }}>
              <Text style={styles.btnPrimaryText}>Charge ${inv.total.toFixed(2)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOutline} onPress={() => Alert.alert('Invoice emailed!')}>
              <Text style={styles.btnOutlineText}>📧 Email</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.btnGray} onPress={() => Alert.alert('PDF downloaded!')}><Text style={styles.btnGrayText}>📥 Download PDF</Text></TouchableOpacity>
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Invoices</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHdr}>ALL INVOICES</Text>
        {invoices.map((inv) => (
          <InvoiceListItem key={inv.id} inv={{ ...inv, status: paidIds.has(inv.id) ? 'paid' : inv.status }} onPress={() => setSelected(inv)} />
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: Colors.bg },
  navBar:          { height: 56, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  navTitle:        { flex: 1, fontSize: 18, fontWeight: '600', color: Colors.text },
  back:            { fontSize: 20, color: Colors.brand, marginRight: 8 },
  sectionHdr:      { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, fontSize: 13, fontWeight: '600', color: Colors.muted, letterSpacing: 0.6 },
  invRow:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Colors.white, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.border },
  invLeft:         {},
  invRight:        { alignItems: 'flex-end', gap: 4 },
  invNumber:       { fontSize: 14, fontWeight: '600', color: Colors.text },
  invClient:       { fontSize: 12, color: Colors.muted, marginTop: 2 },
  invAmount:       { fontSize: 15, fontWeight: '700' },
  invBadge:        { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  invBadgeText:    { fontSize: 11, fontWeight: '600' },
  invHeader:       { backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  invHeaderSub:    { fontSize: 13, color: Colors.muted },
  invHeaderName:   { fontSize: 16, fontWeight: '600', color: Colors.text },
  invBadgeLg:      { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  invBadgeLgText:  { fontSize: 13, fontWeight: '600' },
  section:         { padding: 14, borderBottomWidth: 1, borderBottomColor: Colors.border },
  sectionLabel:    { fontSize: 12, color: Colors.muted, marginBottom: 3, fontWeight: '500' },
  sectionValue:    { fontSize: 15, color: Colors.text },
  card:            { backgroundColor: Colors.white, borderRadius: 16, marginHorizontal: 16, marginBottom: 8, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2 },
  lineRow:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border },
  lineDesc:        { fontSize: 14, color: Colors.text },
  lineSub:         { fontSize: 11, color: Colors.muted },
  lineAmount:      { fontSize: 14, fontWeight: '600', color: Colors.text },
  lineSubtotal:    { fontSize: 14, color: Colors.muted },
  lineSubtotalAmt: { fontSize: 14, color: Colors.muted },
  totalRow:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: Colors.brandLight },
  totalLabel:      { fontSize: 15, fontWeight: '600', color: Colors.brand },
  totalVal:        { fontSize: 22, fontWeight: '700', color: Colors.brand },
  btnRow:          { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingTop: 12 },
  btnPrimary:      { flex: 1, backgroundColor: Colors.brand, borderRadius: 14, padding: 16, alignItems: 'center' },
  btnPrimaryText:  { color: '#fff', fontSize: 15, fontWeight: '600' },
  btnOutline:      { flex: 1, borderWidth: 2, borderColor: Colors.brand, borderRadius: 14, padding: 14, alignItems: 'center' },
  btnOutlineText:  { color: Colors.brand, fontSize: 15, fontWeight: '500' },
  btnGray:         { flex: 1, borderWidth: 1, borderColor: Colors.border, borderRadius: 14, padding: 12, alignItems: 'center' },
  btnGrayText:     { fontSize: 14, color: Colors.muted },
});
