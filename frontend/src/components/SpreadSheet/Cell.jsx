import React, {useCallback, useEffect} from 'react';
import {makeStyles} from '@mui/styles';
import {useDispatch, useSelector} from 'react-redux';
import {cellsEqual, selectCellData} from './utils';
import {
    activateCell,
    addSelectedCell,
    cellShiftClicked, onCellHovered, onDragEnd,
    onDragStart
} from '../../store/spreadsheetReducer';
import EditCellComponent from './EditCellComponent';

const Cell = props => {
    const {
        hfInstance,
        rowIndex,
        columnIndex,
        columnWidth,
    } = props;

    const active = useSelector(state => {
        const {
            activeCellAddress
        } = state.spreadsheet;

        return activeCellAddress && activeCellAddress.row === rowIndex && activeCellAddress.col === columnIndex;
    });

    const selected = useSelector(state => {
        const {selectedCells = []} = state.spreadsheet;

        return !!selectedCells.find(({row, col, fromRow, toRow, fromCol, toCol}) => {
            if (row && col) {
                return row === rowIndex && col === columnIndex;
            } else {
                return fromCol <= columnIndex && columnIndex <= toCol && fromRow <= rowIndex && rowIndex <= toRow;
            }
        });
    });

    // const cellData = useSelector(selectCellData(rowIndex, columnIndex));

    const cellValue = useSelector(() => hfInstance.getCellValue({sheet: 0, row: rowIndex, col: columnIndex}));
    const cellFormula = useSelector(() => hfInstance.getCellFormula({sheet: 0, row: rowIndex, col: columnIndex}));

    // const cellFormula = hfInstance.getCellFormula({sheet: 0, row: rowIndex, col: columnIndex});

    const dispatch = useDispatch();

    const handleActivate = useCallback((row, col) => {
        dispatch(activateCell({row, col}));
    }, [dispatch]);

    const handleCellSelected = useCallback((row, col) => {
        dispatch(addSelectedCell({row, col}));
    }, [dispatch]);

    const handleCellRangeSelected = useCallback((row, col) => {
        dispatch(cellShiftClicked({row, col}));
    }, [dispatch]);

    const handleDragEnd = useCallback(() => {
        dispatch(onDragEnd());
    }, [dispatch]);

    const handleMouseDown = React.useCallback(event => {
            if (event.shiftKey) {
                handleCellRangeSelected(rowIndex, columnIndex);
            } else if (event.ctrlKey || event.metaKey) {
                handleCellSelected(rowIndex, columnIndex);
            } else {
                handleActivate(rowIndex, columnIndex);
                dispatch(onDragStart());
            }
        },
        [handleActivate, rowIndex, columnIndex]
    );

    const handleMouseOver = React.useCallback(() => {
            dispatch(onCellHovered({row: rowIndex, col: columnIndex}));
        },
        [rowIndex, columnIndex, dispatch]
    );

    const classes = useStyles({selected, active, columnWidth});

    // useEffect(() => {
    //     console.debug("something changed!!!")
    // }, [])

    return (
        <td
            // ref={rootRef}
            className={classes.cell}
            onMouseEnter={handleMouseOver}
            onMouseDown={handleMouseDown}
            onMouseUp={handleDragEnd}
            tabIndex={0}
        >
            <div className={classes.innerCell}>
                {active ? <EditCellComponent
                        rowIndex={rowIndex}
                        columnIndex={columnIndex}
                        hfInstance={hfInstance}
                    /> :
                    <span className={classes.cellValue}>{cellValue}</span>}
            </div>

        </td>
    );
};

const useStyles = makeStyles({
    cell: ({selected, columnWidth}) => ({
        border: '1px solid #AAA',
        width: columnWidth,
        minWidth: columnWidth,
        backgroundColor: selected ? 'rgba(67,113,255,0.2)' : 'transparent',
        padding: 0
    }),
    innerCell: ({active}) => ({
        border: active ? '2px solid #4371ff' : '2px solid transparent',
        padding: 2,
        margin: -1,
        flex: 1,
        position: 'relative',
    }),
    cellValue: ({columnWidth}) => ({
        maxWidth: columnWidth,
        display: 'block',
        wordWrap: 'break-word',
        fontSize: 16,
        userSelect: 'none',
        cursor: 'default'

    }),
    cellInput: {
        width: '100%',
        padding: 0,
        borderWidth: 0,
        border: 'none',
        outline: 'none',
        // fontSize: 14,
        height: 15
    }
});

Cell.propTypes = {};

export default Cell;
