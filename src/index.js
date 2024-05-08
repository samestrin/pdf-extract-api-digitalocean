const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs").promises;
const path = require("path");

const uploadsDir = path.join(__dirname, "uploads");

// setup uploadsDir
ensureDirectoryExists(uploadsDir).catch(console.error);

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

/**
 * Handles the OCR endpoint to process PDF and extract text.
 * The function receives a file uploaded by the user. If a file is not uploaded, it sends a 400 status code response.
 * If a file is uploaded, it attempts to read the file, extract text using `pdf-parse`, and send it back to the client.
 * It also handles cleaning up the file after processing by deleting it. Errors during the process result in a 500 status code response.
 *
 * @param {Request} req - The express request object containing file information.
 * @param {Response} res - The express response object used to send responses back to the client.
 * @throws {Error} Sends a 500 status response if reading, parsing, or deleting the file fails.
 */
app.post("/extract", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const pdfPath = req.file.path;
    const dataBuffer = await fs.readFile(pdfPath);

    const results = await pdf(dataBuffer);
    res.send({ text: results.text });
    await fs.unlink(pdfPath); // Clean up file after processing using fs.promises
  } catch (error) {
    res.status(500).send("Failed to extract text from PDF.");
  }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

/**
 * Sets up the directory for uploads by ensuring it exists or creating it if it does not.
 * This function attempts to access the directory specified by `dir`. If it does not exist,
 * the function creates it with recursive option enabled. It logs the creation of the directory.
 *
 * @param {string} dir - The path of the directory to check or create.
 * @throws {Error} Throws if there is an error accessing or creating the directory that is not related to the directory's existence.
 *
 * @example
 * // Ensure that the uploads directory exists
 * ensureDirectoryExists(path.join(__dirname, "uploads")).catch(console.error);
 */
async function ensureDirectoryExists(dir) {
  try {
    // Try accessing the directory to check if it exists
    await fs.access(dir);
  } catch (error) {
    // If the error code is 'ENOENT', the directory does not exist and needs to be created
    if (error.code === "ENOENT") {
      await fs.mkdir(dir, { recursive: true });
      console.log(`Directory created: ${dir}`);
    } else {
      // Re-throw the error if it's not related to the existence of the directory
      throw error;
    }
  }
}
