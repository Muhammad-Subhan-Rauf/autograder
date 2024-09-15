import path from 'path';
import { promises as fs } from 'fs';
import React from 'react';

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
            <React.Fragment key={weekIndex}>
              {week.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-[#DAE5EC] transition-all duration-200 hover:bg-[#B8D1DC]">
                  <td className="border p-2">{week.weekNumber}</td>
                  <td className="border p-2">{row.date}</td>
                  <td className="border p-2">
                    {row.lecture.title}
                    {row.lecture.links.length > 0 && (
                      <ul>
                        {row.lecture.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <a href={link.href} className="text-blue-500 hover:underline">
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="border p-2">
                    {row.textbook.length > 0 ? (
                      <ul>
                        {row.textbook.map((text, textIndex) => (
                          <li key={textIndex}>
                            <a href={text.href} className="text-blue-500 hover:underline">
                              {text.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No Readings</span>
                    )}
                  </td>
                  <td className="border p-2">
                    {row.labLinks.length > 0 ? (
                      <ul>
                        {row.labLinks.map((lab, labIndex) => (
                          <li key={labIndex}>
                            <a href={lab.href} className="text-blue-500 hover:underline">
                              {lab.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No Labs</span>
                    )}
                  </td>
                  <td className="border p-2">
                    {row.homework ? (
                      <>
                        <a href={row.homework.href} className="text-blue-500 hover:underline">
                          {row.homework.label}
                        </a>
                        <br />
                        {row.homework.dueDate && <span>{row.homework.dueDate}</span>}
                        <br />
                        {row.homework.solutionHref && (
                          <a href={row.homework.solutionHref} className="text-blue-500 hover:underline">
                            {row.homework.solutionLabel}
                          </a>
                        )}
                      </>
                    ) : (
                      <span>No Homework</span>
                    )}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
