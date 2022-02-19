import React, {useState} from 'react';
import Row from './Row';
import Cell from './Cell';
import {makeStyles} from '@mui/styles';
import {getColumnLabel} from './utils';

const DEFAULT_COLUMN_WIDTH = 80;

const cellsEqual = (cell1, cell2) => {
    if (cell1 === null && cell2 === null) {
        return true;
    } else if (!cell1 || !cell2) {
        return false;
    } else {
        return cell1.row === cell2.row && cell1.col === cell2.col;

    }

}

const SpreadSheetTable = (props) => {
    const {
        data,
        setData,
        colCount
    } = props;

    const [activeCell, setActiveCell] = useState(null);
    const [activeCellValue, setActiveCellValue] = useState('');

    const [selectedCellList, setSelectedCellList] = useState([]);

    const handleActivate = (row, col) => {

        // TODO: If current active cell != null then apply active cell value
        if (activeCell != null) {
            setData(prevRows => prevRows.map((row, ri) => ri !== activeCell.row ? row : row.map((cell, ci) => ci !== activeCell.col ? cell : {value: activeCellValue})));
        }

        setActiveCell({row, col});

        const {
            value: newActiveCellValue
        } = data[row][col];

        setActiveCellValue(newActiveCellValue);
    };

    const handleCellSelected = (row, col) => {
        setSelectedCellList(prev => [...prev, {row, col}])
    }


    const classes = useStyles();

    return (
        <div>

            <table className={classes.table}>

                <thead>
                <th/>

                {
                    Array.from({length: colCount}, (_, i) => i)
                        .map((_, i) => <th key={`column-${i}`}>{getColumnLabel(i)}</th>)
                }
                </thead>

                <tbody>
                {
                    data.map((cells, rowIndex) => <Row row={rowIndex} key={`row-${rowIndex}`}>
                        {
                            cells.map((cell, columnIndex) => <Cell
                                row={rowIndex}
                                column={columnIndex}
                                selected={!!selectedCellList.find(cell => cellsEqual(cell, {row: rowIndex, col: columnIndex}))}
                                active={activeCell && activeCell.row === rowIndex && activeCell.col === columnIndex}
                                dragging={false}
                                mode={'view'}
                                data={cell}
                                onSelect={handleCellSelected}
                                onActivate={handleActivate}
                                columnWidth={DEFAULT_COLUMN_WIDTH}
                                activeCellValue={activeCellValue}
                                setActiveCellValue={setActiveCellValue}
                            />)
                        }
                    </Row>)
                }
                </tbody>


            </table>

        </div>
    );
};

const useStyles = makeStyles({
    table: {
        border: '1px solid #888',
        borderCollapse: 'collapse',
    }
});

export default SpreadSheetTable;
