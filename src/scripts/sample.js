const numOfColumns = 3;
const numOfRows = 3;

const buildGrid = () => {
    return new Array(numOfColumns)
        .fill(null)
        .map(() =>
            new Array(numOfRows)
                .fill(null)
                .map(() => Math.floor(Math.random() * 2))
        );
};

let grid = buildGrid();
console.table(grid);

const nextGen = (grid) => {
    const nextGen = grid.map((arr) => [...arr]);

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            let numNeighbours = 0;
            for (let i = -1; i < 2; i++) {
                for (j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    const x_cell = col + i;
                    const y_cell = col + j;
                    if (
                        x_cell >= 0 &&
                        y_cell >= 0 &&
                        x_cell < numOfColumns &&
                        y_cell < numOfRows
                    ) {
                        const currentNeighbour = grid[col + i][row + j];
                        numNeighbours += currentNeighbour;
                    }
                }
            }

            if (cell === 1 && numNeighbours < 2) {
                nextGen[col][row] = 0;
            } else if (cell === 1 && numNeighbours > 3) {
                nextGen[col][row] = 0;
            } else if (cell === 0 && numNeighbours === 3) {
                nextGen[col][row] = 1;
            }
        }
    }
    return nextGen;
};

const updateGrid = () => {
    grid = nextGen(grid);
    console.table(grid);
};

// setInterval(() => {
//     updateGrid();
// }, 2000);
