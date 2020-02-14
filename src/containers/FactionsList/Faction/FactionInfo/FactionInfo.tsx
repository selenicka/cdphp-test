import React from 'react';
import * as apiService from '../../../../services/apiService';

//todo: replace with function, try to use useEffect instead of componentDidMount
class FactionInfo extends React.Component<{
    title: string,
    urlKey: string,
    updateFactionData: (propName: string, propValue: object) => void,
    value: string,
    isLink: boolean,
    toggleModal: any,
    id?: number
}, {}> {
    componentDidMount() {
        if(!this.props.value) {
            apiService.getDataByKey(this.props.urlKey, this.props.id)
                .then((response) => {
                    if (response) {
                        this.props.updateFactionData(this.props.urlKey, response);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        if(this.props.value){
            return (
                <p>
                    {this.props.title}: {this.props.isLink ? (
                            <span
                                className="link"
                                onClick={this.props.toggleModal}
                            >{this.props.value}</span>
                        ) : (
                            <span>{this.props.value}</span>
                        )}
                </p>
            );
        } else {
            return (
                <p>{this.props.title}: Loading...</p>
            );
        }
    }
}

export default FactionInfo;
