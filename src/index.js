const express = require("express");
const multer = require("multer");
const { getAvailableLanguages, createWorker } = require("tesseract.js");
const app = express();
const port = process.env.PORT || 3000;

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// OCR worker
const worker = createWorker({
  logger: (m) => console.log(m), // Add logger here to view OCR progress
});

app.get("/languages", async (req, res) => {
  try {
    await worker.load();
    const languages = await getAvailableLanguages(worker);
    await worker.terminate();

    res.status(200).json({
      message: "Supported Languages",
      languages: languages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to retrieve supported languages");
  }
});

app.post("/ocr", upload.single("file"), async (req, res) => {
  const lang = req.body.language || "eng";
  if (req.file) {
    try {
      await worker.load();
      await worker.loadLanguage(lang);
      await worker.initialize(lang);
      const {
        data: { text },
      } = await worker.recognize(req.file.path);
      await worker.terminate();

      res.status(200).json({
        message: "OCR Result",
        OCRText: text,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error processing the file");
    }
  } else {
    res.status(400).send("No file uploaded.");
  }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
