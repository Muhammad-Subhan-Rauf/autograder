const express = require('express');
const axios = require('axios');

const submitRouter = express.Router();

submitRouter.post('/submit', async (req, res) => {
    try {
            // Extract the source code and test cases from the request body
            const { source_code, stdin, expected_output } = req.body;
            
            // Judge0 submission URL
            const submission_url = "http://172.232.187.109:2358/submissions?base64_encoded=false&wait=false";
            const headers = { "Content-Type": "application/json" };

            // Prepare the data for the submission
            const data = {
                source_code: source_code,           // Source code from request body
                language_id: 71,                    // Python 3 language ID
                stdin: stdin,                       // Optional: Input test cases (stdin)
                expected_output: expected_output    // Optional: Expected output to compare with
            };

            // Make a POST request to Judge0
            const judge0Response = await axios.post(submission_url, data, { headers });

            // Extract the token from the response
            const token = judge0Response.data.token;

            // Send the token back to the client
            res.status(200).json({
                token: token,
                message: 'Submission successful. Use this token to retrieve the result.'
            });
        } 
        catch (error) {
            // Handle any errors
            console.error('Error during submission to Judge0:', error.message);
            res.status(500).json({ error: 'Failed to submit code to Judge0.' });
        }
});

submitRouter.get('/result/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const result_url = `http://172.232.187.109:2358/submissions/${token}?base64_encoded=false`;

        const resultResponse = await axios.get(result_url);

        res.status(200).json(resultResponse.data);
    } catch (error) {
        console.error('Error retrieving result from Judge0:', error.message);
        res.status(500).json({ error: 'Failed to retrieve result from Judge0.' });
    }
});

module.exports = submitRouter;