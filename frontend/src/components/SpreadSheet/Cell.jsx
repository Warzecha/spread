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
    } = props;

    const classes = useStyles({selected, active});

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
            {/*<DataViewer*/}
            {/*    row={row}*/}
            {/*    column={column}*/}
            {/*    cell={data}*/}
            {/*    formulaParser={formulaParser}*/}
            {/*/>*/}
        </td>
    );
};

const useStyles = makeStyles({
    cell: ({selected, active}) => ({
        border: '1px solid #888',
        borderCollapse: 'collapse',
    })


});

Cell.propTypes = {};

export default Cell;
