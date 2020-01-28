import React from 'react';
import './UniverseApp.css';
import FactionsList from './components/FactionsList';

class UniverseApp extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);

        this.state = {
            pages: []
        };
    }

    render() {
        return (
            <div>
                <header>
                    <ul>
                        <li data-ref="factionsList">Factions</li>
                        <li data-ref="search">Search</li>
                    </ul>
                </header>
                <FactionsList />
            </div>
        );
    }
}

export default UniverseApp;
