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

const calculateNeighbors = (gameBoard, numRows, numColum) => {
    // console.log(arrayCells[1][1]);

    for (let i = 0; i < arrayCells.length; i++) {
        console.log("---------------");
        for (let j = 0; j < arrayCells.length; j++) {
            let sum;
            let currentCell = arrayCells[i][j];
            let currentCell__coorX = currentCell.coorX;
            let currentCell__coorY = currentCell.coorY;

            if (
                currentCell__coorX - 1 < 0 ||
                currentCell__coorY - 1 < 0 ||
                currentCell__coorX + 1 >= numColumns ||
                currentCell__coorY + 1 >= numRows
            ) {
                console.log("estas en el borde");
            } else {
                sum = 8;
                console.log("centro");
            }
            console.log([arrayCells[i][j].coorX], [arrayCells[i][j].coorY]);
            console.log("Vecinos: ", sum);
        }
    }
};

const gameOfLife = () => {
    //Añaden celulas a la array
    addCellsToArray();
    console.table(gameBoard);
    //renderizar el estado de las celulas
    renderGeneration(arrayCells, gameBoard);

    console.log(arrayCells);
    console.table(gameBoard);

    //Crear una nueva generacion
    //Calcular Vecinos
    calculateNeighbors(gameBoard, numRows, numColumns);
    //Aplicar reglas de la vida
    // applyRules();

    // console.log(currentNeighbors);
    //  setInterval(() => {
    //     Evaluar todas las celulas

    //     let fila1 = celArray[0].map((cel) => {
    //         let newCel = evalAdjacentCells(cel, gameBoard);
    //         return newCel;
    //     });
    //     let fila2 = celArray[1].map((cel) => {
    //         let newCel = evalAdjacentCells(cel, gameBoard);
    //         return newCel;
    //     });
    //     let fila3 = celArray[2].map((cel) => {
    //         let newCel = evalAdjacentCells(cel, gameBoard);
    //         return newCel;
    //     });

    //     let newArr = [fila1, fila2, fila3];
    //     Representar nuevo tablero

    //     console.table(newArr);
    // }, 2000);
};

gameOfLife();
