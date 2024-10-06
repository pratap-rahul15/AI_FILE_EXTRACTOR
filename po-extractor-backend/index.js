const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const cors = require("cors");
const pdfparse = require("pdf-parse");
const mammoth = require("mammoth");
const Tesseract = require("tesseract.js");
const fs = require("fs");
dotenv.config({ path: "../.env" });
const path = require("path")
// const { Configuration, OpenAIApi } = require("openai");

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors());
app.use(express.json());

// Configure the OpenAI
const OpenAI = require("openai");

const openai = new OpenAI({
  // apiKey: process.env.apiKey,
  apiKey: process.env.API_KEY,
});

//merging react frontend to nodejs backedn
app.get("*", (req,res) => {
  res.sendFile(path.resolve(__dirname, "../po-extractor-frontend", public, 'index.htmlpo-extractor-frontendpo-extractor-frontend'))
})
// Routing to handle the file uploaded by the user & extract the info from it.
app.post("/api/extract", upload.single("poFile"), async (req, res) => {
  // Check if the file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const file = req.file;
  let text = "";

  // Now, identify the uploaded file type & extract the text from it.
  try {
    if (file.mimetype === "application/pdf") {
      text = await extractTextFromPDF(file);
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      text = await extractTextFromWord(file);
    } else if (file.mimetype.startsWith("image/")) {
      text = await extractTextFromImage(file);
    } else {
      return res.status(400).json({ error: "Unsupported file type." });
    }

    // After extracting the text, send it to the OpenAPI for further processing.
    const extractedData = await extractInfoFromText(text);
    res.json(extractedData);
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Failed to process the file." });
  }
});

// Helper functions to extract text.
const extractTextFromPDF = async (file) => {
  const dataBuffer = fs.readFileSync(file.path);
  const data = await pdfparse(dataBuffer);
  return data.text;
};

const extractTextFromWord = async (file) => {
  const result = await mammoth.extractRawText({ path: file.path });
  return result.value;
};

const extractTextFromImage = async (file) => {
  const { data } = await Tesseract.recognize(file.path, "eng");
  return data.text;
};

// Extract relevant info using the OpenAI API service.
const extractInfoFromText = async (text) => {
  const prompt = `Extract the following information from this text:
    1. PO number
    2. Item name
    3. Quantity
    4. Item price
  
    Text: ${text}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2048,
      temperature: 1,
    });

    if (response.choices && response.choices.length > 0) {
      return response.choices[0].message.content;
    } else {
      throw new Error("No choices returned from OpenAI API");
    }
  } catch (apiError) {
    console.error("OpenAI API Error:", apiError);
    throw new Error("Failed to extract information using OpenAI API");
  }
};

// Now the data coming from the back-end should be converted to JSON object that can be rendered into an HTML table.

const formatExtractedData = (rawData) => {
  const lines = rawData.split("\n");
  const formattedData = lines.reduce((acc, line) => {
    const [key, value] = line.split(":").map((item) => item.trim());
    if (key && value) acc[key] = value;
    return acc;
  }, {});
  return formattedData;
};

// Run the server.
app.listen(5000, () =>
  console.log("Server is running on http://localhost:5000")
);
