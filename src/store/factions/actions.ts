import { BaseAction, FactionsActionTypes } from '../types';

export const factionsRequestStartAction = (): BaseAction => ({
    type: FactionsActionTypes.GET_FACTIONS_REQUEST_START,
    payload: null,
});

export const factionsRequestCompletedAction = (
    factionsList: object[]
): BaseAction => ({
    type: FactionsActionTypes.GET_FACTIONS_REQUEST_COMPLETED,
    payload: factionsList,
});

export const showModalAction = (): BaseAction => ({
    type: FactionsActionTypes.SHOW_MODAL,
    payload: null,
});

export const updateFactionAction = (
    propName: string,
    propValue: object,
    index: number
): BaseAction => ({
    type: FactionsActionTypes.UPDATE_FACTION,
    payload: {
        propName: propName,
        propValue: propValue,
        selectedIndex: index
    },
});