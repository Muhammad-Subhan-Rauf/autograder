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
Write a program that prints the following on the screen (keep in mind the spaces and character cases):
<br/>
\`\`\`python
Hello, World!
\`\`\`
`,
            stdin: '',
            expectedOutput: 'Hello, World!',
            prefillCode:'',
            feedback: true,
        },
        { 
            key: 'q2',
            description:`
## Question 2
Normally you will show a message to the user while asking for input, i.e:
\`\`\`python
num = int(input("Enter a number: "))
\`\`\`
But in all our labs, including this one, you will not show any message to the user. Machines don't like extra outputs. This is the correct way to input a number for our labs:
\`\`\`python
num = int(input())
\`\`\`

Ask the user to input an integer, and print the square and cube of the integer:
`,
            stdin: '10\n',
            expectedOutput: '100\n1000\n',
            prefillCode:'#---------------------------------------\n# Replace the blanks with correct code:\n#---------------------------------------\nnum = int (input())\nprint( _____ )          # square of the number\nprint( _____ )          # cube of the number\n',
            feedback: true,
        },
        { 
            key: 'q3',
            description:`
## Question 3
Ask the user to enter two numbers and print the sum of the two numbers.

**Note:** Just print the sum, **no need to print any message**. For example:

\`\`\`python
print(sum)                    # Correct
print("The sum is", sum)      # Incorrect
\`\`\`
`,
            stdin: '10\n30\n',
            expectedOutput: '40\n',
            prefillCode:'',
            feedback: true,
        },
        { 
            key: 'q4',
            description:`
## Question 4
Convert the following math expression to python code:

$$s=s_0+v_0t+\\frac{1}{2}gt^2$$

Create the variables and values are as follows:

$$s_0 = 10$$

$$v_0 = 20$$

$$g = 10$$

$$t = 5$$

Calculate the value of $$s$$ and print it on the screen. 

Be sure to display the result as an **integer**.
`,
            stdin: '',
            expectedOutput: '235\n',
            prefillCode:'',
            feedback: true,
        },
        { 
            key: 'q5',
            description:`
## Question 5
Convert the following math expression to python code:

$$G=4\\pi^2\\frac{a^3}{p^2\\left(m_1+m_2\\right)}$$

Create the variables and values are as follows:

$$\\pi = 3.1415$$

$$a = 10$$

$$p = 1$$

$$m_1 = 3$$

$$m_2 = 1$$

Round the value of G using the *round()* function and print it on the screen.
`,
            stdin: '',
            expectedOutput: '9869',
            prefillCode:'',
            feedback: true,
        },
        { 
            key: 'q6',
            description:`
## Question 6
Ask the user to enter 5 $+ve$ integers and print the sum of all the integers.
`,
            stdin: '10\n20\n30\n40\n50\n',
            expectedOutput: '150\n',
            prefillCode:'',
            feedback: true,
        },
        { 
            key: 'q7',
            description:`
## Question 7
Print the following house on the screen:
\`\`\`
_______
|     |
|     |
|  _  |
|_| |_|
\`\`\`
`,
            stdin: '',
            expectedOutput: '_______\n|     |\n|     |\n|  _  |\n|_| |_|\n',
            prefillCode:'',
            feedback: true,
        },
        { 
            key: 'q8',
            description:`
## Question 8
Write code that calculates the  factorial of 8 and prints it on the screen:

$$8! = 8 \\times 7 \\times 6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1$$
`,
            stdin: '',
            expectedOutput: '40320\n',
            prefillCode:'',
            feedback: true,
        },
        { 
            key: 'q9',
            description:`
## Question 9
The user enters enters one of two possible color values: 'red' or 'green'. If the user enters 'red', print 'STOP'. 

If the user enters 'green', print 'GO'. 

If the user enters anything else, print 'INVALID'.
`,
            stdin: 'RED',
            expectedOutput: 'GO\n',
            prefillCode:'',
            feedback: true,
        },
        { 
            key: 'q10',
            description:`
## Question 10
Get radius as an *integer* input from the user. Then first print the area of the circle in one line and then print the circumference of the circle in the next line. You can use the following formulas:

$$\\pi = 3.1415$$

$$A = \\pi r^2$$

$$C = 2\\pi r$$

You must **round** the area and circumference to the nearest integer before printing.

`,
            stdin: '60',
            expectedOutput: '11309\n377\n',
            prefillCode:'',
            feedback: true,
        },
        { 
            key: 'q11',
            description:`
## Question 11
Get three integers from the user, store then in variables a,b and c. Print the sum of cubes of the three numbers:

$$a^3+b^3+c^3$$
`,
            stdin: '500\n600\n700\n',
            expectedOutput: '684000000\n',
            prefillCode:'',
            feedback: true,
        },
        { 
            key: 'q12',
            description:`
## Question 12
Get an integer **x** as input from the user. 

Print:  **positive** , if **x** is positive

Print:  **negative** , if **x** is negative

Print:  **zero** , if **x** is equal to zero
`,
            stdin: '-1000001',
            expectedOutput: 'negative\n',
            prefillCode:'',
            feedback: true,
        },
        { 
            key: 'q13',
            description:`
## Question 13
Get a string from the user, having atleast 10 characters in it.

Combine the first four characters and the last four characters of the string and print the result.

*PS: You must use **string slicing** to extract the substrings.*
`,
            stdin: 'abcdefghijkl',
            expectedOutput: 'abcdijkl\n',
            prefillCode:'',
            feedback: true,
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
                        key={question.key}
                        questionId={question.key}
                        description={question.description}
                        stdin={question.stdin}
                        expectedOutput={question.expectedOutput}
                        prefillCode={question.prefillCode}
                        showOutput={question.feedback}
                    />

                ))}

            </div>
        </div>  
    )
}