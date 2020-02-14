import { all, fork } from 'redux-saga/effects';
import { watchNewFactionsRequestStart } from './factions/sagas';

export const rootSaga = function* root() {
    yield all([
        fork(watchNewFactionsRequestStart),
        // `fork()` any other store sagas down here...
    ]);
};
