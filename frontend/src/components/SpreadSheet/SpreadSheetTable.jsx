import React, {useCallback} from 'react';
import Row from './Row';
import Cell from './Cell';
import {makeStyles} from '@mui/styles';
import {getColumnLabel} from './utils';
import {useDispatch, useSelector} from 'react-redux';
import {
    activateCell,
    activeCellValueModified,
    addSelectedCell, onDragEnd,
    onDragStart,
    setSelectedCells
} from '../../store/spreadsheetReducer';

const DEFAULT_COLUMN_WIDTH = 80;

const cellsEqual = (cell1, cell2) => {
    if (cell1 === null && cell2 === null) {
        return true;
    } else if (!cell1 || !cell2) {
        return false;
    } else {
        return cell1.row === cell2.row && cell1.col === cell2.col;
    }
};

const SpreadSheetTable = () => {
    const dispatch = useDispatch();

    const {
        data,
        activeCellAddress,
        activeCellValue,
        selectedCells,
        dragging,
        columnCount,
        rowCount
    } = useSelector(state => state.spreadsheet);

    const setActiveCellValue = useCallback((newValue) => {
        dispatch(activeCellValueModified(newValue));
    }, [dispatch]);

    const handleActivate = useCallback((row, col) => {
        dispatch(activateCell({row, col}));
    }, [dispatch]);

    const handleCellSelected = useCallback((row, col) => {
        dispatch(addSelectedCell({row, col}));
    }, [dispatch]);

    const handleCellRangeSelected = useCallback((targetRow, targetCol) => {
        if (activeCellAddress) {
            let newSelection = [];
            const fromRow = Math.min(activeCellAddress.row, targetRow);
            const toRow = Math.max(activeCellAddress.row, targetRow);

            const fromCol = Math.min(activeCellAddress.col, targetCol);
            const toCol = Math.max(activeCellAddress.col, targetCol);

            for (let i = fromRow; i <= toRow; i++) {
                for (let j = fromCol; j <= toCol; j++) {
                    newSelection.push({row: i, col: j});
                }
            }
            dispatch(setSelectedCells(newSelection));
        }
    }, [dispatch, activeCellAddress]);

    const handleDragStart = useCallback(() => {
        dispatch(onDragStart());
    }, [dispatch]);

    const handleDragEnd = useCallback(() => {
        dispatch(onDragEnd());
    }, [dispatch]);

    const classes = useStyles();

    return (
        <div className={classes.tableContainer}>
            <table className={classes.table}>

                <thead>
                <tr className={classes.headerRow}>
                    <th/>

                    {Array.from({length: columnCount}, (_, i) => i)
                        .map((_, i) => <th key={`column-${i}`}
                                           className={classes.columnHeader}>{getColumnLabel(i)}</th>)}
                </tr>

                </thead>

                <tbody className={classes.tableBody}>
                {data.map((cells, rowIndex) => <Row row={rowIndex} key={`row-${rowIndex}`}>
                    {cells.map((cell, columnIndex) => <Cell
                        row={rowIndex}
                        column={columnIndex}
                        selected={!!selectedCells.find(cell => cellsEqual(cell, {
                            row: rowIndex, col: columnIndex
                        }))}
                        active={activeCellAddress && activeCellAddress.row === rowIndex && activeCellAddress.col === columnIndex}
                        dragging={dragging}
                        mode={'view'}
                        data={cell}
                        onSelect={handleCellSelected}
                        onCellShiftClicked={handleCellRangeSelected}
                        onActivate={handleActivate}
                        columnWidth={DEFAULT_COLUMN_WIDTH}
                        activeCellValue={activeCellValue}
                        setActiveCellValue={setActiveCellValue}
                        key={`cell-${rowIndex}-${columnIndex}`}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    />)}
                </Row>)}
                </tbody>
            </table>
        </div>);
};

const useStyles = makeStyles({
    tableContainer: {
        width: 'calc(100vw - 80px)',
        marginLeft: 84,
        overflowX: 'scroll',
        overflowY: 'scroll'
    },
    table: {
        // border: '1px solid #888',
        borderCollapse: 'collapse',
        tableLayout: 'fixed',
    },
    tableBody: {
        marginLeft: 80,
    },
    columnHeader: {
        width: 80,
        minWidth: 80
    },
    headerRow: {
        position: 'fixed',
        left: 80,
        top: 'auto',
        border: '1px solid #AAA',
        backgroundColor: '#EEE',
        overflowX: 'scroll'
    }
});

export default SpreadSheetTable;
