import {configureStore} from '@reduxjs/toolkit';
import spreadsheetReducer from './spreadsheetReducer';

const reducer = {
    spreadsheet: spreadsheetReducer,
};

const store = configureStore({
    reducer: reducer,
    devTools: true
});

export default store;
