import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import { useStore } from '../../store/useStore';

export default function ClientsScreen() {
  const [search, setSearch] = useState('');
  const clients = useStore((s) => s.clients);

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Clients</Text>
        <TouchableOpacity onPress={() => Alert.alert('Add client form opened')}><Text style={styles.addBtn}>+ Add</Text></TouchableOpacity>
      </View>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍  Search clients…"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={Colors.muted}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {filtered.map((client) => (
          <TouchableOpacity key={client.id} style={styles.clientRow} onPress={() => Alert.alert(client.name, `${client.email}\n${client.phone}`)}>
            <View style={[styles.avatar, { backgroundColor: client.color }]}>
              <Text style={styles.avatarText}>{client.initials}</Text>
            </View>
            <View style={styles.clientInfo}>
              <Text style={styles.clientName}>{client.name}</Text>
              <Text style={styles.clientSub}>{client.location} · {client.jobCount} jobs · ${client.totalRevenue.toLocaleString()} total</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: Colors.bg },
  navBar:      { height: 56, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  navTitle:    { flex: 1, fontSize: 18, fontWeight: '600', color: Colors.text },
  addBtn:      { fontSize: 13, fontWeight: '600', color: Colors.brand },
  searchBox:   { padding: 10, paddingHorizontal: 16, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  searchInput: { borderWidth: 1.5, borderColor: Colors.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: Colors.text },
  clientRow:   { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.border, backgroundColor: Colors.white },
  avatar:      { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText:  { fontWeight: '600', fontSize: 15, color: Colors.text },
  clientInfo:  { flex: 1 },
  clientName:  { fontSize: 15, fontWeight: '600', color: Colors.text },
  clientSub:   { fontSize: 12, color: Colors.muted, marginTop: 2 },
  chevron:     { fontSize: 18, color: Colors.muted },
});
