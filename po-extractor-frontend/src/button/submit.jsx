import React, { useState } from "react";

export default function Submit() {

  // Using useState hook, I will manage the state of my file.
  const[file, setFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  
  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
  };

  // Handling the Submit button.

  const handleSubmit = async (e) => {
      e.preventDefault(); // to stop from page refershing.
    
      // Form data to hold the file
      const formData = new FormData();
      formData.append('poFile', file); // 'file' is selected by the user/ client.
    
      // Using the try-catch block, to handle the exceptions.

      try {
        // Make an API request from the front-end to the back-end.

        const response = await fetch('http://localhost:5000/api/extract', {
          method: 'POST',
          body: formData, //  file data will be sent to the back-end
        });
    
        // Waiting for the result from the back-end.
        const data = await response.json();
        
        // Parsing the string data into an array of objects for the table
      const parsedData = data.split('\n').map((line) => {
        const [key, value] = line.split(':');
        return { key: key.trim(), value: value.trim() };
      });
        // The extracted data will be rendered on the Table on the UI.
        
        setExtractedData(parsedData); 
      } catch (error) {
        console.error('Error:', error);
      }
    };
    

    return (
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-2"
          >
            Submit
          </button>
        </form>
  

        {extractedData && <table className="min-w-full bg-white border-collapse border border-gray-300 mt-4">
        <thead>
          <tr>
          <th className="border border-gray-300 px-4 py-2">Field</th>
          <th className="border border-gray-300 px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
        {extractedData.map((item, index) => (
          <tr key={index}>
            <td className="border border-gray-300 px-4 py-2">{item.key}</td>
            <td className="border border-gray-300 px-4 py-2">{item.value}</td>
          </tr>
        ))}
        </tbody>
      </table>}
      
      </div>
    );
};