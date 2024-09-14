import React, { useContext, useState } from 'react';
import AceEditor from 'react-ace';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import { toast } from "react-toastify";

// Import required Ace modules
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/ext-language_tools';
import { GlobalContext } from '../GlobalContext';

function CodeSubmit({question, expected_output}) {
    const { marks, updateMarks } = useContext(GlobalContext); // Use the context

    // Add state variables
    const [mode, setMode] = useState('python');
    const [theme, setTheme] = useState('tomorrow');
    // State to hold the code entered in the editor
    const [code, setCode] = useState('');
    const [isHintOpen, setIsHintOpen] = useState(false); // State to control hint modal visibility

    // State to hold the output/result from the submission
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultMessage, setResultMessage] = useState(''); // Holds the result or error message
    const [isError, setIsError] = useState(false); // Tracks if it's an error
    const [error, setError] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(''); // Tracks the submission status
  
    // Handler for code changes in the editor
    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };
    
    const handleSubmit = async () => {
        if (!code) {
            //setError('Please enter some code to submit.');
            return;
        }

        setLoading(true);
        setResult('');
        setError('');
   
        // Your Express server URL
        const API_URL = 'http://localhost:3000/api/submit';
    
        // Replace with actual code and optional test cases
        //const code = code;  // Get this from AceEditor or user input
        const stdin = '3\n';                    // Optional input for test cases (stdin)
        //const expected_output = '7'; // Optional expected output for comparison
    
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

                clearInterval(intervalId);

                    // Success case (status ID 3 - Accepted)
                    if (resultResponse.data.status.id === 3) {  // "Accepted"
                        setResultMessage(`Success: ${resultResponse.data.stdout || "No output"}`);
                        setIsError(false);
                        showSuccessToast('Correct! Great Job!');
                        
                        updateMarks(question, 1);  // Assume 1 mark for correct answer
                        setSubmissionStatus('accepted');
                    } else if (resultResponse.data.status.id === 4) {  // "Rejected"
                        // Wrong Answer
                        setResultMessage(resultResponse.data.stderr || resultResponse.data.compile_output || "Wrong Answer: Code runs fine but the answer is wrong");
                        setIsError(true);
                        showErrorToast('Wrong Answer!');
                        setSubmissionStatus('rejected');
                    } else if (resultResponse.data.status.id > 4) {  // Error case (compile error, runtime error)
                        setResultMessage(resultResponse.data.stderr || resultResponse.data.compile_output || "An error occurred.");
                        setIsError(true);
                        showErrorToast('Compilation or execution failed!');
                        setSubmissionStatus('rejected');
                    }
            } catch (err) {
                console.error('Error fetching result:', err);
                setError('An error occurred while fetching the result.');
            }
        }, 2000);  // Poll every 2 seconds
    };

    const showSuccessToast = (msg) => {
        toast.success(msg || `Compiled Successfully!`, {
          position: "top-right",
          autoClose: 2000,
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
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };
      
      // Function to toggle the hint modal visibility
    const toggleHintModal = () => {
        setIsHintOpen(!isHintOpen);
    };

    const window_width = "500px";

    return (
        <div>
            <AceEditor
                placeholder="# Type your code here..."
                mode={mode}
                theme={theme}
                name="comp102"
                className="border border-blue-500 rounded"
                width="500px"
                height="150px" // Set the desired height here
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
                className={`bg-gradient-to-r bg-blue-500 hover:bg-blue-700 
                    text-white font-bold py-2 px-6 mt-4 rounded-full 
                    shadow-lg transition-all ease-in-out duration-300
                    ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'}`}
            >
                {loading ? (
                    <>
                        <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white inline-block mr-2"></span>
                        Submitting...
                    </>
                ) : (
                    'Submit Code'
                )}
            </button>
            {/* Display tick or cross based on submission status */}
            {submissionStatus === 'accepted' && (
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-3xl pl-10" />
            )}
            {submissionStatus === 'rejected' && (
                <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-3xl pl-10" />
            )}
            {/* Hint Button */}
            <button
                onClick={toggleHintModal}
                className="text-gray-400 hover:text-gray-500 transition-all ease-in-out duration-300"
                title="Hints"
            >
                <FontAwesomeIcon icon={faQuestionCircle} className="text-3xl" />
            </button>
            {error && (
                <div style={{ marginTop: '20px', color: 'red' }}>
                <h3>Error:</h3>
                <pre>{error}</pre>
                </div>
            )}
            {/* {result && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Result:</h3>
                    <p><strong>Output:</strong> {result.stdout || "No output"}</p>
                    <p><strong>Time:</strong> {result.time || "N/A"}</p>
                    <p><strong>Memory:</strong> {result.memory || "N/A"} KB</p>
                    <p><strong>Status:</strong> {result.status ? result.status.description : "Pending"}</p>
                    {result.stderr && <p><strong>Error:</strong> {result.stderr}</p>}
                    {result.compile_output && <p><strong>Compile Output:</strong> {result.compile_output}</p>}
                </div>
            )}   */}

            {/* Readonly Textarea for displaying the result */}
            {isError && <textarea
                value={resultMessage}
                readOnly
                rows={2}
                style={{
                    width: '100%',
                    marginTop: '20px',
                    backgroundColor: '#f8f9fa',
                    color: isError ? 'red' : 'green',
                    border: '1px solid',
                    borderColor: isError ? 'red' : 'green',
                    padding: '10px',
                    resize: 'vertical',  // Allows vertical resizing only
                    fontFamily: 'monospace'
                }}
            />}

            {/* Hint Modal */}
            {isHintOpen && (
                <div
                    className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 
                    transition-opacity duration-300 ease-out ${isHintOpen ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div
                        className={`relative bg-white p-6 rounded-lg shadow-lg w-1/4 transform 
                        transition-transform duration-300 ease-out ${isHintOpen ? 'scale-100' : 'scale-95'}`}
                    >
                        {/* Close Button - Cross in the upper-right corner */}
                        <button
                            onClick={toggleHintModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-300 font-bold"
                            title="Close"
                        >
                            <FontAwesomeIcon icon={faTimesCircle} className="text-2xl" />
                        </button>

                        <h2 className="text-xl font-bold mb-4">Hints</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            <li>Make sure you're printing the right format.</li>
                            <li>Check your variable names carefully.</li>
                            <li>Try using a different approach if you're stuck.</li>
                        </ul>
                    </div>
                </div>
            )}


        </div>
    );
}

export default CodeSubmit;
