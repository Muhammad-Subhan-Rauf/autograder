import React, { useState } from 'react';
import CodeSubmit from '../components/CodeSubmit';
import Question from '../components/Question';

function TextLab() {
    const question1 = 
`
# Question 1

Write code to print the following exactly as shown:

\`\`\`
Hello, World!
\`\`\`
`;
    const answer1 = "Hello, World!";


    const question2 = 
`
# Question 2

Convert the following math expression to python code:

$$G=4\\pi^2\\frac{a^3}{p^2\\left(m_1+m_2\\right)}$$

Type your final expression between the CODE tags below:
`;

    const answer2 = "7";

    return (
        <div>
            <Question description={question1} expected_output={answer1}/>
            <br/>
            <Question description={question2} expected_output={answer2}/>
        </div>
    );
}

export default TextLab;
