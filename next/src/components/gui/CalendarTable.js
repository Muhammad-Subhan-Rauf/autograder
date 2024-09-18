'use client';

import React, { useEffect, useState } from 'react';
import CalendarRow from './CalendarRow';

// CalendarTable component
export default function CalendarTable() {
    const [data, setData] = useState(null);

    useEffect(() => {
    // Fetch the JSON data directly from the public folder
        fetch('calendarData.json')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!data) {
        return <div>Loading...</div>; // Show loading while fetching data
    }

    return (
        <div className="overflow-auto">
          <table className="w-full border-collapse text-left min-w-[1100px]">
            <thead>
              <tr className="bg-white text-blue-800">
                <th className="border border-white p-2">Week</th>
                <th className="border border-white p-2">Date</th>
                <th className="border border-white p-2">Lecture</th>
                <th className="border border-white p-2">Readings</th>
                <th className="border border-white p-2">Labs</th>
                <th className="border border-white p-2">Homework</th>
              </tr>
            </thead>
            <tbody>
              {data.calendar.map((week, weekIndex) => (
                week.rows.map((row, rowIndex) => (
                  <CalendarRow 
                    key={`${weekIndex}-${rowIndex}`} 
                    weekNumber={week.weekNumber} 
                    row={row} 
                  />
                ))
              ))}
            </tbody>
          </table>
        </div>
      );
    }