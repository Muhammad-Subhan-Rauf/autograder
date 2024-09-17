import React from 'react';
import Markdown from './Markdown';
import CodeSubmit from './CodeSubmit';

/**
 * Question component
 * @param {string} questionId - The question ID
 * @param {string} description - The question description
 * @param {string} expectedOutput - The expected output
 * @param {boolean} feedback - Whether feedback is enabled
 * @param {boolean} graded - Whether the question is graded
 * @param {string} prefillCode - The code to prefill the code editor
 * @param {string} hints - The hints for the question
 * @returns {JSX.Element} The question component
 */
const Question = ({questionId, description, expectedOutput, feedback = true, graded = false, prefillCode='', hints=''}) => {
    return (
        <div>
            <Markdown markdown={description}/>
        
            <CodeSubmit 
                key={questionId} // Added unique key prop
                questionId={questionId} 
                expectedOutput={expectedOutput} 
                prefillCode={prefillCode} 
                feedback={feedback}
                hints={hints}/>

            <Divider />
        </div>
        
    );
};

const Divider = () => {
    return (
        <hr
            style={{ borderTop: "1px solid lightgrey", padding: "3px" }}
        ></hr>
    );
};

export default Question;