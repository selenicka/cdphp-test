import React from 'react';
import './UniverseApp.css';
import FactionsList from './containers/FactionsList/FactionsList';
import Search from './containers/Search/Search';
import Layout from './components/Layout/Layout';

class UniverseApp extends React.Component<{}, {
    pages: any,
    pagesState: any
}> {
    constructor(props: any) {
        super(props);

        this.state = {
            pages: [{
                pageKey: 'factionsList',
                name: 'Factions'
            }, {
                pageKey: 'search',
                name: 'Search'
            }],
            pagesState: []
        };
    }

    componentDidMount() {
        const pagesState = Array(this.state.pages.length).fill(false);
        pagesState[0] = true;

        this.setState({
            pagesState: pagesState
        });
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
            <Layout pages={pages}>
                <ul className="nav">
                    {pages.map((page: any, index: number) =>
                        <li
                            key={page.pageKey}
                            className={'nav-item' + (this.state.pagesState[index] ? ' active' : '')}
                            onClick={(e: any) => this.handleClick(e, index)}
                        >
                            <a className="nav-link" href="#">
                                {page.name}
                            </a>
                        </li>
                    )}
                </ul>
                {
                    this.state.pagesState[0] ? (
                        <FactionsList />
                    ) : (
                        <Search />
                    )
                }
            </Layout>
        );
    }
}

export default UniverseApp;
