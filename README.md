# AI_FILE EXTRACTOR

## Project Description

The **AI_FILE EXTRACTOR** is a web application designed to extract key details from various file formats such as **PDF**, **Word documents**, and **Images**. 

The extracted data includes essential purchase order (PO) information such as **PO number**, **Item name**, **Quantity**, and **Item price**. By leveraging the **OpenAI API**, this application automates the data extraction process and displays it in a clean, tabular format on the frontend.

This project demonstrates how to integrate file handling, text extraction, and AI-driven data processing using a modern web stack (React.js for frontend and Node.js with Express for backend).

## Features

- **File Upload**: Users can upload PDF, Word, or image files containing purchase order information.
  
- **Data Extraction**: Extracts structured data such as PO number, item name, quantity, and price using **OpenAI GPT**.

- **AI Integration**: Uses OpenAI’s language model to process and organize raw data from files.
  
- **Tabular Display**: Presents extracted data in a neat table format on the front end.
  
- **Responsive UI**: Built using **React.js** with **Tailwind CSS** for styling and responsiveness.



## Tech Stack

**Frontend**:

- **React.js**: For building the interactive UI.
  
- **Tailwind CSS**: For styling the user interface.

**Backend**:

- **Node.js**: This is for running the backend server.
  
- **Express.js**: Web framework for routing and API handling.
- 
- **Multer**: Middleware for handling file uploads.
  
- **pdf-parse**, **Mammoth**, **Tesseract.js**: Libraries for parsing PDFs, Word documents, and images.

**API Integration**:

- **OpenAI GPT API**: For AI-driven text extraction and data structuring.



## Prerequisites

To run this project, you’ll need to have the following installed:

- **Node.js** (v14 or higher)
  
- **npm** (Node Package Manager)

- **OpenAI API Key** (You need to create an account and get your API key from [OpenAI](https://openai.com)).



## Installation

```bash
# Step 1: Clone the repository
git clone https://github.com/your-username/AI_FILE_EXTRACTOR.git

# Step 2: Navigate to the backend directory
cd po-extract-back-end

# Step 3: Install backend dependencies
npm install

# Step 4: Navigate to the frontend directory
cd po-extract-front-end

# Step 5: Install frontend dependencies
npm install

# Step 6: Start both servers (backend & frontend)
npm start
```

---

## How to Use

1. Open the application in your browser at http://localhost:3000.

2. Upload a PDF, Word, or Image file containing purchase order information.
   
3. Click the Submit button to process the file.
   
4. The extracted information, such as PO number, Item name, Quantity, and Price, will be displayed in a table format.

## Libraries and Tools Used

## Frontend:

**React.js:** For creating the user interface and handling state.

**Tailwind CSS:** For building a responsive and clean UI design.

## Backend:

**Node.js and Express.js:** For setting up the server and handling API requests.

**Multer:** For handling file uploads.

**pdf-parse:** For extracting text from PDFs.

**Mammoth:** For extracting text from Word documents.

**Tesseract.js:** For extracting text from image files.

**OpenAI GPT API:** For processing and extracting structured data from raw text.

### Conclusion

The **AI_FILE EXTRACTOR** is an innovative solution that **automates the extraction of key details from various file formats using AI.** By integrating **React.js, Node.js, and OpenAI GPT**, 
this project demonstrates the potential of AI to enhance traditional data extraction methods, improving efficiency and accuracy.





