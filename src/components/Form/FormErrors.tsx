import React from 'react';

function FormErrors(props: any) {
    return (
        <div className='formErrors'>
            {Array.from(props.validationMessages).map((message: any, i) =>
                <p key={i}>{message}</p>
            )}
        </div>
    );
}

export default FormErrors;
