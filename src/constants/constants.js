export const GRID = {
	NUM_ROWS: 25,
	NUM_COLS: 50,

	setDimension: (rows, cols) => {
		GRID.NUM_ROWS = Math.ceil(rows / 25) - 12;
		GRID.NUM_COLS = Math.ceil(cols / 25) - 10;
	},
};
