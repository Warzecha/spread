import App from '../../App';
import {getColumnLabel, getReferencedCells} from './utils';


test('Return correct column label for index 0', () => {
    expect(getColumnLabel(0)).toBe('A');
});

test('Return correct column label for index 3', () => {
    expect(getColumnLabel(3)).toBe('D');
});

test('Return correct column label for index 26', () => {
    expect(getColumnLabel(26)).toBe('AA');
});

test('Return correct column label for index 29', () => {
    expect(getColumnLabel(29)).toBe('AD');
});

test('getReferencedCells returns correct cell ranges', () => {
    const referencedCells = getReferencedCells('=10+SUM(A1:B10)*2');
    console.log('referencedCells', referencedCells);
    expect(referencedCells.length).toBe(1);
});



