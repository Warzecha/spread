import React from 'react';
import PropTypes from 'prop-types';

const Row = ({row, children}) => {
    return (
        <tr>

            <th>{row+1}</th>

            {children}
        </tr>
    );
};

Row.propTypes = {

};

export default Row;
