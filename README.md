# Menampilkan Informasi Gempa BMKG

Aplikasi mobile berbasis **React Native (Expo)** untuk menampilkan informasi gempa bumi terkini secara real-time dari API resmi **BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)**.

## 📱 Fitur Utama
- Menampilkan data gempa bumi terkini secara otomatis dari BMKG:
  - **Wilayah**
  - **Tanggal & Jam**
  - **Kekuatan (Magnitude)**
  - **Kedalaman**
  - **Koordinat (Lintang & Bujur)**
  - **Potensi Tsunami / Gempa Susulan**
  - **Wilayah yang Merasakan (Skala MMI)**
- UI responsif dan elegan sesuai standar desain mobile.
- Indikator loading interaktif saat memuat data dari internet.
- Penanganan error apabila koneksi internet terputus.

## 🔗 Sumber API
- BMKG TEWS Autogempa: `https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json`

## 🚀 Cara Menjalankan

### 1. Aplikasi Mobile (React Native / Expo)
Pastikan telah menginstal [Node.js](https://nodejs.org/).
```bash
# Install dependencies
npm install

# Jalankan Expo
npx expo start
```
Buka aplikasi **Expo Go** di perangkat Android / iOS, lalu scan kode QR yang muncul di terminal.

### 2. Backend (Express.js - Opsional)
Tersedia juga server backend Express pada folder `backend/`:
```bash
cd backend
npm install
npm run dev
```
Endpoint tersedia di:
- `http://localhost:3000/` (Data Profil Mahasiswa)
- `http://localhost:3000/gempa` (Proxy data gempa BMKG)
