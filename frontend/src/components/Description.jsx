import React from 'react';
import ReactMarkdown from 'react-markdown';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css'; // Import the KaTeX CSS for rendering LaTeX

function MarkdownComponent({markdown}) {

    return (
        <div className="prose prose-lg text-left pt-5 pb-5">
            {/* <ReactMarkdown>{markdown}</ReactMarkdown> */}
            <ReactMarkdown 
                key={0}
                children={markdown}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
            />
        </div>
    );
}

export default MarkdownComponent;
