import {createAction, createReducer} from '@reduxjs/toolkit';

export const setDataAction = createAction('spreadsheet/setData');
export const activateCell = createAction('spreadsheet/activateCell');
export const activeCellValueModified = createAction('spreadsheet/activeCellValueModified');

export const setSelectedCells = createAction('spreadsheet/setSelectedCells');
export const addSelectedCell = createAction('spreadsheet/addSelectedCell');

export const onDragStart = createAction('spreadsheet/onDragStart');
export const onDragEnd = createAction('spreadsheet/onDragEnd');
export const cellShiftClicked = createAction('spreadsheet/cellShiftClicked');

export const INITIAL_STATE = {
    activeCellAddress: {row: 0, col: 0},
    activeCellValue: '',
    mode: "view",

    // hasPasted: false,
    // cut: false,
    dragging: false,
    rowCount: 100,
    columnCount: 26,
    data: [],
    selectedCells: [],
    // copied: [],
    // bindings: PointMap.from([]),
    // lastCommit: null,
};


const spreadsheetReducer = createReducer(INITIAL_STATE, (builder => {

    builder.addCase(setDataAction, (state, {payload}) => {
        console.log('Set Data Action!')
        const filledData = [];

        for (let i = 0; i < state.rowCount; i++) {

            const row = [];

            for (let j = 0; j < state.columnCount; j++) {
                if (payload && payload[i] && payload[i][j]) {
                    row.push(payload[i][j]);
                } else {
                    row.push({
                        value: ''
                    });
                }
            }
            filledData.push(row);
        }

        state.data = filledData;
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

    builder.addCase(onDragStart, (state, action) => {
        state.dragging = true;
    })

    builder.addCase(onDragEnd, (state, action) => {
        state.dragging = false;
    })

    builder.addCase(cellShiftClicked, (state, {payload}) => {
        const {
            row: targetRow,
            col: targetCol
        } = payload;

        if (state.activeCellAddress) {
            let newSelection = [];
            const fromRow = Math.min(state.activeCellAddress.row, targetRow);
            const toRow = Math.max(state.activeCellAddress.row, targetRow);

            const fromCol = Math.min(state.activeCellAddress.col, targetCol);
            const toCol = Math.max(state.activeCellAddress.col, targetCol);

            for (let i = fromRow; i <= toRow; i++) {
                for (let j = fromCol; j <= toCol; j++) {
                    newSelection.push({row: i, col: j});
                }
            }

            state.selectedCells = newSelection;
        }
    })
}));

export default spreadsheetReducer;
