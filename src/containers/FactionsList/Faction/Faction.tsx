import React, {useEffect} from 'react';
import './Faction.css';
import FactionInfo from './FactionInfo/FactionInfo';

function Faction(props: any) {
    const faction = props.faction;
    let infoLoaderCorporation;
    let infoLoaderSolarSystem;

    // useEffect(() => {
    //     console.log('useEffect for ' + faction.name);
    // });

    if (props.isOpened) {
        infoLoaderSolarSystem = <FactionInfo
            title="Solar System"
            id={props.faction['solar_system_id']}
            urlKey="solar_system"
            updateFactionData={props.updateFactionData}
            value={props.faction['solar_system'] ? props.faction['solar_system'].name : ''}
            isLink={false}
            toggleModal={props.toggleModal}
        />;
        infoLoaderCorporation = <FactionInfo
            title="Corporation"
            id={props.faction['corporation_id']}
            urlKey="corporation"
            updateFactionData={props.updateFactionData}
            value={props.faction.corporation ? props.faction.corporation.name : ''}
            isLink={true}
            toggleModal={props.toggleModal}
        />;
    }

    return (
        <li className={props.isOpened ? 'opened' : 'collapsed'}>
            <div className="card">
                <div
                    className="card-header"
                    onClick={props.handleClick}
                >
                    {faction.name}
                </div>
                <div className="faction-description card-body">
                    <div>Description: {faction.description}</div>
                    <div className="note">{infoLoaderSolarSystem}</div>
                    <div className="note">{infoLoaderCorporation}</div>
                </div>
            </div>
        </li>
    );
}

export default Faction;
