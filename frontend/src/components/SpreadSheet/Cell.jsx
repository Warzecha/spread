import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@mui/styles';

const Cell = props => {
    const {
        row,
        column,
        selected,
        active,
        dragging,
        mode,
        data,
        onSelect,
        onActivate,
        columnWidth,
        activeCellValue,
        setActiveCellValue
    } = props;

    const {
        value = '',
        formula = ''
    } = data || {};

    const classes = useStyles({selected, active, columnWidth});

    const rootRef = React.useRef(null);

    const handleMouseDown = React.useCallback(event => {
            if (mode === "view") {
                // setCellDimensions(point, getOffsetRect(event.currentTarget));
                if (event.shiftKey) {
                    onSelect(row, column);
                } else {
                    onActivate(row, column);
                }
            }
        },
        [mode, onSelect, onActivate, row, column]
    );

    const handleMouseOver = React.useCallback(event => {
            if (dragging) {
                // setCellDimensions(point, getOffsetRect(event.currentTarget));
                onSelect(row, column);
            }
        },
        [onSelect, dragging, row, column]
    );

    // React.useEffect(() => {
    //     const root = rootRef.current;
    //     if (selected && root) {
    //         // setCellDimensions(point, getOffsetRect(root));
    //     }
    //     if (root && active && mode === "view") {
    //         root.focus();
    //     }
    // }, [setCellDimensions, selected, active, mode, point]);

    return (
        <td
            ref={rootRef}
            className={classes.cell}
            onMouseOver={handleMouseOver}
            onMouseDown={handleMouseDown}
            tabIndex={0}
        >
            {active ? <input value={activeCellValue} onChange={e => setActiveCellValue(e.target.value)}
                             className={classes.cellInput} autoFocus/> : <span className={classes.cellValue}>{formula || value}</span>}
        </td>
    );
};

const useStyles = makeStyles({
    cell: ({selected, active, columnWidth}) => ({
        border: (selected || active) ? '2px solid #4371ff' : '1px solid #666',
        width: columnWidth,
        backgroundColor: selected ? 'rgba(67,113,255,0.2)' : 'transparent'
    }),
    cellValue: ({columnWidth}) => ({
        maxWidth: columnWidth,
        display: 'block',
        wordWrap: 'break-word',
        fontSize: 12
    }),
    cellInput: {
        width: '100%',
        padding: 0,
        borderWidth: 0,
        border: 'none',
        outline: 'none',
        fontSize: 12
    }
});

Cell.propTypes = {};

export default Cell;
