import React from 'react';
import LinksList from './LinksList';

const CalendarRow = ({ weekNumber, row }) => {
    return (
        <tr className="bg-[#DAE5EC] transition-all duration-200 hover:bg-[#B8D1DC]">
            <td className="border p-2 text-center">{weekNumber}</td>
            <td className="border p-2">{row.date}</td>
            <td className="border p-2">
                <div className="font-semibold">{row.lecture.title || 'No Lecture'}</div>
                <LinksList links={row.lecture.links} />
            </td>
            <td className="border p-2">
                <LinksList links={row.textbook} />
            </td>
            <td className="border p-2">
                <LinksList links={row.labLinks} />
            </td>
            <td className="border p-2">
                {row.homework ? (
                    <div>
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
                    </div>
                ) : (
                    <span className="text-gray-500">N/A</span>
                )}
            </td>
        </tr>
    );
};

export default CalendarRow;
