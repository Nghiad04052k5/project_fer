
import { GoogleGenerativeAI as GoogleGenAI } from "@google/generative-ai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateMovieSummary = async (title, genre) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Hãy viết một đoạn mô tả ngắn hấp dẫn (khoảng 30-50 từ) bằng tiếng Việt cho một bộ phim thuộc thể loại ${genre} có tiêu đề là "${title}".`,
    });

    return response.text || "Không thể tạo mô tả lúc này.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Lỗi khi kết nối với AI để tạo mô tả.";
  }
};