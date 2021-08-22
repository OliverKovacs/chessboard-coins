// Oliver Kovacs MIT

function decodeBinary(tiles) {
    const length = Math.log2(tiles.length);
    return Array
        .from({ length })
        .map((_, i) => {
            return tiles.reduce((out, bit, j) => {
                const mask = Math.floor(j / 2 ** i) % 2;
                return out ^ (bit & !mask);
            }, 0);
        });
}

function decodePosition(tiles) {
    return decodeBinary(tiles)
        .reduce((sum, bit, i) => sum + bit * 2 ** i, 0);
}

function encodePosition(tiles, position) {
    const length = Math.log2(tiles.length);
    const bits = Array
        .from({ length })
        .map((_, i) => {
            const value = 2 ** (length - i - 1);
            return position >= value &&
                !!(position -= value) | 1;
        })
        .reverse();
    const curr = decodeBinary(tiles);
    const diff = bits.map((bit, i) => bit ^ curr[i]);
    const index = tiles.length - 1 - diff
        .reduce((sum, bit, i) => sum + bit * 2 ** i, 0);
    return tiles.map((tile, i) => tile ^ i === index);
}

module.exports = { decodePosition, encodePosition };
