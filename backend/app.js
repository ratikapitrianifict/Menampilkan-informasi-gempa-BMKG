import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    nama: 'Ratika Pitriani',
    alamat: 'Karawang',
    hobi: 'Tidur'
  });
});

// Endpoint untuk mengambil data gempa terkini dari BMKG
app.get('/gempa', async (req, res) => {
  try {
    const response = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Gagal mengambil data dari BMKG' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
