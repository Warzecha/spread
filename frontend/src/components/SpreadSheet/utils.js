import { extractLabel } from 'hot-formula-parser';

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

export const selectCellData = (state, row, col) => {
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

export const isFormulaString = (value) => {
    return typeof value === 'string' && value.startsWith('=')
}

export const computeCellValue = (formulaParser, cell) => {
    if (!cell || !cell.value) {
        return '';
    } else if(isFormulaString(cell.value)) {
        const formulaString = cell.value.slice(1);
        const { result, error } = formulaParser.parse(formulaString);
        return error || result;
    } else {
        return cell.value;
    }
}

const cellRangeRegex = /(\$?[A-Za-z]+\$?[0-9]+):(\$?[A-Za-z]+\$?[0-9]+)/g;
const singlecellRegex = /[^:](\$?[A-Za-z]+\$?[0-9]+)[^:]/g;

export const getReferencedCells = (formulaString) => {
    let references = [];

    const cellRangeMatch = formulaString.match(cellRangeRegex);

    console.log('match: ', cellRangeMatch);

    if (cellRangeMatch) {
        references.push(...cellRangeMatch.map((match) => {
            // const [row, column] = extractLabel(substr);
            // return { row: row.index, column: column.index };
            return {startCell, endCell}
        }))

    }

    return references;
}

