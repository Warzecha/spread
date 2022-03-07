import React, {useEffect, useReducer, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setDataAction} from '../store/spreadsheetReducer';
import {makeStyles} from '@mui/styles';
import SpreadSheetTable from './SpreadSheet/SpreadSheetTable';
import SpreadSheetToolbar from './SpreadSheet/SpreadSheetToolbar';
import {hfInstance} from './SpreadSheet/hf';

const SpreadSheet = () => {
    const [fileName, setFileName] = useState('File name');

    const dispatch = useDispatch();

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const classes = useStyles();

    useEffect(() => {
        const tableData = [];

        for (let i = 0; i < 30; i++) {
            const row = [];
            for (let j = 0; j < 15; j++) {
                row.push('');
            }
            tableData.push(row);
        }

        hfInstance.setSheetContent(0, tableData);
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
