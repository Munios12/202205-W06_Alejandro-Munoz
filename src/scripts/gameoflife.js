class Cell {
    constructor(isAlive, coorX, coorY, neighbors) {
        this.isAlive = isAlive;
        this.coorX = coorX;
        this.coorY = coorY;
        this.neighbors = neighbors;
    }
}

const numColumns = 3;
const numRows = 3;
const arrayCells = [[], [], []];

let gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

const addCellsToArray = () => {
    for (let i = 0; i < numColumns; i++) {
        for (let j = 0; j < numRows; j++) {
            let state = i % 2 === 0 ? 0 : 1;
            arrayCells[i].push(new Cell(state, i, j));
        }
    }
};

const renderGeneration = (arrayCells, gameBoard) => {
    arrayCells.map((fila, numFila) => {
        fila.map((cel, numColum) => {
            if (cel.isAlive === 0) {
                gameBoard[numFila][numColum] = 0;
            } else {
                gameBoard[numFila][numColum] = 1;
            }
        });
    });
};

const calculateAliveNeighbors = () => {
    for (let i = 0; i < arrayCells.length; i++) {
        for (let j = 0; j < arrayCells.length; j++) {
            let currentCell = arrayCells[i][j];
            if (i === 0 && j === 0) {
                //Esquina sup izq
                currentCell.neighbors =
                    arrayCells[i + 1][j].isAlive +
                    arrayCells[i][j + 1].isAlive +
                    arrayCells[i + 1][j + 1].isAlive;
            } else if (i === 0 && j === arrayCells.length - 1) {
                // esquina sup derecha PROBLEMA DA 3

                currentCell.neighbors =
                    arrayCells[i + 1][j].isAlive +
                    arrayCells[i][j - 1].isAlive +
                    arrayCells[i + 1][j - 1].isAlive;
            } else if (i === arrayCells.length - 1 && j === 0) {
                //esquina abajo izq
                currentCell.neighbors =
                    arrayCells[i - 1][j].isAlive +
                    arrayCells[i][j + 1].isAlive +
                    arrayCells[i - 1][j + 1].isAlive;
            } else if (
                i === arrayCells.length - 1 &&
                j === arrayCells.length - 1
            ) {
                //esquina abajo derecha
                currentCell.neighbors =
                    arrayCells[i - 1][j].isAlive +
                    arrayCells[i - 1][j - 1].isAlive +
                    arrayCells[i][j - 1].isAlive;
            } else if (j === 0) {
                //Borde Izquierdo
                currentCell.neighbors =
                    arrayCells[i - 1][j].isAlive +
                    arrayCells[i - 1][j + 1].isAlive +
                    arrayCells[i][j + 1].isAlive +
                    arrayCells[i + 1][j + 1].isAlive +
                    arrayCells[i + 1][j].isAlive;
            } else if (j === arrayCells.length - 1) {
                //Borde derecho
                currentCell.neighbors =
                    arrayCells[i - 1][j].isAlive +
                    arrayCells[i - 1][j - 1].isAlive +
                    arrayCells[i][j - 1].isAlive +
                    arrayCells[i + 1][j - 1].isAlive +
                    arrayCells[i + 1][j].isAlive;
            } else if (i === 0) {
                //Borde superior
                currentCell.neighbors =
                    arrayCells[i][j - 1].isAlive +
                    arrayCells[i + 1][j - 1].isAlive +
                    arrayCells[i + 1][j].isAlive +
                    arrayCells[i + 1][j + 1].isAlive +
                    arrayCells[i][j + 1].isAlive;
            } else if (i === arrayCells.length - 1) {
                //Borde inferior
                currentCell.neighbors =
                    arrayCells[i][j - 1].isAlive +
                    arrayCells[i - 1][j - 1].isAlive +
                    arrayCells[i - 1][j].isAlive +
                    arrayCells[i - 1][j + 1].isAlive +
                    arrayCells[i][j + 1].isAlive;
            } else {
                //no es borde ni esquina
                currentCell.neighbors =
                    arrayCells[i - 1][j - 1].isAlive +
                    arrayCells[i - 1][j].isAlive +
                    arrayCells[i - 1][j + 1].isAlive +
                    arrayCells[i][j + 1].isAlive +
                    arrayCells[i + 1][j + 1].isAlive +
                    arrayCells[i + 1][j].isAlive +
                    arrayCells[i + 1][j - 1].isAlive +
                    arrayCells[i][j - 1].isAlive;
            }

            //Reglas del juego
            if (currentCell.isAlive === 0) {
                //Nace cuando tiene exactamente 3 celulas vivas.
                currentCell.neighbors === 3
                    ? (currentCell.isAlive = 1)
                    : (currentCell.isAlive = 0);
            } else {
                //Muere si tiene < 2 o > 3 celulas vivas a su alrededor.
                currentCell.neighbors < 2 || currentCell.neighbors > 3
                    ? (currentCell.isAlive = 0)
                    : (currentCell.isAlive = 1);
            }
        }
    }
};

const gameOfLife = () => {
    addCellsToArray();
    renderGeneration(arrayCells, gameBoard);
    console.table(gameBoard);

    // setInterval(() => {
    calculateAliveNeighbors();
    renderGeneration(arrayCells, gameBoard);
    console.table(gameBoard);
    // }, 2000);
};

gameOfLife();
