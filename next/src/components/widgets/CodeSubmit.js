'use client';

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from '@/GlobalContext';

//----------------------------------------------------------

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faQuestionCircle, faUpload } from '@fortawesome/free-solid-svg-icons';

import { toast } from "react-toastify";

//----------------------------------------------------------
import AceEditor from 'react-ace';
// Import required Ace modules
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/ext-language_tools';
//----------------------------------------------------------

/**
 * CodeSubmit component
 * @param {string} questionId - The question ID
 * @param {string} expectedOutput - The expected output
 * @param {string} prefillCode - The code to prefill the code editor
 * @param {boolean} feedback - Whether feedback is enabled
 * @param {string} hints - The hints for the question
 * @returns {JSX.Element} The code submission component
*/
const CodeSubmit = ({questionId, stdin, expectedOutput, prefillCode='', feedback=false, hints=''}) => {

    //----------------------------------------------------------------
    // Global variables:
    const { API_SUBMIT_URL, API_RESULT_URL } = useContext(GlobalContext);
    const { updateMarks } = useContext(GlobalContext); 
    //----------------------------------------------------------------
    // Ace editor related variables:
    const [qId, setqId] = useState({questionId});
    // State to hold the code entered in the editor
    const [code, setCode] = useState(prefillCode);
    const [isHintOpen, setIsHintOpen] = useState(false);
    //----------------------------------------------------------------
    // Code submission related variables:
    const [loading, setLoading] = useState(false);  
    const [uploaded, setUploaded] = useState('');
    const [error, setError] = useState('');
    const [acceptStatus, setAcceptStatus] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    //----------------------------------------------------------------

    // Handler for code changes in the editor
    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    const handleSubmit = async () => {
        if (!code) {
            setError(true);
            setFeedbackMessage('Please enter some code to submit.');
            return;
        }

        setLoading(true);
        setError('');
        setAcceptStatus('');
        setUploaded('');
        setFeedbackMessage('');

        //--------------------------------------------------------------------------------
        // Replace with actual code and optional test cases
        //const code = code;  // Get this from AceEditor or user input
        //const stdin = '3\n';                    // Optional input for test cases (stdin)
        //const expected_output = '7'; // Optional expected output for comparison
        //--------------------------------------------------------------------------------

        try {

            // Send the source code, stdin, and expected_output to the server
            const response = await axios.post(API_SUBMIT_URL, {
                source_code: code,
                stdin: stdin,
                expected_output: expectedOutput
            });
            
            setUploaded(true);

            // Extract the token from the response
            const {token} = response.data;
            
            // Start polling to get the result using the token
            pollForResult(`${API_RESULT_URL}/${token}`);
    
            // // Display the token as the result
            //setResult(`Submission token: ${token}`);
        } catch (err) {
            //console.error(`Critical Error: ${err.message} (${err.code})`);
            setError(true);
            setFeedbackMessage(`Critical Error: ${err.message} (${err.code})\nAn error occurred while submitting your code.`);
        } finally {
            setError(false);
            setLoading(false);
        }
    }

    // Polling function to check the result using the token
    const pollForResult = (serverUrl) => {

        console.log(serverUrl);

        const intervalId = setInterval(async () => {
            try {
                const resultResponse = await axios.get(serverUrl);

                clearInterval(intervalId);

                // Success case (status ID 3 - Accepted)
                if (resultResponse.data.status.id === 3) {  // "Accepted"
                    setError(false);
                    setAcceptStatus(true);
                    setFeedbackMessage(`Success: ${resultResponse.data.stdout || "No output"}`);                    
                    showSuccessToast('Correct! Great Job!');
                    updateMarks(questionId, 1);  // Assume 1 mark for correct answer
                } else if (resultResponse.data.status.id === 4) {  // "Rejected"
                    // Wrong Answer
                    setError(true);
                    setFeedbackMessage(resultResponse.data.stderr || resultResponse.data.compile_output || 'Wrong Answer!');
                    setAcceptStatus(false);
                    showErrorToast('Wrong Answer!');
                    updateMarks(questionId, 0);  // Reset the score to 0 for errors
                } else if (resultResponse.data.status.id > 4) {  // Error case (compile error, runtime error)
                    setError(true);
                    setFeedbackMessage(resultResponse.data.stderr || resultResponse.data.compile_output || "An error occurred.");
                    setAcceptStatus(false);
                    showErrorToast('Compilation or execution failed!');
                    updateMarks(questionId, 0);  // Reset the score to 0 for errors
                }
            } catch (err) {
                console.error('Error fetching result:', err);
                setError(true);
                setFeedbackMessage(`Error fetching result: ${err}`);
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

    return (
        <div className='pb-6'>
            <AceEditor
                placeholder="# Type your code here..."
                mode='python'
                theme='tomorrow'
                name={qId}
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
            {uploaded === true && (
                <FontAwesomeIcon icon={faUpload} className="text-green-300 text-3xl pl-10" />
            )}
            {feedback === true && acceptStatus === true && (
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-3xl pl-10" />
            )}
            {feedback === true && acceptStatus === false && (
                <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-3xl pl-10" />
            )}
            {/* Hint Button */}
            {hints != '' && <button
                onClick={toggleHintModal}
                className="text-gray-400 hover:text-gray-500 transition-all ease-in-out duration-300"
                title="Hints"
            >
                <FontAwesomeIcon icon={faQuestionCircle} className="text-3xl" />
            </button>}

            {/* Readonly Textarea for displaying the result */}
            {feedback === true && error === true && <textarea
                value={feedbackMessage}
                readOnly
                rows={2}
                style={{
                    width: '100%',
                    marginTop: '20px',
                    backgroundColor: '#f8f9fa',
                    color: error ? 'red' : 'green',
                    border: '1px solid',
                    borderColor: error ? 'red' : 'green',
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
                            <li>Make sure you&#39;re printing the right format.</li>
                            <li>Check your variable names carefully.</li>
                            <li>Try using a different approach if you&#39;re stuck.</li>
                        </ul>
                    </div>
                </div>
            )}


        </div>
    );
};

export default CodeSubmit;