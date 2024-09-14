import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const GlobalContext = createContext();

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
        q10: 0
    });

    // Function to update marks for a specific question
    const updateMarks = (question, newMarks) => {
        setMarks(prevMarks => ({
            ...prevMarks,
            [question]: newMarks,
        }));
    };

    return (
        <GlobalContext.Provider value={{ marks, updateMarks }}>
            {children}
        </GlobalContext.Provider>
    );
};
