import React, {useCallback} from 'react';
import Row from './Row';
import {makeStyles} from '@mui/styles';
import {computeCellValue, getColumnLabel, selectCellData} from './utils';
import {useDispatch, useSelector} from 'react-redux';
import {Parser as FormulaParser} from 'hot-formula-parser';
import store from '../../store/store';
import {formulaParser} from './formulaParser';

const DEFAULT_COLUMN_WIDTH = 80;

const SpreadSheetTable = () => {

    const rowCount = useSelector(state => state.spreadsheet.rowCount);
    const columnCount = useSelector(state => state.spreadsheet.columnCount);


    React.useEffect(() => {
        formulaParser.on('callCellValue', (cellCoord, done) => {
            console.debug('callCellValue: ', cellCoord)

            let value;
            try {
                const state = store.getState();
                const cellData = selectCellData(state, cellCoord.row.index, cellCoord.column.index);
                value = computeCellValue(formulaParser, cellData);
            } catch (error) {
                console.error(error);
            } finally {
                done(value);
            }
        });

        // formulaParser.on("callRangeValue", (startCellCoord, endCellCoord, done) => {
        //     const startPoint = transformCoordToPoint(startCellCoord);
        //     const endPoint = transformCoordToPoint(endCellCoord);
        //     const data = state.data;
        //     let values;
        //     try {
        //         values = getCellRangeValue(formulaParser, data, startPoint, endPoint);
        //     } catch (error) {
        //         console.error(error);
        //     } finally {
        //         done(values);
        //     }
        // });
    }, [formulaParser]);

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
                            columnCount={columnCount}
                            formulaParser={formulaParser}
                            key={`row-${rowIndex}`}
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
