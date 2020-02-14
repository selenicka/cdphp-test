import { combineReducers } from 'redux';
import { factionReducer } from './factions/reducer';
import searchReducer from './search/reducer';

const rootReducer = combineReducers({
    factions: factionReducer,
    search: searchReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;