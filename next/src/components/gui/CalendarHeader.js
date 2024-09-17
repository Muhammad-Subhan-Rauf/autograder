"use client";

import React, { useState, useEffect } from 'react';

const CalendarHeader = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        // Fetch the JSON data directly from the public folder
        fetch('calendarData.json')
            .then(response => response.json())
            .then(data => setContent(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    if (!content) {
        return <div>Loading CalendarHeader...</div>;  // Show loading while fetching data      
    }

    return (
        <div className="p-4 bg-gray-100 shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-blue-700">{content.header.courseTitle}</h1>
            <p className="text-xl text-gray-600">{content.header.semester}</p>
            <div className="mt-4">
                <h2 className="text-2xl font-semibold text-blue-600">Announcements</h2>
                {content.header.announcements.length > 0 ? (
                    <ul>
                        {content.header.announcements.map((announcement, index) => (
                            <li key={index} className="text-lg text-gray-700">{announcement}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No Announcements yet</p>
                )}
            </div>
            <div className="mt-4">
                <h2 className="text-2xl font-semibold text-blue-600">Assignments</h2>
                <ul>
                    {content.header.assignments.map((assignment, index) => (
                        <li key={index} className="mb-2">
                            <a href={assignment.link} className="text-blue-500 hover:underline">
                                {assignment.title}
                            </a> - Due: {assignment.dueDate}
                        </li>
                    ))}
                </ul>
            </div>

            <h2>Book:</h2>
            <a
                href="https://drive.google.com/file/d/1CDtIBq5Wgvt6bu6-YGjAxJQDC36gzMoP/view?usp=drive_link"
                className="text-blue-500 hover:text-blue-700 underline"
            >
                Python for Everyone by Cay Horstmann (~90MB)
            </a>
        </div>
    );
}

export default CalendarHeader;