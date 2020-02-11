import React from 'react';

function Field(props: any) {
    let fieldType = props.type;
    let field;
    let className = props.isValid ? '' : ' error';

    switch(fieldType) {
        case 'select':
            field = <select
                value={props.value}
                name={props.name}
                onChange={props.onChange}
                className={"form-control" + className}
                data-validate
            >
                <option value=''>Select category</option>
                {props.allowedValues.map((category: string, index: number) =>
                    <option
                        key={index}
                        value={category}
                    >
                        {category}
                    </option>
                )}
            </select>;
            break;
        case 'input':
            field = <input
                type="text"
                value={props.value}
                name={props.name}
                onChange={props.onChange}
                className={"form-control" + className}
                data-validate
            />;
            break;
        default:
            break;
    }

    return (
        <div className="form-group">
            {field}
        </div>
    );
}

export default Field;
