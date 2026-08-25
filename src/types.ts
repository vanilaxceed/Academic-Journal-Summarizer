export interface JournalSummaryResponse {
  title: string;
  fieldOfStudy: string;
  abstractSummary: string;
  metode: {
    ringkasan: string;
    pendekatan: string;
    populasiSampel: string;
    teknikPengumpulanData: string[];
    metodeAnalisis: string[];
  };
  hasil: {
    ringkasan: string;
    temuanKunci: string[];
    dataSignifikan: string[];
    dampakTemuan: string;
  };
  kesimpulan: {
    ringkasan: string;
    implikasiPraktis: string[];
    keterbatasan: string[];
    saranPenelitianLanjutan: string[];
  };
  kataKunci: string[];
  stats: {
    wordCountInput: number;
    estimatedReadTime: string;
  };
}

export interface SampleJournal {
  id: string;
  title: string;
  field: string;
  text: string;
}
