import React from 'react';
import {makeStyles} from '@mui/styles';
import Cell from './Cell';

const Row = ({rowIndex, columnCount, formulaParser}) => {
    const classes = useStyles();

    return (
        <tr className={classes.row}>
            <th className={classes.headCol}>{rowIndex + 1}</th>

            {
                Array.from({length: columnCount}, (_, i) => i)
                    .map((_, columnIndex) => <Cell
                        rowIndex={rowIndex}
                        columnIndex={columnIndex}
                        formulaParser={formulaParser}
                        columnWidth={80}
                        key={`cell-${rowIndex}-${columnIndex}`}

                    />)}

        </tr>
    );
};

const useStyles = makeStyles({
    row: {
        height: 22
    },
    headCol: {
        // position: 'absolute',
        width: 80,
        left: 0,
        top: 'auto',
        border: '1px solid #AAA',
        backgroundColor: '#EEE',
    }
});

Row.propTypes = {};

export default Row;
