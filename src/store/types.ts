export interface FactionListState {
    factionsList: object[],
    isModal: boolean,
    selectedIndex: number,
    factionsExpandedState: boolean[]
}

export interface SearchState {
    searchResult: any
}

export enum FactionsActionTypes {
    GET_FACTIONS_REQUEST_START = '@@factions/GET_FACTIONS_REQUEST_START',
    GET_FACTIONS_REQUEST_COMPLETED = '@@factions/GET_FACTIONS_REQUEST_COMPLETED',
    UPDATE_FACTION = '@@factions/UPDATE_FACTION',
    SHOW_MODAL = '@@factions/SHOW_MODAL'
}

export interface BaseAction {
    type : string;
    payload?: any;
}