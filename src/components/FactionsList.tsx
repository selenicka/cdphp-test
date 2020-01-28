import React from 'react';
import Faction from './faction';
import Popup from './popup';
import FactionInfoLoader from './factionInfoLoader';

class FactionsList extends React.Component<{}, {
    factions: object[],
    isLoaded: boolean,
    isModal: boolean,
    selectedIndex: any
}> {
    constructor(props: any) {
        super(props);

        this.state = {
            isLoaded: false,
            factions: [],
            isModal: false,
            selectedIndex: null
        };
    }

    componentDidMount() {
        const urlAPI = 'https://esi.evetech.net/latest/universe/factions/';

        fetch(urlAPI)
            .then(r => r.json())
            .then((response) => {
                if (response){
                    this.setState({
                        isLoaded: true,
                        factions: response
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    openModal(e: any, index: number) {
        this.setState({
            isModal: true,
            selectedIndex: index
        });
    }

    closeModal() {
        this.setState({
            isModal: false
        });
    }

    slideModal(e: any, index: number) {
        const factions = this.state.factions.slice();
        const clicked: any = factions[index];

        clicked['slide'] = 1;

        this.setState({
            factions: factions
        });
    }

    handleClick(e: any, index: number) {
        const factions = this.state.factions.slice();
        const clicked: any = factions[index];

        clicked.isOpened = clicked.isOpened ? !clicked.isOpened : true; // refactor -> to array

        this.setState({
            factions: factions
        });
    }

    updateFaction(propName: string, propValue: any, index: number) {
        const factions = this.state.factions.slice();
        const clicked: any = factions[index];

        clicked[propName] = propValue;

        this.setState({
            factions: factions
        });
    }

    getRace(selectedFaction: any) {
        let selectedRace;

        if(selectedFaction.races) {
            selectedRace = selectedFaction.races.filter((race: any) => race['race_id'] === selectedFaction.character['race_id']);

            return (selectedRace && selectedRace[0]) ? selectedRace[0].name : 'Unknown';
        }
    }

    render() {
        const factions: any = this.state.factions;
        let selectedIndex = this.state.selectedIndex;
        let selectedFaction = factions[selectedIndex];

        return (
            <div className="UniverseApp">
                <ul className="factions">
                    {factions.map((faction: any, index: number) =>
                        <Faction
                            key={index}
                            index={index}
                            faction={faction}
                            onClick={(e: any) => this.handleClick(e, index)}
                            updateFaction={(propName: string, propValue: any) => this.updateFaction(propName, propValue, index)}
                            openModal={(e: any) => this.openModal(e, index)}
                        />
                    )}
                </ul>
                {this.state.isModal && (
                    <Popup>
                        <div className={"slider" + (selectedFaction.slide ? ' active' : '')}>
                            {selectedFaction && (
                                <div className="slide">
                                    <p>Name: {selectedFaction.corporation.name}</p>
                                    <p>Member count: {selectedFaction.corporation['member_count']}</p>
                                    <FactionInfoLoader
                                        title="CEO"
                                        id={selectedFaction.corporation['ceo_id']}
                                        urlKey="character"
                                        updateFaction={(propName: string, propValue: any) => this.updateFaction(propName, propValue, selectedIndex)}
                                        value={selectedFaction.character ? selectedFaction.character.name : ''}
                                        isLink={true}
                                        openModal={(e: any) => this.slideModal(e, selectedIndex)}
                                    />
                                    <p>Description: {selectedFaction.corporation.description}</p>
                                </div>
                            )}
                            {selectedFaction.slide && (
                                <div className="slide">
                                    <p>Name: {selectedFaction.character.name}</p>
                                    <p>Birthday: {new Date(selectedFaction.character.birthday).toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <FactionInfoLoader
                                        title="Race"
                                        id={''}
                                        urlKey="races"
                                        updateFaction={(propName: string, propValue: any) => this.updateFaction(propName, propValue, selectedIndex)}
                                        value={this.getRace(selectedFaction)}
                                        isLink={false}
                                        openModal={(e: any) => this.slideModal(e, selectedIndex)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="closeModal" onClick={() => this.closeModal()}>
                            <span>×</span>
                        </div>
                    </Popup>
                )}
            </div>
        );
    }
}

export default FactionsList;
