import React from 'react';
import DropDownMenu from './DropDownMenu';
import {makeStyles, styled} from '@mui/styles';
import {Divider, InputBase, TextField} from '@mui/material';
import SpreadSheetTable from './SpreadSheet/SpreadSheetTable';

const SpreadSheetView = (props) => {
    const {
        fileName,
        setFileName,
        data,
        setData,
        rowCount,
        colCount
    } = props;

    const classes = useStyles();

    return (<div>

        <div className={classes.fileNameContainer}>
            {/*<FileNameTextField value={fileName}*/}
            {/*                   onChange={e => setFileName(e.target.value)}*/}
            {/*                   variant="outlined"*/}
            {/*                   size={'small'}*/}

            {/*/>*/}

            <InputBase
                // sx={{ml: 1, flex: 1}}
                className={classes.fileNameInput}
                placeholder="New file name"
                size={'small'}
                value={fileName}
                onChange={e => setFileName(e.target.value)}

                // inputProps={{ 'aria-label': 'search google maps' }}
            />
        </div>

        <div className={classes.menuHeader}>
            <DropDownMenu label={'File'}
                          options={[{
                              label: 'New', handler: () => alert('Create file!')
                          }, {
                              label: 'Open', handler: () => alert('Open file!')
                          }, {
                              label: 'Save', handler: () => alert('Save!')
                          }]}
            />

            <DropDownMenu label={'Edit'}
                          options={[{
                              label: 'Undo', handler: () => alert('Undo!')
                          }, {
                              label: 'Redo', handler: () => alert('Redo!')
                          }, {
                              label: 'Copy', handler: () => alert('Copy!')
                          }]}
            />

            <DropDownMenu label={'View'}
                          options={[{
                              label: 'Freeze rows/columns', handler: () => alert('Freeze!')
                          }, {
                              label: 'Hide', handler: () => alert('Hide!')
                          }, {
                              label: 'Group', handler: () => alert('Group!')
                          }]}
            />

        </div>

        <Divider/>


        <div>


            {data && <SpreadSheetTable
                rowCount={rowCount}
                colCount={colCount}
                data={data}
                setData={setData}

            />}
        </div>

    </div>);
};

const useStyles = makeStyles({
    fileNameContainer: {
        display: 'flex',
        padding: 8,
    },
    fileNameInput: {
        border: '1px solid transparent',
        borderRadius: 4,
        '&:hover': {
            borderColor: '#aaa',
        },
        '&.Mui-focused': {
            borderColor: '#4371ff',
        },
    },
    menuHeader: {
        display: 'flex', padding: 8,
    },
});

export default SpreadSheetView;
