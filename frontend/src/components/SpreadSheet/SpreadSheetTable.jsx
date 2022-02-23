import React, {useEffect, useState} from 'react';
import Row from './Row';
import Cell from './Cell';
import {makeStyles} from '@mui/styles';
import {getColumnLabel} from './utils';
import {Button, Divider, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import {useDispatch, useSelector} from 'react-redux';
import {activateCell, activeCellValueModified, addSelectedCell, setSelectedCells} from '../../store/spreadsheetReducer';

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

const SpreadSheetTable = (props) => {
    const {
        colCount
    } = props;

    // const [activeCell, setActiveCell] = useState(null);
    // const [activeCellValue, setActiveCellValue] = useState('');

    // const [selectedCellList, setSelectedCellList] = useState([]);

    const dispatch = useDispatch();

    const {
        data,
        activeCellAddress,
        activeCellValue,
        selectedCells
    } = useSelector(state => state.spreadsheet);

    const setData = () => {
        console.log('Set data');
    };

    const setActiveCellValue = (newValue) => {
        dispatch(activeCellValueModified(newValue));
    };

    const handleActivate = (row, col) => {
        dispatch(activateCell({row, col}));
    };

    const handleCellSelected = (row, col) => {
        dispatch(addSelectedCell({row, col}));
    };

    const handleCellShiftClicked = (targetRow, targetCol) => {
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
            // setSelectedCellList(newSelection);
        }
    };

    const classes = useStyles();

    return (<div>

        <div className={classes.toolsRibbon}>

            <IconButton size={'small'}>
                <UndoIcon/>
            </IconButton>
            <IconButton size={'small'}>
                <RedoIcon/>
            </IconButton>

        </div>

        <Divider/>


        <div className={classes.activeCellDetailsBar}>
                <span className={classes.activeCellAddress}>
                    {activeCellAddress ? `${getColumnLabel(activeCellAddress.col)}${activeCellAddress.row + 1}` : '-'}
                </span>

            <Divider orientation={'vertical'} flexItem/>

            <input value={activeCellValue}
                   onChange={e => setActiveCellValue(e.target.value)}
                   className={classes.activeCellInput}
                   autoFocus
            />

        </div>

        <Divider/>

        <table className={classes.table}>

            <thead>
            <tr>
                <th/>

                {Array.from({length: colCount}, (_, i) => i)
                    .map((_, i) => <th key={`column-${i}`}>{getColumnLabel(i)}</th>)}
            </tr>

            </thead>

            <tbody>
            {data.map((cells, rowIndex) => <Row row={rowIndex} key={`row-${rowIndex}`}>
                {cells.map((cell, columnIndex) => <Cell
                    row={rowIndex}
                    column={columnIndex}
                    selected={!!selectedCells.find(cell => cellsEqual(cell, {
                        row: rowIndex, col: columnIndex
                    }))}
                    active={activeCellAddress && activeCellAddress.row === rowIndex && activeCellAddress.col === columnIndex}
                    dragging={false}
                    mode={'view'}
                    data={cell}
                    onSelect={handleCellSelected}
                    onCellShiftClicked={handleCellShiftClicked}
                    onActivate={handleActivate}
                    columnWidth={DEFAULT_COLUMN_WIDTH}
                    activeCellValue={activeCellValue}
                    setActiveCellValue={setActiveCellValue}
                    key={`cell-${rowIndex}-${columnIndex}`}
                />)}
            </Row>)}
            </tbody>


        </table>

    </div>);
};

const useStyles = makeStyles({
    table: {
        // border: '1px solid #888',
        borderCollapse: 'collapse', tableLayout: 'fixed'
    }, toolsRibbon: {
        display: 'flex', paddingLeft: 8, paddingRight: 8,
    }, activeCellDetailsBar: {
        display: 'flex',
    }, activeCellAddress: {
        width: 48, textAlign: 'center', fontSize: 14
    }, activeCellInput: {
        flex: 1, borderWidth: 0, border: 'none', outline: 'none', fontSize: 14,
    }
});

export default SpreadSheetTable;
