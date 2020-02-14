import { SearchState } from '../types';

const initialState: SearchState = {
    searchResult: []
};

const searchReducer = (state = initialState, action: string) => {
    return state;
};

export default searchReducer;