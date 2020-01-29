import React from 'react';
import Field from './Field';
import FormErrors from "./FormErrors";

class SearchForm extends React.Component<{
    search: any
}, {
    fields: any,
    formErrors: any,
    validationMessages: any
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            fields: {
                category: '',
                searchString: '',
            },
            formErrors: {
                category: '',
                searchString: ''
            },
            validationMessages: new Set()
        };
    }

    handleInputChange(event: any) {
        const { name, value } = event.target;
        let editedFields = Object.assign({}, this.state.fields);

        editedFields[name] = value;

        this.setState({
            fields: editedFields
        });
    }

    validateField(fieldName: string, value: string) {
        let formErrors = this.state.formErrors;

        switch(fieldName) {
            case 'category':
                formErrors.category =
                    !value
                        ? 'Please fill in required fields'
                        : '';
                break;
            case 'searchString':
                if (!value) {
                    formErrors.searchString = 'Please fill in required fields';
                } else {
                    formErrors.searchString = (value.length < 3) ? 'Minimum 3 symbols' : '';
                }
                break;
            default:
                break;
        }

        this.setState({
            formErrors: formErrors
        });
    }

    getValidationMessages(){
        let formErrors = this.state.formErrors;
        let messages = new Set();

        for(let fieldName in formErrors) {
            if(formErrors[fieldName].length > 0) {
                messages.add(formErrors[fieldName]);
            }
        }

        return messages;
    }

    validateForm(elements: any){
        for(var i=0; i < elements.length; i++){
            if(elements[i].hasAttribute('data-validate')){
                this.validateField(elements[i].name, elements[i].value);
            }
        }
    }

    handleSubmit(event:any) {
        let elements = event.target.elements;

        event.preventDefault();

        this.validateForm(elements);

        this.setState({
            validationMessages: this.getValidationMessages()
        },
            () => {
                if (this.state.validationMessages.size === 0) {
                    this.props.search(this.state.fields);
                }
            });
    }

    render() {
        const fields = this.state.fields;
        const formErrors = this.state.formErrors;
        const allowedCategories = ['agent', 'alliance', 'character', 'constellation', 'corporation', 'faction', 'inventory_type', 'region', 'solar_system', 'station'];

        return (
            <form onSubmit={(e: any) => this.handleSubmit(e)} className="searchForm">
                <Field
                    value={fields.category}
                    name="category"
                    onChange={(e: any) => this.handleInputChange(e)}
                    type="select"
                    isValid={!formErrors.category}
                    allowedValues={allowedCategories}
                />
                <Field
                    value={fields.searchString}
                    name="searchString"
                    onChange={(e: any) => this.handleInputChange(e)}
                    type="input"
                    isValid={!formErrors.searchString}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <div className="panel panel-default">
                    <FormErrors validationMessages={this.state.validationMessages} />
                </div>
            </form>
        );
    }
}

export default SearchForm;
