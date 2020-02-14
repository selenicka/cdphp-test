import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import SearchResult from './SearchResult/SearchResult';
import { SearchState } from '../../store/types';
import * as apiService from '../../services/apiService';

class Search extends React.Component<{}, SearchState> {
    constructor(props: any) {
        super(props);

        this.state = {
            searchResult: []
        };
    }

    search(fields: any) {
        this.setState({
            searchResult: []
        });

        apiService.getSearchResult(fields.category, fields.searchString)
            .then((response) => {
                if (Object.keys(response).length > 0){
                    this.parseResult(response, fields.category);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    parseResult(result: any, category: string){
        const idList = result[category].slice(0,10);
        const searchResult = [...this.state.searchResult];

        apiService.getNamesListByIds(idList, category)
            .then((response) => {
                if (response) {
                    this.setState({
                        searchResult: response
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
