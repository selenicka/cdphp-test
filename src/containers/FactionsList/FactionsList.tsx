import React from 'react';
import Faction from './Faction/Faction';
import Popup from '../../components/Popup/Popup';
import Slider from '../../components/Slider/Slider';

export interface FactionListState {
    factions: object[],
    isLoaded: boolean,
    isModal: boolean,
    selectedIndex: number,
    factionsExpandedState: boolean[]
}

class FactionsList extends React.Component<{}, FactionListState> {
    constructor(props: any) {
        super(props);

        this.state = {
            isLoaded: false,
            factions: [],
            isModal: false,
            selectedIndex: 0,
            factionsExpandedState: []
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
                        factions: response,
                        factionsExpandedState: Array(response.length).fill(false)
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    toggleModal(e: Event, index: number) {
        this.setState({
            isModal: !this.state.isModal,
            selectedIndex: index
        });
    }

    slideModal(e: Event, index: number) {
        const factions = this.state.factions.slice();
        const clicked: any = factions[index];

        clicked['slide'] = 1;

        this.setState({
            factions: factions
        });
    }

    handleClick(e: Event, index: number) {
        const factionsExpandedState = [...this.state.factionsExpandedState];

        factionsExpandedState[index] = !factionsExpandedState[index];

        this.setState({
            factionsExpandedState: factionsExpandedState
        });
    }

    updateFactionData(propName: string, propValue: any, index: number) {
        const factions = this.state.factions.slice();
        const clicked: any = factions[index];

        clicked[propName] = propValue;

        this.setState({
            factions: factions
        });
    }

    render() {
        const factions: object[] = this.state.factions;
        let factionsExpandedState = this.state.factionsExpandedState;
        let selectedIndex = this.state.selectedIndex;
        let selectedFaction = factions[selectedIndex];

        return (
            <div className="UniverseApp">
                <ul className="factions">
                    {factions.map((faction: any, index: number) =>
                        <Faction
                            key={faction['faction_id']}
                            index={index}
                            faction={faction}
                            isOpened={factionsExpandedState[index]}
                            handleClick={(e: Event) => this.handleClick(e, index)}
                            updateFactionData={(propName: string, propValue: any) => this.updateFactionData(propName, propValue, index)}
                            toggleModal={(e: Event) => this.toggleModal(e, index)}
                        />
                    )}
                </ul>
                {this.state.isModal && (
                    <Popup toggleModal={(e: Event) => this.toggleModal(e, selectedIndex)}>
                        <Slider
                            selectedFaction={selectedFaction}
                            updateFactionData={(propName: string, propValue: any) => this.updateFactionData(propName, propValue, selectedIndex)}
                            toggleModal={(e: Event) => this.slideModal(e, selectedIndex)}
                        />
                    </Popup>
                )}
            </div>
        );
    }
}

export default FactionsList;
