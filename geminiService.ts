
import { GoogleGenAI } from "@google/genai";
import { BloodType } from "./types";

let genAI: GoogleGenAI | null = null;

const getAI = () => {
  const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || '';
  if (!genAI) {
    // Correct constructor for @google/genai (v1.x)
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

export const getDietAdvice = async (bloodType: BloodType, userQuestion: string) => {
  try {
    const ai = getAI();
    console.log("Sending question to AI (v2 SDK)...", { bloodType, userQuestion });
    
    if (!import.meta.env?.VITE_GEMINI_API_KEY) {
      console.error("VITE_GEMINI_API_KEY is missing!");
      return "Erro: Chave de API não configurada. Verifique o arquivo .env.local";
    }

    const prompt = `Você é um Assistente Nutricional especializado em Dieta do Tipo Sanguíneo para perda de peso.
      Sua função principal é recomendar dietas e receitas focadas em emagrecimento para o tipo sanguíneo: ${bloodType}.
      
      REGRAS ESTRITAS (Siga à risca):
      1. Responda APENAS perguntas sobre alimentação, nutrição, dietas e receitas.
      2. Se o usuário perguntar algo fora desse tema, responda educadamente que sua especialidade é apenas nutrição e dieta tipo sanguíneo.
      3. IMPORTANTE: Sempre que recomendar uma dieta ou receita, inclua obrigatoriamente um alerta informando que são apenas recomendações e que o usuário deve consultar seu médico para orientação mais precisa, especialmente se estiver tomando medicamentos ou passando por tratamento.
      4. Forneça conselhos práticos e focados em perda de peso para o tipo ${bloodType}.
      5. Responda em Português do Brasil.
      
      Pergunta do Usuário: "${userQuestion}"`;

    // Correct method call for @google/genai (v1.x)
    // Using gemini-2.0-flash as it's better supported in this SDK version
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });
    
    const text = result.text();
    
    console.log("AI Response received successfully");
    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    // Return detailed error message to help the user identify if it's an API key or other issue
    return `Desculpe, ocorreu um erro no assistente: ${error instanceof Error ? error.message : String(error)}. Verifique se sua chave de API é válida e se você tem saldo no Google AI Studio.`;
  }
};
