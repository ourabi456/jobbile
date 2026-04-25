import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { useStore } from '../store/useStore';

export default function LoginScreen() {
  const [email, setEmail]       = useState('alex@fieldflow.app');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading]   = useState(false);
  const setUser = useStore((s) => s.setUser);

  const handleLogin = async () => {
    if (!email || !password) { Alert.alert('Please enter email and password'); return; }
    setLoading(true);
    // Demo: pick role based on email prefix
    await new Promise((r) => setTimeout(r, 900));
    const isAdmin = email.toLowerCase().includes('admin');
    setUser(
      { id: '1', name: isAdmin ? 'Jordan Admin' : 'Alex Turner', email, role: isAdmin ? 'admin' : 'technician' },
      'demo-token-123'
    );
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <View style={styles.logo}>
          <View style={styles.logoIcon}><Text style={styles.logoEmoji}>🔧</Text></View>
          <Text style={styles.logoTitle}>Jobbile</Text>
          <Text style={styles.logoSub}>Field Service Management</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="you@example.com"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
          />

          <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnPrimaryText}>Sign In</Text>}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} /><Text style={styles.dividerText}>or</Text><View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.btnOutline} onPress={handleLogin}>
            <Text style={styles.btnOutlineText}>⌾  Use Face ID / Fingerprint</Text>
          </TouchableOpacity>

          <Text style={styles.forgotText}>Forgot password?</Text>
          <Text style={styles.hint}>Tip: use "admin@…" email for Admin view</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: Colors.white },
  container:      { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  logo:           { alignItems: 'center', marginBottom: 40 },
  logoIcon:       { width: 72, height: 72, backgroundColor: Colors.brand, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  logoEmoji:      { fontSize: 32 },
  logoTitle:      { fontSize: 26, fontWeight: '700', color: Colors.text },
  logoSub:        { fontSize: 14, color: Colors.muted, marginTop: 4 },
  form:           { gap: 0 },
  label:          { fontSize: 13, fontWeight: '500', color: Colors.text, marginBottom: 6, marginTop: 16 },
  input:          { borderWidth: 1.5, borderColor: Colors.border, borderRadius: 12, padding: 14, fontSize: 15, color: Colors.text },
  btnPrimary:     { backgroundColor: Colors.brand, borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 24 },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  divider:        { flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 10 },
  dividerLine:    { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText:    { fontSize: 13, color: Colors.muted },
  btnOutline:     { borderWidth: 2, borderColor: Colors.brand, borderRadius: 14, padding: 14, alignItems: 'center' },
  btnOutlineText: { color: Colors.brand, fontSize: 15, fontWeight: '500' },
  forgotText:     { textAlign: 'center', fontSize: 13, color: Colors.muted, marginTop: 16 },
  hint:           { textAlign: 'center', fontSize: 11, color: Colors.muted, marginTop: 8 },
});
