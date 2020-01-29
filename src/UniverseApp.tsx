import React from 'react';
import './UniverseApp.css';
import FactionsList from './components/FactionsList';
import Search from "./components/Search";

class UniverseApp extends React.Component<{}, {
    pages: any,
    pagesState: any
}> {
    constructor(props: any) {
        super(props);

        this.state = {
            pages: [{
                ref: 'factionsList',
                name: 'Factions'
            }, {
                ref: 'search',
                name: 'Search'
            }],
            pagesState: [true, false]
        };
    }

    componentDidMount() {
    }

    handleClick(e: any, index: number) {
        const pagesState = Array(2).fill(false);

        pagesState[index] = !pagesState[index];

        this.setState({
            pagesState: pagesState
        });
    }

    render() {
        const pages: any = this.state.pages;

        return (
            <div>
                <header>
                    <ul className="nav">
                        {pages.map((page: any, index: number) =>
                            <li
                                key={index}
                                data-ref={page.ref}
                                className={'nav-item' + (this.state.pagesState[index] ? ' active' : '')}
                                onClick={(e: any) => this.handleClick(e, index)}
                            >
                                <a className="nav-link" href="#">
                                    {page.name}
                                </a>
                            </li>
                        )}
                    </ul>
                </header>

                {
                    this.state.pagesState[0] ? (
                        <FactionsList />
                    ) : (
                        <Search />
                    )
                }
            </div>
        );
    }
}

export default UniverseApp;
