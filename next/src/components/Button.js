// src/app/components/Button.js

import Link from "next/link";
import PropTypes from "prop-types";

const Button = ({ href, children, disabled }) => {
    if (disabled) {
        return (
            <span className="inline-flex items-center px-4 py-2 bg-gray-400 text-gray-700 rounded-md shadow cursor-not-allowed">
                {children}
            </span>
        );
    }

    return (
        <Link
            href={href}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label={children}
        >
            {children}
        </Link>
    );
};

Button.propTypes = {
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    href: "#",
    disabled: false,
};

export default Button;
