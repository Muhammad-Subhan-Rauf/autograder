import React, { useState } from 'react';
import AceEditor from 'react-ace';
import axios from 'axios';

import { ToastContainer, toast } from "react-toastify";

// Import required Ace modules
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/ext-language_tools';

function CodeSubmit() {

    // Add state variables
    const [mode, setMode] = useState('python');
    const [theme, setTheme] = useState('tomorrow');
    // State to hold the code entered in the editor
    const [code, setCode] = useState('');
    // State to hold the output/result from the submission
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    // Handler for code changes in the editor
    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };
    
    const handleSubmit = async () => {
        setLoading(true);
        setResult('');
        setError('');
        
        // Your Express server URL
        const API_URL = 'http://localhost:3000/api/submit';
    
        // Replace with actual code and optional test cases
        //const code = code;  // Get this from AceEditor or user input
        const stdin = '3\n';                    // Optional input for test cases (stdin)
        const expected_output = 'Hello, World!'; // Optional expected output for comparison
    
        try {
            // Send the source code, stdin, and expected_output to the server
            const response = await axios.post(API_URL, {
                source_code: code,
                stdin: stdin,  // Optional: Remove if not needed
                expected_output: expected_output  // Optional: Remove if not needed
            });
    
            // Extract the token from the response
            const {token} = response.data;
            
            // Start polling to get the result using the token
            pollForResult(token);
    
            // // Display the token as the result
            //setResult(`Submission token: ${token}`);
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred while submitting your code.');
        } finally {
            setLoading(false);
        }
    };
    
    // Polling function to check the result using the token
    const pollForResult = (token) => {
        console.log(`polling ${token}`);
        
        const API_RESULT_URL = `http://localhost:3000/api/result/${token}`;

        const intervalId = setInterval(async () => {
            try {
                const resultResponse = await axios.get(API_RESULT_URL);

                // Check if the status indicates the result is ready
                if (resultResponse.data.status.id > 2) {  // Status ID > 2 means completed
                    setResult(resultResponse.data);  // Set the result once it's ready
                    showSuccessToast('Compiled Successfully!');
                    clearInterval(intervalId);  // Stop polling
                } else {
                    console.log('Result not ready yet, polling again...');
                }
            } catch (err) {
                console.error('Error fetching result:', err);
                setError('An error occurred while fetching the result.');
            }
        }, 1000);  // Poll every 3 seconds
    };

    const showSuccessToast = (msg) => {
        toast.success(msg || `Compiled Successfully!`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };
      const showErrorToast = (msg) => {
        toast.error(msg || `Something went wrong! Please try again.`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };
      
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <AceEditor
                placeholder="# Type your code here..."
                mode={mode}
                theme={theme}
                name="comp102"
                className="border border-blue-500 rounded"
                width="500px"
                height="250px" // Set the desired height here
                fontSize={14}
                lineHeight={20}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={code}
                onChange={handleCodeChange}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 4
                }}
            />
            <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ marginTop: '10px' }}
            >
                {loading ? 'Submitting...' : 'Submit Code'}
            </button>
            {error && (
                <div style={{ marginTop: '20px', color: 'red' }}>
                <h3>Error:</h3>
                <pre>{error}</pre>
                </div>
            )}
            {result && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Result:</h3>
                    <p><strong>Output:</strong> {result.stdout || "No output"}</p>
                    <p><strong>Time:</strong> {result.time || "N/A"}</p>
                    <p><strong>Memory:</strong> {result.memory || "N/A"} KB</p>
                    <p><strong>Status:</strong> {result.status ? result.status.description : "Pending"}</p>
                    {result.stderr && <p><strong>Error:</strong> {result.stderr}</p>}
                    {result.compile_output && <p><strong>Compile Output:</strong> {result.compile_output}</p>}
                </div>
            )}  
        </div>
    );
}

export default CodeSubmit;
