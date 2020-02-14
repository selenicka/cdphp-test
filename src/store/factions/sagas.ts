import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiService from '../../services/apiService';
import { FactionsActionTypes } from '../types';
import { factionsRequestCompletedAction } from './actions';

export function* watchNewFactionsRequestStart() {
    yield takeLatest(
        FactionsActionTypes.GET_FACTIONS_REQUEST_START,
        requestNewFactionsList
    );
}

function* requestNewFactionsList() {
    const factionsList: object[] = yield call(apiService.getDataByKey, 'factions');
    yield put(factionsRequestCompletedAction(factionsList));
}