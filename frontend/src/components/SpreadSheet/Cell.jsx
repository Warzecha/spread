import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@mui/styles';
import {onDragStart} from '../../store/spreadsheetReducer';
import {InputBase} from '@mui/material';

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
        onCellShiftClicked,
        onActivate,
        columnWidth,
        activeCellValue,
        setActiveCellValue,
        onDragStart,
        onDragEnd
    } = props;

    const {
        value = '',
        formula = ''
    } = data || {};

    const inputRef = useRef(null);

    const classes = useStyles({selected, active, columnWidth});

    const rootRef = React.useRef(null);

    const handleMouseDown = React.useCallback(event => {
            if (event.shiftKey) {
                onCellShiftClicked(row, column);
            } else if (event.ctrlKey || event.metaKey) {
                onSelect(row, column);
            } else {
                onActivate(row, column);
                onDragStart()
            }
        },
        [mode, onSelect, onActivate, row, column]
    );

    const handleMouseOver = React.useCallback(event => {
            if (dragging) {
                // setCellDimensions(point, getOffsetRect(event.currentTarget));
                // onSelect(row, column);
                onCellShiftClicked(row, column)
            }
        },
        [onSelect, dragging, row, column]
    );

    useEffect(() => {
        if (active) {
            inputRef.current.focus();
        }
    }, [active]);

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
            onMouseUp={onDragEnd}
            tabIndex={0}
        >
            <div className={classes.innerCell}>
                {active ? <InputBase value={activeCellValue}
                                 onChange={e => setActiveCellValue(e.target.value)}
                                 className={classes.cellInput}
                                 ref={inputRef}
                    /> :
                    <span className={classes.cellValue}>{formula || value}</span>}
            </div>

        </td>
    );
};

const useStyles = makeStyles({
    cell: ({selected, active, columnWidth}) => ({
        border: '1px solid #AAA',
        // border: (selected || active) ? '1px solid #4371ff' : '1px solid #666',
        width: columnWidth,
        minWidth: columnWidth,
        backgroundColor: selected ? 'rgba(67,113,255,0.2)' : 'transparent',
        padding: 0
    }),
    innerCell: ({selected, active, columnWidth}) => ({
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
        fontSize: 12,
        userSelect: 'none',
        cursor: 'default'

    }),
    cellInput: {
        width: '100%',
        padding: 0,
        borderWidth: 0,
        border: 'none',
        outline: 'none',
        fontSize: 12,
        height: 15
    }
});

Cell.propTypes = {};

export default Cell;
