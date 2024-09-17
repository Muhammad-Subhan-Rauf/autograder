'use client';

import Question from '@/components/widgets/Question'
import { GlobalContext } from '@/GlobalContext';
import React, { useContext } from 'react';

export default function Lab1() {

    const questions = [
        { 
            key: 'q1',
            description:`
## Question 1
Write a program that prints the following on the screen:
<br/>
\`\`\`python
print("Hello, World!")
\`\`\`
`,
            expectedOutput: 'Hello, World!'
        },
        { 
            key: 'q2',
            description:`
## Question 2
Print the square and cube of integer 10:
`,
            expectedOutput: '100\n1000'
        },
        { 
            key: 'q3',
            description:`
## Question 3
Ask the user to enter two numbers and print the sum of the two numbers
`,
            expectedOutput: '3'
        },
        { 
            key: 'q4',
            description:`
## Question 4
Write a program that prints the following on the screen:
<br/>
\`\`\`python
print("7")
\`\`\`
`,
            expectedOutput: '7'
        },
    ];


    const { totalScore } = useContext(GlobalContext); 
    const { marks } = useContext(GlobalContext); // Access the global marks dictionary
    const totalQuestions = Object.keys(marks).length;

    // // Calculate total score
    // const totalScore = Object.values(marks).reduce((acc, mark) => acc + mark, 0);

    return (

        <div className="flex bg-gray-200 items-start justify-center min-h-screen w-full pb-20">

            {/* Fixed Score Display */}
            <div className="fixed top-0 left-0 m-5 p-4 text-white bg-green-500 font-extrabold text-2xl border border-transparent rounded-lg shadow-lg z-10">
                Score: {totalScore} / {totalQuestions}
            </div>


            <div className="p-8 bg-white rounded-lg shadow-lg max-w-[50%] w-full border border-blue-500 mt-10 md:mt-20">              
                <h1 className="text-2xl md:text-2xl font-bold text-center text-blue-500 mb-4">
                    Lab 1
                </h1>
                
                {questions.map(question => (
                    <Question
                        questionId={question.key}
                        description={question.description}
                        expectedOutput={question.expectedOutput}
                        prefillCode=''
                        showOutput={true}
                    />

                ))}

            </div>
        </div>  
    )
}