import React from 'react';

class FactionInfoLoader extends React.Component<{
    title: string,
    id: any,
    urlKey: string,
    updateFaction: any,
    value: any,
    isLink: boolean,
    openModal: any
}, {}> {
    componentDidMount() {
        const urlAPI: { [key: string]: string; } = {
            corporation: 'https://esi.evetech.net/latest/corporations/',
            solarSystem: 'https://esi.evetech.net/latest/universe/systems/',
            character: 'https://esi.evetech.net/latest/characters/',
            races: 'https://esi.evetech.net/latest/universe/races/'
        };

        if(!this.props.value) {
            fetch(urlAPI[this.props.urlKey] + this.props.id)
                .then(r => r.json())
                .then((response) => {
                    if (response) {
                        this.props.updateFaction(this.props.urlKey, response);
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
                                onClick={(e) => this.props.openModal(e)}
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

export default FactionInfoLoader;
