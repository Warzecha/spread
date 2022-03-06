export const getColumnLabel = (index) => {
    const res = Math.floor(index / 26);
    const rem = index % 26;
    const char = String.fromCharCode(65 + rem);
    return res - 1 >= 0 ? getColumnLabel(res - 1) + char : char;
};

export const cellsEqual = (cell1, cell2) => {
    if (cell1 === null && cell2 === null) {
        return true;
    } else if (!cell1 || !cell2) {
        return false;
    } else {
        return cell1.row === cell2.row && cell1.col === cell2.col;
    }
};

export const selectCellData = (row, col) => state => {
    const {data} = state.spreadsheet;
    if (!data) {
        return null;
    }
    if (!data[row]) {
        return null;
    } else {
        return data[row][col];
    }
};

