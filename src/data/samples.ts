import { SampleJournal } from '../types';

export const SAMPLE_JOURNALS: SampleJournal[] = [
  {
    id: 'deep-learning-medical',
    title: 'Penerapan Deep Learning CNN untuk Deteksi Dini Retinopati Diabetik',
    field: 'Kecerdasan Buatan & Kedokteran',
    text: `ABSTRAK & TEKS JURNAL:
Judul: Deteksi Dini Retinopati Diabetik Menggunakan Arsitektur Residual Convolutional Neural Network (ResNet-50) Berbasis Citra Fundus Mata

1. Pendahuluan
Retinopati diabetik (RD) merupakan salah satu komplikasi mikrovaskular utama dari diabetes melitus yang dapat menyebabkan kebutaan permanen jika tidak terdeteksi secara dini. Keterbatasan tenaga spesialis oftalmologi di daerah terpencil menuntut adanya sistem pembantu diagnosis otomatis yang akurat dan berkecepatan tinggi.

2. Metode Penelitian
Penelitian ini menggunakan pendekatan kuantitatif eksperimental dengan mengembangkan arsitektur Deep Learning ResNet-50 yang telah dimodifikasi dengan mekanisme spatial attention. Dataset primer diperoleh dari kumpulan citra fundus publik EyePACS dan Messidor-2 yang mencakup total 35.126 citra retina dengan 5 tingkat keparahan RD (Normal, Ringan, Sedang, Parah, Proliferatif). Tahap pra-pemrosesan mencakup CLAHE (Contrast Limited Adaptive Histogram Equalization) untuk standarisasi pencahayaan dan augmentasi data berbasis rotasi dan cropping. Model dilatih menggunakan optimizer AdamW dengan learning rate 1e-4, batch size 32, dan loss function Focal Loss untuk mengatasi ketidakseimbangan kelas. Validasi silang 5-fold (5-fold cross-validation) diterapkan untuk menguji stabilitas model.

3. Hasil dan Pembahasan
Model ResNet-50 dengan Spatial Attention mencapai tingkat akurasi klasifikasi keseluruhan sebesar 96,4% pada dataset pengujian independen. Nilai sensitivitas untuk deteksi tingkat keparahan tinggi (Proliferatif RD) mencapai 98,2% dengan spesifisitas 95,7%. Area under the ROC curve (AUC-ROC) bernilai 0,984. Dibandingkan dengan baseline model VGG-16 (akurasi 89,1%) dan DenseNet-121 (akurasi 92,8%), model yang diusulkan menunjukkan reduksi false negative sebesar 42% pada kasus stadium awal. Waktu inferensi per citra adalah 45 milidetik pada GPU NVIDIA RTX 4090 dan 180 milidetik pada CPU server standar.

4. Kesimpulan
Integrasi modul Spatial Attention pada arsitektur ResNet-50 terbukti meningkatkan akurasi dan sensitivitas deteksi dini retinopati diabetik secara signifikan. Sistem ini memiliki potensi besar untuk diimplementasikan sebagai alat skrining awal pada fasilitas kesehatan primer. Keterbatasan penelitian ini terletak pada belum diujinya model terhadap citra retina dengan kualitas optik rendah atau katarak sekunder. Penelitian selanjutnya disarankan untuk mengintegrasikan model multimodal yang menggabungkan riwayat klinis pasien dengan data citra dan memperluas validasi pada populasi Asia Tenggara.`
  },
  {
    id: 'renewable-energy',
    title: 'Efisiensi Sel Surya Perovskite-Silikon Tandem pada Iklim Tropis Lembap',
    field: 'Teknik Energi Terbarukan & Material',
    text: `ABSTRAK & TEKS JURNAL:
Judul: Evaluasi Degradasi dan Efisiensi Daya Sel Surya Tandem Monolitik Perovskite/Silicon Heterojunction di Bawah Paparan Iklim Tropis Kelembaban Tinggi

1. Latar Belakang
Sel surya tandem perovskite/silikon menawarkan terobosan efisiensi konversi daya di atas batas teoretis Shockley-Queisser untuk sel tunggal silikon. Namun, stabilitas operasional jangka panjang pada kondisi tropis dengan kelembaban relatif di atas 80% dan suhu ambien tinggi masih menjadi tantangan komersialisasi utama.

2. Metode Penelitian
Penelitian eksperimental laboratorium dan lapangan ini merancang sel surya tandem monolitik 2-terminal berukuran 1 cm² dengan lapisan perovskite berbasis Cs0.05FA0.85MA0.10Pb(I0.83Br0.17)3 dan enkapsulasi multilapis fluoropolimer hidrofobik. Pengujian ketahanan dilakukan melalui accelerated environmental chamber test (IEC 61215: 85°C dan 85% RH selama 1000 jam) serta uji luar ruangan (outdoor field test) di stasiun meteorologi Jakarta selama 6 bulan. Pengukuran kurva J-V dilakukan secara periodik menggunakan solar simulator AM 1.5G, disertai analisis spektroskopi impedansi (EIS) dan XRD untuk mendeteksi degradasi fase kristal.

3. Hasil dan Temuan
Sel tandem yang baru dibuat menunjukkan Power Conversion Efficiency (PCE) awal sebesar 29,4% pada kondisi standar (STC). Setelah uji percepatan 1000 jam pada 85°C/85% RH, sel yang dilindungi enkapsulasi fluoropolimer mempertahankan 91,2% dari efisiensi awal (PCE akhir 26,8%), sedangkan sel kontrol tanpa enkapsulasi khusus mengalami degradasi drastis hingga kehilangan 68% efisiensi dalam 250 jam. Selama 6 bulan pemantauan luar ruangan, degradasi tahunan terproyeksi adalah 1,8% per tahun. Analisis XRD menunjukkan tidak adanya pembentukan fasa PbI2 sekunder pada lapisan aktif berenkapsulasi.

4. Kesimpulan
Teknik enkapsulasi multilapis fluoropolimer hidrofobik terbukti efektif mencegah penetrasi uap air dan degradasi termal pada sel surya tandem perovskite-silikon di lingkungan tropis ekstrim. Temuan ini memberikan dasar teknis penting untuk fabrikasi modul surya fotovoltaik generasi baru dengan masa pakai komersial lebih dari 20 tahun. Penelitian lanjutan diperlukan untuk menskalakan proses deposisi ke luas area modul 100 cm² (sub-modul) dengan keseragaman lapisan atomik.`
  },
  {
    id: 'social-media-mental-health',
    title: 'Pengaruh Penggunaan Algoritma Feed Singkat terhadap Rentang Atensi Remaja',
    field: 'Psikologi Kognitif & Ilmu Komunikasi',
    text: `ABSTRAK & TEKS JURNAL:
Judul: Analisis Longitudinal Pengaruh Konsumsi Konten Video Format Pendek (Short-Form Video) terhadap Sustained Attention dan Kinerja Akademik Mahasiswa Tingkat Pertama

1. Pendahuluan
Ledakan popularitas platform video format mikro (seperti TikTok, Instagram Reels, dan YouTube Shorts) telah mengubah pola konsumsi informasi generasi muda. Kekhawatiran meningkat mengenai dampak stimulasi cepat dan berulang terhadap kemampuan mempertahankan konsentrasi kognitif (sustained attention span).

2. Metode Penelitian
Studi longitudinal prospektif ini melibatkan 420 mahasiswa tingkat pertama dari 4 universitas negeri di Indonesia selama rentang waktu 8 bulan (2 semester akademik). Pengumpulan data dilakukan melalui pencatatan waktu layar otomatis (screen time tracking app), Continuous Performance Test (CPT-3) untuk mengukur performa perhatian berkelanjutan, serta kuesioner baku impulsivitas Barratt Impulsiveness Scale (BIS-11). Pemodelan struktural SEM (Structural Equation Modeling) dan analisis regresi linear bertingkat digunakan untuk menguji korelasi antara durasi penggunaan harian dengan skor ketahanan atensi dan indeks prestasi kumulatif (IPK).

3. Hasil Penelitian
Peserta dengan konsumsi video pendek rata-rata > 150 menit per hari menunjukkan penurunan skor Sustained Attention Index (CPT-3) sebesar 24,6% secara signifikan (p < 0,001) dibanding kelompok kontrol (< 30 menit/hari). Terdapat korelasi positif kuat antara frekuensi scrolling dengan skor impulsivitas attentional (r = 0,64, p < 0,01). Mahasiswa pada kuartil konsumsi tertinggi mengalami penurunan rata-rata IPK sebesar 0,38 poin pada akhir semester kedua. Menariknya, jeda terencana (micro-breaks) 10 menit setelah 45 menit belajar mampu memitigasi 60% efek penurunan atensi tersebut.

4. Kesimpulan
Konsumsi intensif video format pendek memiliki hubungan kausal negatif yang terukur terhadap kemampuan fokus berkelanjutan dan pencapaian akademik mahasiswa. Intervensi edukasi literasi digital serta pembatasan durasi akses harian direkomendasikan untuk diterapkan dalam panduan kemahasiswaan. Keterbatasan studi mencakup potensi confounding variable berupa kualitas tidur dan tingkat stres tugas kuliah yang belum dikontrol secara harian. Studi lanjutan disarankan untuk meneliti efektivitas intervensi digital detox bertarget pada kelompok usia sekolah menengah.`
  }
];
