import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@mui/material';

const DropDownMenu = ({label: buttonLabel, options = []}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button onClick={handleOpen} size={'small'}>
                {buttonLabel}
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuList>
                    {options.map(({label, handler, shortcut}, index) => {
                            return (
                                <MenuItem onClick={handler} key={`${buttonLabel}-${index}`} dense>
                                    {/*<ListItemIcon>*/}
                                    {/*    <ContentCut fontSize="small"/>*/}
                                    {/*</ListItemIcon>*/}
                                    <ListItemText>{label}</ListItemText>
                                    {shortcut && <Typography variant="body2" color="text.secondary">{shortcut}</Typography>}
                                </MenuItem>);
                        }
                    )}
                </MenuList>
            </Menu>
        </div>

    );
};

DropDownMenu.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        handler: PropTypes.func.isRequired,
        shortcut: PropTypes.string,
        icon: PropTypes.any,
    }))
};

export default DropDownMenu;
