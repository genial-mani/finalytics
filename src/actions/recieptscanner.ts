import { GoogleGenerativeAI } from "@google/generative-ai";

interface ExtractedData {
  amount: string;
  date: string;
  description: string;
  category: string;
}

const categories = [
  "Groceries",
  "Utilities",
  "Rent",
  "Entertainment",
  "Transportation",
  "Healthcare",
  "Dining Out",
  "Investments",
  "Savings",
  "Pet care",
  "Miscellaneous",
];

export async function receiptscanner(image: File): Promise<ExtractedData>{
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
        const  model = genAI.getGenerativeModel({model: "gemini-2.5-flash"})

        if(image?.size > 10 * 1024 * 1024){
            throw new Error("File size exceeding 10MB.")
        }

        const buffer = await image.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString("base64")

        const prompt = `Analyze the following receipt image and extract these details:
      1. The total amount of the transaction.
      2. The date of the transaction (formatted as YYYY-MM-DD).
      3. A brief description (e.g., the store name or primary service).
      4. The most appropriate category for this transaction.

      Please choose the category from the following list:
      [${categories.join(", ")}]

      Provide the output as a clean JSON object like this:
      {
        "amount": "123.45",
        "date": "2023-10-27",
        "description": "Example Store",
        "category": "Groceries"
      }
      Do not add any extra text or markdown formatting.`

      const imagePart = {
        inlineData: {
            data: base64Image,
            mimeType: image.type,
        }
      }

      const result = await model.generateContent([prompt, imagePart]);

      const response = result.response;
      const text = response.text();

      if(!text){
        throw new Error("Couldn't parse the response from AI.")
      }

      const extractedData: ExtractedData = JSON.parse(text);

      if(extractedData?.date) {
        extractedData.date = new Date(extractedData?.date).toISOString()
      }

    return extractedData
    } catch (error) {
        console.error("Error scanning receipt:", error)
        throw new Error("Failed to scan receipt.")
    }
}