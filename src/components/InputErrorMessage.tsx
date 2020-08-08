import React from 'react';

interface InputErrorMessageProps {
    error?: string | undefined;
    touched: boolean;
}

const InputErrorMessage = (props: InputErrorMessageProps) => {
    return (
        <>
          {props.touched && props.error && 
            <div className="text-xs pt-1 font-normal text-red-600">{props.error}</div>
          }
        </>
    )
}

export default InputErrorMessage