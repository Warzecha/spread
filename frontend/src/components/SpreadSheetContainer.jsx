import React, {useEffect, useState} from 'react';
import SpreadSheetView from './SpreadSheetView';
import {useDispatch} from 'react-redux';
import {setDataAction} from '../store/spreadsheetReducer';

const SpreadSheetContainer = () => {

    const [fileName, setFileName] = useState('File name');

    const [rowCount, setRowCount] = useState(20);
    const [colCount, setColCount] = useState(30);

    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const tableData = [];

        for (let i = 0; i < rowCount; i++) {
            const row = [];
            for (let j = 0; j < colCount; j++) {
                row.push({
                    value: j
                });
            }
            tableData.push(row);
        }

        setData(tableData);
        dispatch(setDataAction(tableData));



    }, []);

    return (
        <SpreadSheetView fileName={fileName}
                         setFileName={setFileName}
                         setData={setData}
                         rowCount={rowCount}
                         colCount={colCount}

        />
    );
};

export default SpreadSheetContainer;
