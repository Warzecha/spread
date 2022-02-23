import {createAction, createReducer} from '@reduxjs/toolkit';

export const setDataAction = createAction('spreadsheet/setData');
export const activateCell = createAction('spreadsheet/activateCell');
export const activeCellValueModified = createAction('spreadsheet/activeCellValueModified');

export const setSelectedCells = createAction('spreadsheet/setSelectedCells');
export const addSelectedCell = createAction('spreadsheet/addSelectedCell');

export const INITIAL_STATE = {
    activeCellAddress: {row: 0, col: 0},
    activeCellValue: '',
    mode: "view",

    // hasPasted: false,
    // cut: false,
    dragging: false,
    data: [],
    selectedCells: [],
    // copied: [],
    // bindings: PointMap.from([]),
    // lastCommit: null,
};


const spreadsheetReducer = createReducer(INITIAL_STATE, (builder => {

    builder.addCase(setDataAction, (state, {payload}) => {
        state.data = payload;
    });

    builder.addCase(activateCell, (state, {payload}) => {
        // TODO: Set active cell value.
        if (state.activeCellAddress) {
            const {row: prevRow, col: prevCol} = state.activeCellAddress;
            state.data[prevRow][prevCol].value = state.activeCellValue;
        }

        const {
            row,
            col
        } = payload;

        state.activeCellAddress = payload;
        state.activeCellValue = state.data[row][col].value;
        state.selectedCells = [];
    });

    builder.addCase(activeCellValueModified, (state, {payload}) => {
        state.activeCellValue = payload;
    })

    builder.addCase(setSelectedCells, ((state, {payload}) => {
        state.selectedCells = payload;
    }))

    builder.addCase(addSelectedCell, ((state, {payload}) => {
        state.selectedCells.push(payload);
    }))
}));

export default spreadsheetReducer;
