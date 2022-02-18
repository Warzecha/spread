import React, {useEffect, useState} from 'react';
import SpreadSheetView from './SpreadSheetView';

const SpreadSheetContainer = () => {

    const [fileName, setFileName] = useState('File name');

    const [rowCount, setRowCount] = useState(20);
    const [colCount, setColCount] = useState(10);

    const [data, setData] = useState([]);

    useEffect(() => {
        const tableData = [];

        for (let i = 0; i < rowCount; i++) {
            const row = [];
            for (let j = 0; j < colCount; j++) {
                row.push(j);
            }
            tableData.push(row);
        }

        setData(tableData);

    }, []);

    return (
        <SpreadSheetView fileName={fileName}
                         setFileName={setFileName}
                         data={data}
                         rowCount={rowCount}
                         colCount={colCount}

        />
    );
};

export default SpreadSheetContainer;
