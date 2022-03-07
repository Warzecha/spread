import React, {useCallback, useEffect, useRef} from 'react';
import {InputBase} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {activeCellValueModified} from '../../store/spreadsheetReducer';
import {makeStyles, styled} from '@mui/styles';

const CustomInput = styled(InputBase)({
    '& input': {
        // backgroundColor: 'green',
        padding: 0
    },
});

const EditCellComponent = () => {
    const {
        activeCellValue,
    } = useSelector(state => state.spreadsheet);

    const dispatch = useDispatch();

    const setActiveCellValue = useCallback((newValue) => {
        dispatch(activeCellValueModified(newValue));
    }, [dispatch]);

    const inputRef = useRef(null);

    const classes = useStyles();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div>
            <CustomInput value={activeCellValue}
                       onChange={e => setActiveCellValue(e.target.value)}
                       className={classes.cellInput}
                       ref={inputRef}
            />
        </div>
    );
};

const useStyles = makeStyles({
    cellInput: {
        width: '100%',
        height: '100%',
        padding: 0,
        borderWidth: 0,
        border: 'none',
        outline: 'none'
        // fontSize: 14,
        // height: 15
    }
});

export default EditCellComponent;
