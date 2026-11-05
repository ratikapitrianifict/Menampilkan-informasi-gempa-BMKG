import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [gempa, setGempa] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGempa = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json'
      );
      if (!response.ok) {
        throw new Error(`HTTP status: ${response.status}`);
      }
      const json = await response.json();
      if (json && json.Infogempa && json.Infogempa.gempa) {
        setGempa(json.Infogempa.gempa);
      } else {
        throw new Error('Format data tidak sesuai');
      }
    } catch (err) {
      Alert.alert(
        'Gagal Memuat Data',
        'Tidak dapat mengambil data gempa terkini dari BMKG. Pastikan koneksi internet aktif.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Informasi Gempa Terkini</Text>
          <Text style={styles.subtitle}>
            Sumber: BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)
          </Text>
        </View>

        {/* Tombol Tampilkan Data Gempa */}
        <TouchableOpacity
          style={styles.button}
          onPress={fetchGempa}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>TAMPILKAN DATA GEMPA</Text>
          )}
        </TouchableOpacity>

        {/* Teks Petunjuk Awal Sebelum Data Dimuat */}
        {!gempa && !loading && (
          <Text style={styles.emptyText}>
            Klik tombol di atas untuk memuat data gempa terkini dari BMKG.
          </Text>
        )}

        {/* Card Detail Gempa Terkini */}
        {gempa && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Detail Gempa Terkini</Text>

            <View style={styles.item}>
              <Text style={styles.label}>Wilayah:</Text>
              <Text style={styles.value}>{gempa.Wilayah}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Tanggal & Jam:</Text>
              <Text style={styles.value}>
                {gempa.Tanggal} - {gempa.Jam}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Kekuatan (Magnitude):</Text>
              <Text style={[styles.value, styles.magnitudeValue]}>
                {gempa.Magnitude} SR
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Kedalaman:</Text>
              <Text style={styles.value}>{gempa.Kedalaman}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Koordinat:</Text>
              <Text style={styles.value}>
                {gempa.Coordinates} ({gempa.Lintang} - {gempa.Bujur})
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Potensi:</Text>
              <Text style={styles.value}>{gempa.Potensi}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Dirasakan:</Text>
              <Text style={styles.value}>{gempa.Dirasakan || '-'}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  emptyText: {
    marginTop: 24,
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  card: {
    marginTop: 24,
    width: '100%',
    backgroundColor: '#F0F4F8',
    borderRadius: 16,
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B5B84',
    textAlign: 'center',
    marginBottom: 18,
  },
  item: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 3,
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 20,
  },
  magnitudeValue: {
    color: '#DC2626',
    fontSize: 15,
  },
});
