import React from 'react';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

class Search extends React.Component<{}, {
    searchResult: any
}> {
    constructor(props: any) {
        super(props);

        this.state = {
            searchResult: []
        };
    }

    componentDidMount() {
    }

    search(fields: any) {
        const urlAPI = 'https://esi.evetech.net/latest/search'
            + '?categories=' + fields.category
            + '&search=' + fields.searchString;

        this.setState({
            searchResult: []
        });

        fetch(urlAPI)
            .then(r => r.json())
            .then((response) => {
                if (Object.keys(response).length > 0){
                    // console.log(response);
                    this.parseResult(response, fields.category);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    parseResult(result: any, category: string){
        const urlAPIStorage: { [key: string]: any; } = {
            alliance: {
                url: 'https://esi.evetech.net/latest/alliances/',
                requestBy: 'id',
                requestType: 'get'
            },
            character: {
                url: 'https://esi.evetech.net/latest/characters/',
                requestBy: 'id',
                requestType: 'get'
            },
            agent: {
                url: 'https://esi.evetech.net/latest/characters/',
                requestBy: 'id',
                requestType: 'get'
            },
            constellation: {
                url: 'https://esi.evetech.net/latest/universe/constellations/',
                requestBy: 'id',
                requestType: 'get'
            },
            corporation: {
                url: 'https://esi.evetech.net/latest/corporations/',
                requestBy: 'id',
                requestType: 'get'
            },
            region: {
                url: 'https://esi.evetech.net/latest/universe/regions/',
                requestBy: 'id',
                requestType: 'get'
            },
            'solar_system': {
                url: 'https://esi.evetech.net/latest/universe/systems/',
                requestBy: 'id',
                requestType: 'get'
            },
            station: {
                url: 'https://esi.evetech.net/latest/universe/stations/',
                requestBy: 'id',
                requestType: 'get'
            },
            'inventory_type': {
                url: 'https://esi.evetech.net/latest/universe/names/',
                requestBy: 'array',
                requestType: 'post'
            }
        };
        const allowedCategories = ['faction', 'inventory_type'];
        const idList = result[category].slice(0,10);
        const searchResult = [...this.state.searchResult];

        switch(urlAPIStorage[category].requestBy) {
            case 'id':
                idList.forEach((item: number) => {
                    fetch(urlAPIStorage[category].url + item)
                        .then(r => r.json())
                        .then((response) => {
                            if (response) {
                                searchResult.push({
                                    id: item,
                                    name: response.name
                                });
                                this.setState({
                                    searchResult: searchResult
                                });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
                break;
            case('array'):
                fetch(urlAPIStorage[category].url, {
                    method: 'POST',
                    body: JSON.stringify(idList)
                })
                    .then(r => r.json())
                    .then((response) => {
                        console.log(response);
                        if (response) {
                            this.setState({
                                searchResult: response
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="Search">
                <SearchForm
                    search={(fields: any) => this.search(fields)}
                />
                {this.state.searchResult.length > 0 ? (
                    <SearchResult searchResult={this.state.searchResult}/>
                ) : (
                    <p>Nothing found</p>
                )}
            </div>
        );
    }
}

export default Search;
