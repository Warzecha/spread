import {createAction, createReducer} from '@reduxjs/toolkit';
import {isFormulaString} from '../components/SpreadSheet/utils';

export const setDataAction = createAction('spreadsheet/setData');
export const activateCell = createAction('spreadsheet/activateCell');
export const activeCellValueModified = createAction('spreadsheet/activeCellValueModified');

export const setSelectedCells = createAction('spreadsheet/setSelectedCells');
export const addSelectedCell = createAction('spreadsheet/addSelectedCell');

export const onDragStart = createAction('spreadsheet/onDragStart');
export const onDragEnd = createAction('spreadsheet/onDragEnd');
export const cellShiftClicked = createAction('spreadsheet/cellShiftClicked');
export const onCellHovered = createAction('spreadsheet/onCellHovered');

const getSelectionFromRange = (startRow, startCol, targetRow, targetCol) => {
    let newSelection = [];
    const [fromRow, toRow] = [startRow, targetRow].sort();
    const [fromCol, toCol] = [startCol, targetCol].sort();
    for (let i = fromRow; i <= toRow; i++) {
        for (let j = fromCol; j <= toCol; j++) {
            newSelection.push({row: i, col: j});
        }
    }

    return newSelection;
};

export const INITIAL_STATE = {
    activeCellAddress: {row: 0, col: 0},
    activeCellValue: '',
    mode: "view",

    // hasPasted: false,
    // cut: false,
    dragging: false,
    rowCount: 30,
    columnCount: 15,
    data: [],
    selectedCells: [],
    // copied: [],
    // bindings: PointMap.from([]),
    // lastCommit: null,
};


const spreadsheetReducer = createReducer(INITIAL_STATE, (builder => {

    builder.addCase(setDataAction, (state, {payload}) => {
        console.log('Set Data Action!');
        const filledData = [];

        for (let i = 0; i < state.rowCount; i++) {
            const row = [];
            for (let j = 0; j < state.columnCount; j++) {
                if (payload && payload[i] && payload[i][j]) {
                    const {value} = payload[i][j];
                    if (isFormulaString(value)) {
                        row.push(payload[i][j]);
                    } else {
                        row.push({...payload[i][j], computedValue: value});
                    }
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
    });

    builder.addCase(setSelectedCells, ((state, {payload}) => {
        state.selectedCells = payload;
    }));

    builder.addCase(addSelectedCell, ((state, {payload}) => {
        state.selectedCells.push(payload);
    }));

    builder.addCase(onDragStart, (state, action) => {
        state.dragging = true;
    });

    builder.addCase(onDragEnd, (state, action) => {
        state.dragging = false;
    });

    builder.addCase(cellShiftClicked, (state, {payload}) => {
        const {
            row: targetRow,
            col: targetCol
        } = payload;

        if (state.activeCellAddress) {
            const {
                row: activeCellRow,
                col: activeCellCol
            } = state.activeCellAddress;
            state.selectedCells = getSelectionFromRange(activeCellRow, activeCellCol, targetRow, targetCol);
        }
    });

    builder.addCase(onCellHovered, (state, {payload}) => {
        if (!state.dragging) {
            return;
        }

        const {
            row: targetRow,
            col: targetCol
        } = payload;

        if (state.activeCellAddress) {
            const {
                row: activeCellRow,
                col: activeCellCol
            } = state.activeCellAddress;
            state.selectedCells = getSelectionFromRange(activeCellRow, activeCellCol, targetRow, targetCol);
        }
    });
}));

export default spreadsheetReducer;
