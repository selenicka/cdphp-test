import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';

import Faction from './Faction/Faction';
import Popup from '../../components/Popup/Popup';
import Slider from '../../components/Slider/Slider';
import { FactionListState } from '../../store/types';
import { factionsRequestStartAction, showModalAction, updateFactionAction } from '../../store/factions/actions';

interface StateProps {
    factions: { [name: string]: any },
    isModal: boolean
}

interface DispatchProps {
    fetchFactions: () => void,
    updateFaction: (propName: string, propValue: object, index: number) => void,
    togglePopup: () => void
}

type Props = StateProps & DispatchProps;

class FactionsList extends React.Component<Props, FactionListState> {
    constructor(props: any) {
        super(props);

        this.state = {
            factionsList: [],
            isModal: false,
            selectedIndex: 0,
            factionsExpandedState: []
        };
    }

    componentDidMount() {
        this.props.fetchFactions();
    }

    toggleModal(e: Event, index: number) {
        // this.setState({
        //     isModal: !this.state.isModal,
        //     selectedIndex: index
        // });
    }

    slideModal(e: Event, index: number) {
        const factions = [...this.props.factions.factionsList];
        const clicked: any = factions[index];

        clicked['slide'] = 1;

        this.setState({
            factionsList: factions
        });
    }

    handleClick(e: Event, index: number) {
        const factionsExpandedState = [...this.state.factionsExpandedState];

        factionsExpandedState[index] = !factionsExpandedState[index];

        this.setState({
            factionsExpandedState: factionsExpandedState
        });
    }

    updateFactionData(propName: string, propValue: object, index: number) {
        const factions = [...this.props.factions.factionsList];
        const clicked: any = factions[index];

        clicked[propName] = propValue;

        this.setState({
            factionsList: factions
        });
    }

    render() {
        const factions: object[] = this.props.factions.factionsList;
        let factionsExpandedState = this.state.factionsExpandedState;
        let selectedIndex = this.state.selectedIndex;
        let selectedFaction = factions[selectedIndex];

        console.log(selectedFaction);
        return (
            <div className="UniverseApp">
                {factions &&
                    <ul className="factions">
                        {factions.map((faction: any, index: number) =>
                            <Faction
                                key={faction['faction_id']}
                                index={index}
                                faction={faction}
                                isOpened={factionsExpandedState[index]}
                                handleClick={(e: Event) => this.handleClick(e, index)}
                                updateFactionData={(propName: string, propValue: object) => this.props.updateFaction(propName, propValue, index)}
                                toggleModal={() => this.props.togglePopup()}
                            />
                        )}
                    </ul>
                }
                {this.props.isModal && (
                    <Popup toggleModal={() => this.props.togglePopup()}>
                        <Slider
                            selectedFaction={selectedFaction}
                            updateFactionData={(propName: string, propValue: object) => this.updateFactionData(propName, propValue, selectedIndex)}
                            toggleModal={(e: Event) => this.slideModal(e, selectedIndex)}
                        />
                    </Popup>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        factions: state.factions,
        isModal: state.factions.isModal
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchFactions: () => dispatch(factionsRequestStartAction()),
        updateFaction: (propName: string, propValue: object, index: number) => dispatch(updateFactionAction(propName, propValue, index)),
        togglePopup: () => dispatch(showModalAction())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FactionsList);
