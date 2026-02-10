
import { GoogleGenAI, Type } from "@google/genai";
import type { TravelInfo, WeatherInfo } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY is not defined in environment variables");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const travelSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "Một đoạn văn tóm tắt chung về chủ đề và địa điểm, viết bằng tiếng Việt."
    },
    places: {
      type: Type.ARRAY,
      description: "Danh sách các địa điểm nổi bật liên quan đến chủ đề.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Tên của địa điểm." },
          address: { type: Type.STRING, description: "Địa chỉ đầy đủ và chính xác của địa điểm để định vị trên bản đồ." },
          description: { type: Type.STRING, description: "Mô tả ngắn gọn, hấp dẫn về địa điểm." },
          rating: { type: Type.NUMBER, description: "Đánh giá trung bình của địa điểm trên thang điểm 5, có thể là số lẻ (ví dụ: 4.5)." },
          price: { type: Type.STRING, description: "Mức giá tham khảo, ví dụ: 'Từ 800.000 VNĐ/đêm'. Chỉ áp dụng cho khách sạn/nhà nghỉ." }
        },
        required: ["name", "address", "description", "rating"]
      }
    },
    reviews: {
        type: Type.ARRAY,
        description: "Danh sách 3-4 bài đánh giá, bình luận từ những người đi du lịch trước đó.",
        items: {
            type: Type.OBJECT,
            properties: {
                author: { type: Type.STRING, description: "Tên người đánh giá (ví dụ: 'An Nguyễn', 'Du khách ẩn danh')." },
                rating: { type: Type.NUMBER, description: "Điểm đánh giá của người này trên thang điểm 5." },
                comment: { type: Type.STRING, description: "Nội dung bình luận, đánh giá chi tiết." }
            },
            required: ["author", "rating", "comment"]
        }
    },
    suggestions: {
        type: Type.ARRAY,
        description: "Danh sách 3-4 địa điểm được gợi ý ở gần hoặc có tính chất tương tự.",
        items: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING, description: "Tên của địa điểm được gợi ý." },
                reason: { type: Type.STRING, description: "Lý do gợi ý (ví dụ: 'Gần đó', 'Tương tự', 'Nhiều người cũng thích')." }
            },
            required: ["name", "reason"]
        }
    }
  },
  required: ["summary", "places", "reviews", "suggestions"]
};

const weatherSchema = {
    type: Type.OBJECT,
    properties: {
        current: {
            type: Type.OBJECT,
            description: "Thời tiết hiện tại.",
            properties: {
                temperature: { type: Type.NUMBER, description: "Nhiệt độ hiện tại bằng độ C." },
                condition: { type: Type.STRING, description: "Mô tả điều kiện thời tiết (ví dụ: Nắng đẹp, Mây rải rác, Mưa rào)." },
                icon: { type: Type.STRING, description: "Một từ khóa biểu tượng (ví dụ: 'sunny', 'cloudy', 'rain', 'partly-cloudy', 'storm')." }
            },
            required: ["temperature", "condition", "icon"]
        },
        forecast: {
            type: Type.ARRAY,
            description: "Dự báo thời tiết cho 3 ngày tới.",
            items: {
                type: Type.OBJECT,
                properties: {
                    date: { type: Type.STRING, description: "Ngày trong tuần (ví dụ: 'Thứ Hai', 'Ngày mai')." },
                    minTemp: { type: Type.NUMBER, description: "Nhiệt độ thấp nhất trong ngày (độ C)." },
                    maxTemp: { type: Type.NUMBER, description: "Nhiệt độ cao nhất trong ngày (độ C)." },
                    condition: { type: Type.STRING, description: "Mô tả điều kiện thời tiết dự báo." },
                    icon: { type: Type.STRING, description: "Một từ khóa biểu tượng (ví dụ: 'sunny', 'cloudy', 'rain', 'partly-cloudy', 'storm')." }
                },
                required: ["date", "minTemp", "maxTemp", "condition", "icon"]
            }
        }
    },
    required: ["current", "forecast"]
};


export async function getTravelInfo(prompt: string): Promise<TravelInfo> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: travelSchema,
        tools: [{ googleSearch: {} }],
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const responseText = response.text;

    if (!responseText) {
        throw new Error("Phản hồi rỗng từ API du lịch.");
    }

    try {
        const parsedData = JSON.parse(responseText);
        return {
            summary: parsedData.summary || "Không có tóm tắt.",
            places: parsedData.places || [],
            reviews: parsedData.reviews || [],
            suggestions: parsedData.suggestions || [],
            sources: sources
        };
    } catch (e) {
        console.error("Không thể phân tích phản hồi JSON du lịch:", e, "Phản hồi gốc:", responseText);
        throw new Error("Định dạng phản hồi từ AI không hợp lệ.");
    }

  } catch (error) {
    console.error("Lỗi khi gọi Gemini API (du lịch):", error);
    throw new Error("Không thể lấy thông tin du lịch từ Gemini API.");
  }
}

export async function getWeatherInfo(location: string): Promise<WeatherInfo> {
    const prompt = `Cung cấp dự báo thời tiết chi tiết cho "${location}". Bao gồm nhiệt độ hiện tại (độ C), điều kiện thời tiết, và dự báo cho 3 ngày tiếp theo với nhiệt độ cao nhất/thấp nhất và điều kiện thời tiết. Sử dụng các từ khóa biểu tượng được định nghĩa trong schema. Trả lời bằng định dạng JSON.`;
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: weatherSchema,
        },
      });
  
      const responseText = response.text;
  
      if (!responseText) {
          throw new Error("Phản hồi rỗng từ API thời tiết.");
      }
  
      try {
          const parsedData = JSON.parse(responseText);
          return parsedData;
      } catch (e) {
          console.error("Không thể phân tích phản hồi JSON thời tiết:", e, "Phản hồi gốc:", responseText);
          throw new Error("Định dạng phản hồi thời tiết từ AI không hợp lệ.");
      }
  
    } catch (error) {
      console.error("Lỗi khi gọi Gemini API (thời tiết):", error);
      throw new Error("Không thể lấy thông tin thời tiết từ Gemini API.");
    }
  }
