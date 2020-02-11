import React from 'react';
import FactionInfo from "../../containers/FactionsList/Faction/FactionInfo/FactionInfo";

const slider = (props: any) => {
    const getRace = (selectedFaction: any) => {
        let selectedRace;

        if(selectedFaction.races) {
            selectedRace = selectedFaction.races.filter((race: any) => race['race_id'] === selectedFaction.character['race_id']);

            return (selectedRace && selectedRace[0]) ? selectedRace[0].name : 'Unknown';
        }
    };

    return (
        <div className={"slider" + (props.selectedFaction.slide ? ' active' : '')}>
            {props.selectedFaction && (
                <div className="slide">
                    <p>Name: {props.selectedFaction.corporation.name}</p>
                    <p>Member count: {props.selectedFaction.corporation['member_count']}</p>
                    <FactionInfo
                        title="CEO"
                        id={props.selectedFaction.corporation['ceo_id']}
                        urlKey="character"
                        updateFactionData={props.updateFactionData}
                        value={props.selectedFaction.character ? props.selectedFaction.character.name : ''}
                        isLink={true}
                        toggleModal={props.toggleModal}
                    />
                    <p>Description: {props.selectedFaction.corporation.description}</p>
                </div>
            )}
            {props.selectedFaction.slide && (
                <div className="slide">
                    <p>Name: {props.selectedFaction.character.name}</p>
                    <p>Birthday: {new Date(props.selectedFaction.character.birthday).toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <FactionInfo
                        title="Race"
                        urlKey="races"
                        updateFactionData={props.updateFactionData}
                        value={getRace(props.selectedFaction)}
                        isLink={false}
                        toggleModal={props.toggleModal}
                    />
                </div>
            )}
        </div>
    );
};

export default slider;