# pdf-extract-api-digitalocean

[![Star on GitHub](https://img.shields.io/github/stars/samestrin/pdf-extract-api-digitalocean?style=social)](https://github.com/samestrin/pdf-extract-api-digitalocean/stargazers)[![Fork on GitHub](https://img.shields.io/github/forks/samestrin/pdf-extract-api-digitalocean?style=social) ](https://github.com/samestrin/pdf-extract-api-digitalocean/network/members)[![Watch on GitHub](https://img.shields.io/github/watchers/samestrin/pdf-extract-api-digitalocean?style=social)](https://github.com/samestrin/pdf-extract-api-digitalocean/watchers)

![Version 0.0.1](https://img.shields.io/badge/Version-0.0.1-blue) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) ](https://opensource.org/licenses/MIT)[![Built with Python](https://img.shields.io/badge/Built%20with-Python-green)](https://www.python.org/)

This project implements a simulated Optical Character Recognition (OCR) service that extracts text from PDF files uploaded by users. Built with Node.js and utilizing several libraries such as Express, Multer, and pdf-parse, this application is designed to be easy to set up and integrate into other systems needing PDF text extraction capabilities.

## Features

- **PDF Text Extraction**: Allows users to upload PDF files and extracts readable text from them.
- **File Upload Management**: Utilizes Multer for efficient handling of file uploads with customizable storage options.
- **Error Handling**: Robust error management to ensure stability and provide meaningful error messages to the client.

## Dependencies

- **Node.js**: The script runs in a Node.js environment.
- **express**: Web framework for Node.js.
- **multer**: Middleware for handling multipart/form-data, used for uploading files.
- **pdf-parse**: Library to parse and extract text from PDF files.
- **fs.promises**: Part of Node.js File System module to handle file operations using promises.
- **path**: Utilities for handling and transforming file paths.

## Installing Node.js

Before installing, ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download and install Node.js from [Node.js official website](https://nodejs.org/).

## Installing pdf-extract-api-digitalocean

To install and use pdf-extract-api-digitalocean, follow these steps:

Clone the Repository: Begin by cloning the repository containing the pdf-extract-api-digitalocean to your local machine.

```bash
git clone https://github.com/samestrin/pdf-extract-api-digitalocean/
```

Set PORT environment variable to define the port on which the server will listen. Default is 3000

Navigate to your project's root directory and run:

```bash
npm start
```

## **Endpoints**

### **Extract**

**Endpoint:** `/extract` **Method:** POST

Extract text from a PDF file.

#### **Parameters**

- `file`: PDF file

## **Example Usage**

Use a tool like Postman or curl to make a request:

```bash
curl -F "file=@path_to_pdf_file.pdf" http://localhost:[PORT]/extract
```

The server will process the uploaded file and return the extracted text in JSON format.

## **Error Handling**

The API handles errors gracefully and returns appropriate error responses.

- **400 Bad Request**: Invalid request parameters.
- **500 Internal Server Error**: Unexpected server error.

## Contribute

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes or improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Share

[![Twitter](https://img.shields.io/badge/X-Tweet-blue)](https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20project!&url=https://github.com/samestrin/pdf-extract-api-digitalocean) [![Facebook](https://img.shields.io/badge/Facebook-Share-blue)](https://www.facebook.com/sharer/sharer.php?u=https://github.com/samestrin/pdf-extract-api-digitalocean) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Share-blue)](https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/samestrin/pdf-extract-api-digitalocean)
