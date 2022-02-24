import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@mui/styles';

const Row = ({row, children}) => {
    const classes = useStyles();
    return (
        <tr className={classes.row}>
            <th className={classes.headCol}>{row + 1}</th>
            {children}
        </tr>
    );
};

const useStyles = makeStyles({
    row: {
        height: 22
    },
    headCol: {
        position: 'absolute',
        width: 80,
        left: 0,
        top: 'auto',
        border: '1px solid #AAA',
        backgroundColor: '#EEE'
    }
});

Row.propTypes = {};

export default Row;
