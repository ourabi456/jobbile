import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';

const CLIENTS = ['David Smith — Smith Office', 'Sarah Johnson — Residence', 'Metro Plaza LLC', 'Harbor View Apts'];
const TECHS   = ['Alex Turner', 'Maria Kim', 'James Rivera'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];

export default function NewJobScreen() {
  const navigation = useNavigation();
  const [title, setTitle]       = useState('');
  const [client, setClient]     = useState(CLIENTS[0]);
  const [tech, setTech]         = useState(TECHS[0]);
  const [date, setDate]         = useState('2026-04-19');
  const [time, setTime]         = useState('09:00');
  const [priority, setPriority] = useState('Medium');
  const [desc, setDesc]         = useState('');

  const handleCreate = () => {
    if (!title.trim()) { Alert.alert('Job title is required'); return; }
    Alert.alert('Job created!', `"${title}" assigned to ${tech}.\nTechnician has been notified 🔔`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>←</Text></TouchableOpacity>
        <Text style={styles.navTitle}>New Job</Text>
      </View>
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <FieldLabel label="Job Title" />
          <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g. HVAC Service Visit" placeholderTextColor={Colors.muted} />

          <FieldLabel label="Client" />
          <View style={styles.selectBox}>
            {CLIENTS.map((c) => (
              <TouchableOpacity key={c} style={[styles.selectOpt, client === c && styles.selectOptActive]} onPress={() => setClient(c)}>
                <Text style={[styles.selectOptText, client === c && styles.selectOptTextActive]}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <FieldLabel label="Assign Technician" />
          <View style={styles.pillRow}>
            {TECHS.map((t) => (
              <TouchableOpacity key={t} style={[styles.pill, tech === t && styles.pillActive]} onPress={() => setTech(t)}>
                <Text style={[styles.pillText, tech === t && styles.pillTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            <View style={styles.half}>
              <FieldLabel label="Date" />
              <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" placeholderTextColor={Colors.muted} />
            </View>
            <View style={styles.half}>
              <FieldLabel label="Time" />
              <TextInput style={styles.input} value={time} onChangeText={setTime} placeholder="HH:MM" placeholderTextColor={Colors.muted} />
            </View>
          </View>

          <FieldLabel label="Priority" />
          <View style={styles.pillRow}>
            {PRIORITIES.map((p) => (
              <TouchableOpacity key={p} style={[styles.pill, priority === p && styles.pillActive]} onPress={() => setPriority(p)}>
                <Text style={[styles.pillText, priority === p && styles.pillTextActive]}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <FieldLabel label="Description" />
          <TextInput style={[styles.input, styles.textArea]} value={desc} onChangeText={setDesc} placeholder="Job details…" placeholderTextColor={Colors.muted} multiline numberOfLines={4} textAlignVertical="top" />

          <TouchableOpacity style={styles.btnCreate} onPress={handleCreate}>
            <Text style={styles.btnCreateText}>Create Job &amp; Notify Tech 🔔</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function FieldLabel({ label }: { label: string }) {
  return <Text style={styles.fieldLabel}>{label}</Text>;
}

const styles = StyleSheet.create({
  safe:               { flex: 1, backgroundColor: Colors.bg },
  navBar:             { height: 56, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  navTitle:           { flex: 1, fontSize: 18, fontWeight: '600', color: Colors.text },
  back:               { fontSize: 20, color: Colors.brand, marginRight: 8 },
  scroll:             { flex: 1 },
  form:               { padding: 16, gap: 4 },
  fieldLabel:         { fontSize: 13, fontWeight: '500', color: Colors.text, marginTop: 14, marginBottom: 6 },
  input:              { borderWidth: 1.5, borderColor: Colors.border, borderRadius: 12, padding: 14, fontSize: 15, color: Colors.text, backgroundColor: Colors.white },
  textArea:           { height: 96 },
  selectBox:          { backgroundColor: Colors.white, borderRadius: 12, overflow: 'hidden', borderWidth: 1.5, borderColor: Colors.border },
  selectOpt:          { padding: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  selectOptActive:    { backgroundColor: Colors.brandLight },
  selectOptText:      { fontSize: 14, color: Colors.text },
  selectOptTextActive:{ color: Colors.brand, fontWeight: '600' },
  pillRow:            { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill:               { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.white },
  pillActive:         { backgroundColor: Colors.brand, borderColor: Colors.brand },
  pillText:           { fontSize: 13, color: Colors.text },
  pillTextActive:     { color: '#fff', fontWeight: '600' },
  row:                { flexDirection: 'row', gap: 12 },
  half:               { flex: 1 },
  btnCreate:          { backgroundColor: Colors.brand, borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 24 },
  btnCreateText:      { color: '#fff', fontSize: 16, fontWeight: '600' },
});
