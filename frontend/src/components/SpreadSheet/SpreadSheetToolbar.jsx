import React, {useCallback} from 'react';
import {Divider, IconButton, InputBase} from '@mui/material';
import DropDownMenu from '../DropDownMenu';
import {makeStyles} from '@mui/styles';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import {getColumnLabel} from './utils';
import {useDispatch, useSelector} from 'react-redux';
import {activeCellValueModified} from '../../store/spreadsheetReducer';

const SpreadSheetToolbar = (props) => {
    const {
        fileName,
        setFileName,
    } = props;

    const dispatch = useDispatch();

    const {
        activeCellAddress,
        activeCellValue,
    } = useSelector(state => state.spreadsheet);

    const classes = useStyles();

    const setActiveCellValue = useCallback((newValue) => {
        dispatch(activeCellValueModified(newValue));
    }, [dispatch]);

    return (
        <div>
            <div className={classes.fileNameContainer}>
                <InputBase
                    // sx={{ml: 1, flex: 1}}
                    className={classes.fileNameInput}
                    placeholder="New file name"
                    size={'small'}
                    value={fileName}
                    onChange={e => setFileName(e.target.value)}
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

            <div className={classes.toolsRibbon}>

                <IconButton size={'small'}>
                    <UndoIcon/>
                </IconButton>
                <IconButton size={'small'}>
                    <RedoIcon/>
                </IconButton>

            </div>

            <Divider/>


            <div className={classes.activeCellDetailsBar}>
                <span className={classes.activeCellAddress}>
                    {activeCellAddress ? `${getColumnLabel(activeCellAddress.col)}${activeCellAddress.row + 1}` : '-'}
                </span>

                <Divider orientation={'vertical'} flexItem/>

                <InputBase
                    value={activeCellValue}
                    onChange={e => setActiveCellValue(e.target.value)}
                    classes={{
                        root: classes.activeCellInput,
                    }}
                    autoFocus
                />

            </div>

            <Divider/>
        </div>
    );
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
    toolsRibbon: {
        display: 'flex', paddingLeft: 8, paddingRight: 8,
    },
    activeCellDetailsBar: {
        display: 'flex',
        alignItems: 'center'
    },
    activeCellAddress: {
        width: 48,
        textAlign: 'center',
        verticalAlign: 'center',
        fontSize: 16
    },
    activeCellInput: {
        marginLeft: 10
    },
});

export default SpreadSheetToolbar;
