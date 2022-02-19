export const getColumnLabel = (index) => {
    const res = Math.floor(index / 26);
    const rem = index % 26;
    const char = String.fromCharCode(65 + rem);
    return res -1 >= 0 ? getColumnLabel(res - 1) + char : char;
};
