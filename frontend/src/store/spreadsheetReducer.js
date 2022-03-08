import {createAction, createReducer} from '@reduxjs/toolkit';
import {hfInstance} from '../components/SpreadSheet/hf';

export const setDataAction = createAction('spreadsheet/setData');
export const activateCell = createAction('spreadsheet/activateCell');
export const activeCellValueModified = createAction('spreadsheet/activeCellValueModified');

export const addSelectedCell = createAction('spreadsheet/addSelectedCell');

export const onDragStart = createAction('spreadsheet/onDragStart');
export const onDragEnd = createAction('spreadsheet/onDragEnd');
export const cellShiftClicked = createAction('spreadsheet/cellShiftClicked');
export const onCellHovered = createAction('spreadsheet/onCellHovered');

export const undoAction = createAction('spreadsheet/undoAction');
export const redoAction = createAction('spreadsheet/redoAction');

const getSelectionFromRange = (startRow, startCol, targetRow, targetCol) => {
    const [fromRow, toRow] = [startRow, targetRow].sort((a, b) => a - b);
    const [fromCol, toCol] = [startCol, targetCol].sort((a, b) => a - b);

    return [{
        fromRow,
        toRow,
        fromCol,
        toCol
    }];
};

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

    refresher: {}
};


const spreadsheetReducer = createReducer(INITIAL_STATE, (builder => {

    builder.addCase(setDataAction, (state, {payload}) => {
        console.log('Set Data Action!');
        const filledData = [];

        for (let i = 0; i < state.rowCount; i++) {
            const row = [];
            for (let j = 0; j < state.columnCount; j++) {
                if (payload && payload[i] && payload[i][j]) {
                    row.push(payload[i][j]);
                } else {
                    row.push('');
                }
            }
            filledData.push(row);
        }

        state.data = filledData;
    });

    builder.addCase(activateCell, (state, {payload}) => {
        const {
            row,
            col
        } = payload || {};

        if (state.activeCellAddress) {
            const {row: prevRow, col: prevCol} = state.activeCellAddress;
            hfInstance.setCellContents({sheet: 0, row: prevRow, col: prevCol}, [[state.activeCellValue]]);
        }

        state.activeCellAddress = payload;

        const cellFormula = hfInstance.getCellFormula({sheet: 0, col, row});
        const cellValue = hfInstance.getCellValue({sheet: 0, col, row});
        state.activeCellValue = cellFormula || cellValue;
        state.selectedCells = [];
    });

    builder.addCase(activeCellValueModified, (state, {payload}) => {
        state.activeCellValue = payload;
    });

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

    builder.addCase(undoAction, (state) => {
        if (!hfInstance.isThereSomethingToUndo()) {
            console.log("There's nothing to undo.");
            return;
        }

        hfInstance.undo();
        state.refresher = {};
    })

    builder.addCase(redoAction, (state) => {
        if (!hfInstance.isThereSomethingToRedo()) {
            console.log("There's nothing to redo.");
            return;
        }

        hfInstance.redo();
        state.refresher = {};
    })
}));

export default spreadsheetReducer;
