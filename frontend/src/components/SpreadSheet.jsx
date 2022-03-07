import React, {useEffect, useReducer, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setDataAction} from '../store/spreadsheetReducer';
import {makeStyles} from '@mui/styles';
import SpreadSheetTable from './SpreadSheet/SpreadSheetTable';
import SpreadSheetToolbar from './SpreadSheet/SpreadSheetToolbar';
import {hfInstance} from './SpreadSheet/hf';

const ROWS = 30;
const COLS = 20;

const SpreadSheet = () => {
    const [fileName, setFileName] = useState('File name');

    const dispatch = useDispatch();

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const classes = useStyles();

    useEffect(() => {
        const tableData = [
            [],
            ['', 'Amount', 'Unit price', 'Tax %', 'Net Price', 'Gross price', 'Total tax',],
            ['', 1, 5.40, 10, '=B3*C3', '=E3*(1+D3%)', '=E3*D3%',],
        ];

        const filledData = [];

        for (let i = 0; i < ROWS; i++) {
            const row = [];
            for (let j = 0; j < COLS; j++) {
                if (tableData && tableData[i] && tableData[i][j]) {
                    row.push(tableData[i][j]);
                } else {
                    row.push('');
                }
            }
            filledData.push(row);
        }

        hfInstance.setSheetContent(0, filledData);
        forceUpdate();

    }, []);

    return (<div className={classes.root}>

        <div className={classes.fixedToolbar}>
            <SpreadSheetToolbar
                fileName={fileName}
                setFileName={setFileName}
            />
        </div>


        <div className={classes.mainContent}>
            <SpreadSheetTable/>
        </div>
    </div>);
};

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.background.default,
        color: theme.palette.text.primary
    },
    fixedToolbar: {
        position: 'fixed',
        top: 0,
        width: '100%',
        height: 147,
        overflow: 'hidden',
        zIndex: 100,
        backgroundColor: 'white'
    },
    mainContent: {
        marginTop: 147
    },
}));


export default SpreadSheet;
