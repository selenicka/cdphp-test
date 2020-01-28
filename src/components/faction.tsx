import React from 'react';
import './faction.css';
import FactionInfoLoader from './factionInfoLoader';

function Faction(props: any) {
    const faction = props.faction;
    let infoLoaderCorporation;
    let infoLoaderSolarSystem;

    if (faction.isOpened) {
        infoLoaderSolarSystem = <FactionInfoLoader
            title="Solar System"
            id={props.faction['solar_system_id']}
            urlKey="solarSystem"
            updateFaction={(propName: string, propValue: any) => props.updateFaction(propName, propValue, props.index)}
            value={props.faction.solarSystem ? props.faction.solarSystem.name : ''}
            isLink={false}
            openModal={(e: any) => props.openModal(e, props.index)}
        />;
        infoLoaderCorporation = <FactionInfoLoader
            title="Corporation"
            id={props.faction['corporation_id']}
            urlKey="corporation"
            updateFaction={(propName: string, propValue: any) => props.updateFaction(propName, propValue, props.index)}
            value={props.faction.corporation ? props.faction.corporation.name : ''}
            isLink={true}
            openModal={(e: any) => props.openModal(e, props.index)}
        />;
    }

    return (
        <li className={faction.isOpened ? 'opened' : 'collapsed'}>
            <div className="card">
                <div
                    className="card-header"
                    onClick={(e) => props.onClick(e, props.index)}
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
