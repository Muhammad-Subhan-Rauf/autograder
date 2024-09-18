// import axios from 'axios';
'use client';

import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const GlobalContext = createContext();

//---------------------------------------------------------------
// Development
// const API_SUBMIT_URL = 'http://localhost:3000/api/submit';
// const API_RESULT_URL = 'http://localhost:3000/api/result';
//---------------------------------------------------------------
// Production
const API_SUBMIT_URL = 'https://fakhirshaheen.com/api/submit';
const API_RESULT_URL = 'https://fakhirshaheen.com/api/result';
//---------------------------------------------------------------

// Create a provider component
export const GlobalProvider = ({ children }) => {
    const [marks, setMarks] = useState({
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        q6: 0,
        q7: 0,
        q8: 0,
        q9: 0,
        q10: 0,
        q11: 0,
        q12: 0,
    });

    // Function to update marks for a specific question
    const updateMarks = (question, newMarks) => {
        setMarks(prevMarks => ({
            ...prevMarks,
            [question]: newMarks,
        }));
    };

    // Optionally, calculate total score
    const totalScore = Object.values(marks).reduce((acc, curr) => acc + curr, 0);

    return (
        <GlobalContext.Provider value={{ 
                marks, 
                updateMarks,
                totalScore,
                API_SUBMIT_URL, 
                API_RESULT_URL 
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
