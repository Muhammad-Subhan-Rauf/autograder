import React from 'react';
import CodeSubmit from './CodeSubmit';
import Description from './Description';

const Question = ({description, expected_output}) => {
    //console.log(description, prefill);
    return (
        <div>
            <Description markdown={description}/>

            <CodeSubmit question={description} expected_output={expected_output}/>
        </div>
    );
};

export default Question;