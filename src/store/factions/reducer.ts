import { FactionListState } from '../types';
import { BaseAction, FactionsActionTypes } from '../types';

const initialState: FactionListState = {
    factionsList: [],
    isModal: false,
    selectedIndex: 0,
    factionsExpandedState: []
};

export const factionReducer = (
    state = initialState,
    action: BaseAction
) => {
    console.log(action);
    switch (action.type) {
        case FactionsActionTypes.GET_FACTIONS_REQUEST_COMPLETED:
            return {
                ...state,
                factionsList: action.payload
            };
        case FactionsActionTypes.UPDATE_FACTION:
            const factions = [...state.factionsList];
            const clicked: any = factions[action.payload.selectedIndex];

            clicked[action.payload.propName] = action.payload.propValue;

            return {
                ...state,
                factionsList: factions
            };
        case FactionsActionTypes.SHOW_MODAL:
            return {
                ...state,
                isModal: !state.isModal
            };
    }
    return state;
};
