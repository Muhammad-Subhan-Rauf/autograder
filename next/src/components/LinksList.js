import React from 'react';

const LinksList = ({ links }) => {
    if (!links || links.length === 0) return <span className="text-gray-500">N/A</span>;

    return (
        <ul className="list-disc list-inside space-y-1">
            {links.map((link, index) => (
                <li key={index}>
                    <a href={link.href} className="text-blue-500 hover:underline">
                        {link.label}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default LinksList;
