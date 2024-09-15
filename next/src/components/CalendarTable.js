import path from 'path';
import { promises as fs } from 'fs';
import React from 'react';
import CalendarRow from './CalendarRow';

// CalendarTable component
export default async function CalendarTable() {
  // Fetch the data from the JSON file
  const filePath = path.join(process.cwd(), 'public', 'calendarData.json');  // Path to the JSON file in public folder
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

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
