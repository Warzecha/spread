import React, {useCallback} from 'react';
import Row from './Row';
import {makeStyles} from '@mui/styles';
import {getColumnLabel} from './utils';
import {useDispatch, useSelector} from 'react-redux';
import {onDragStart} from '../../store/spreadsheetReducer';

const DEFAULT_COLUMN_WIDTH = 80;

const SpreadSheetTable = () => {

    const rowCount = useSelector(state => state.spreadsheet.rowCount);
    const columnCount = useSelector(state => state.spreadsheet.columnCount);

    const classes = useStyles();

    return (
        <div className={classes.tableContainer}>
            <table className={classes.table}>

                <thead>
                <tr className={classes.headerRow}>
                    <th className={classes.columnHeader}/>
                    {Array.from({length: columnCount}, (_, i) => i)
                        .map((_, i) => <th key={`column-${i}`}
                                           className={classes.columnHeader}>{getColumnLabel(i)}</th>)}
                </tr>

                </thead>

                <tbody className={classes.tableBody}>
                {
                    Array.from({length: rowCount}, (_, i) => i)
                        .map((cells, rowIndex) => <Row
                            rowIndex={rowIndex}
                            key={`row-${rowIndex}`}
                            columnCount={columnCount}
                        />)
                }
                </tbody>
            </table>
        </div>);
};

const useStyles = makeStyles({
    tableContainer: {
        overflowX: 'scroll',
        overflowY: 'scroll'
    },
    table: {
        borderCollapse: 'collapse',
        tableLayout: 'fixed',
    },
    tableBody: {
        paddingTop: 22
    },
    columnHeader: {
        width: 80,
        minWidth: 80
    },
    headerRow: {
        border: '1px solid #AAA',
        backgroundColor: '#EEE',
    }
});

export default SpreadSheetTable;
