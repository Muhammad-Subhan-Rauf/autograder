import React, { useContext, useState, useEffect } from 'react';
import Question from '../components/Question';
import { GlobalContext } from '../GlobalContext';

function TextLab() {
    const question1 = 
`
# Question 1

Write code to print the following exactly as shown:

\`\`\`
\'Hi!\'
\`\`\`
`;
    const answer1 = "Hi!";


    const question2 = 
`
# Question 2

Convert the following math expression to python code:

$$G=4\\pi^2\\frac{a^3}{p^2\\left(m_1+m_2\\right)}$$

Type your final expression between the CODE tags below:
`;

    const answer2 = "7";

    const { marks } = useContext(GlobalContext); // Access the global marks dictionary
    
    // Calculate total score
    const totalScore = Object.values(marks).reduce((acc, mark) => acc + mark, 0);

    return (

        <div className="flex bg-gray-200 items-start justify-center min-h-screen w-full pb-20">
            
            {/* Fixed Score Display */}
            <div className="fixed top-0 left-0 m-5 p-4 text-white bg-green-500 font-extrabold text-2xl border border-transparent rounded-lg shadow-lg z-10">
                Marks: {totalScore} / 10
            </div>


            <div className="p-8 bg-white rounded-lg shadow-lg max-w-[50%] w-full border border-blue-500 mt-10 md:mt-20">
                <h1 className="text-2xl md:text-2xl font-bold text-center text-blue-500 mb-4">
                    Lab 1
                </h1>
                <Question description={question1} expected_output={answer1}/>
                <br/>
                <Question description={question2} expected_output={answer2}/>

            </div>
        </div>
    );
}

export default TextLab;
