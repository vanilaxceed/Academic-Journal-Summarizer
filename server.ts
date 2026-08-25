import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Lazy initializer for Google Gen AI client
let aiClient: GoogleGenAI | null = null;

function getAi(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "Astro-SSR Cloudflare-ready Academic Summarizer" });
});

// Main Serverless Summarize / Extract Endpoint
const handleSummarize = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, focusArea } = req.body;

    if (!text || typeof text !== "string" || text.trim().length < 40) {
      res.status(400).json({
        error: "Mohon masukkan teks jurnal akademik yang valid (minimal 40 karakter).",
      });
      return;
    }

    const ai = getAi();

    const systemInstruction = `Anda adalah asisten AI spesialis analisis & sintesis jurnal ilmiah akademik bereputasi internasional.
Tugas Anda adalah membaca teks jurnal ilmiah yang diberikan dan mengekstrak secara mendalam, akurat, dan terstruktur ke dalam TIGA bagian utama:
1. METODE: Pendekatan riset, populasi/sampel/dataset, teknik pengumpulan data, dan metode analisis/algoritma yang digunakan.
2. HASIL: Temuan-temuan kunci kuantitatif/kualitatif, data signifikan (angka, persentase, signifikansi statistik), dan dampak temuan.
3. KESIMPULAN: Ringkasan konklusi akhir, implikasi praktis bagi industri/masyarakat, keterbatasan penelitian (limitations), dan saran/rekomendasi untuk penelitian masa depan.

Pedoman:
- Gunakan bahasa Indonesia akademis yang lugas, profesional, presisi, dan mudah dipahami.
- Ekstrak fakta yang benar-benar ada di dalam teks jurnal, jangan membuat data fiktif.
- Buat poin-poin yang tajam dan bernas di setiap bagian.`;

    const prompt = `Analisis teks jurnal akademik berikut:\n\n---\n${text.slice(0, 50000)}\n---${focusArea ? `\n\nFokus khusus tambahan: ${focusArea}` : ''}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "Judul atau topik utama jurnal yang dianalisis",
            },
            fieldOfStudy: {
              type: Type.STRING,
              description: "Bidang studi / disiplin ilmu jurnal (misal: Kecerdasan Buatan, Kedokteran, Energi)",
            },
            abstractSummary: {
              type: Type.STRING,
              description: "Ikhtisar eksekutif / abstrak ringkas inti riset (1-2 paragraf padat)",
            },
            metode: {
              type: Type.OBJECT,
              description: "Bagian 1: Metode Penelitian",
              properties: {
                ringkasan: {
                  type: Type.STRING,
                  description: "Ringkasan naratif metode penelitian yang diterapkan",
                },
                pendekatan: {
                  type: Type.STRING,
                  description: "Jenis pendekatan (Kuantitatif, Kualitatif, Eksperimental, Mixed Methods, Komputasional, dll)",
                },
                populasiSampel: {
                  type: Type.STRING,
                  description: "Subjek, populasi, sampel, atau dataset primer/sekunder yang digunakan",
                },
                teknikPengumpulanData: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Daftar instrumen atau teknik pengumpulan data",
                },
                metodeAnalisis: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Daftar metode statistik, algoritma, atau teknik analisis data",
                },
              },
              required: ["ringkasan", "pendekatan", "populasiSampel", "teknikPengumpulanData", "metodeAnalisis"],
            },
            hasil: {
              type: Type.OBJECT,
              description: "Bagian 2: Hasil & Temuan Penelitian",
              properties: {
                ringkasan: {
                  type: Type.STRING,
                  description: "Ringkasan naratif temuan penelitian utama",
                },
                temuanKunci: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Daftar temuan-temuan kunci yang ditemukan dalam studi",
                },
                dataSignifikan: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Data kuantitatif / statistik penting (akurasi, p-value, persentase, angka)",
                },
                dampakTemuan: {
                  type: Type.STRING,
                  description: "Dampak atau nilai tambah dari hasil penelitian ini",
                },
              },
              required: ["ringkasan", "temuanKunci", "dataSignifikan", "dampakTemuan"],
            },
            kesimpulan: {
              type: Type.OBJECT,
              description: "Bagian 3: Kesimpulan & Implikasi",
              properties: {
                ringkasan: {
                  type: Type.STRING,
                  description: "Ringkasan konklusi akhir dari keseluruhan riset",
                },
                implikasiPraktis: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Implikasi praktis, kebijakan, atau penerapan di dunia nyata",
                },
                keterbatasan: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Keterbatasan atau batasan ruang lingkup studi (limitations)",
                },
                saranPenelitianLanjutan: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Saran atau peluang penelitian masa depan (future work)",
                },
              },
              required: ["ringkasan", "implikasiPraktis", "keterbatasan", "saranPenelitianLanjutan"],
            },
            kataKunci: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-6 kata kunci utama terkait topik artikel",
            },
          },
          required: ["title", "fieldOfStudy", "abstractSummary", "metode", "hasil", "kesimpulan", "kataKunci"],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Model tidak menghasilkan respons teks yang valid.");
    }

    const parsedData = JSON.parse(responseText);

    // Calculate quick reading stats
    const words = text.trim().split(/\s+/).length;
    const estTimeMinutes = Math.max(1, Math.ceil(words / 220));

    const finalResult = {
      ...parsedData,
      stats: {
        wordCountInput: words,
        estimatedReadTime: `~${estTimeMinutes} menit baca asli`,
      },
    };

    res.json({
      success: true,
      data: finalResult,
    });
  } catch (error: any) {
    console.error("Error summarizing journal:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Terjadi kesalahan saat memproses jurnal dengan AI.",
    });
  }
};

app.post("/api/summarize", handleSummarize);
app.post("/api/extract", handleSummarize);
app.post("/api/astro-serverless/extract", handleSummarize);

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
