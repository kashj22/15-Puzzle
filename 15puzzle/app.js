
let table;//this is the table that will be displayed on the screen
let boardArray;//this is the array that will hold the numbers for the puzzle in random order
let rows = 4;//we have 4 rows
let columns = 4;//and 4 colums, making a 4 x 4 grid of numbers

let start = () => {
    let button = document.getElementById("newGame");
    button.addEventListener("click", startNewGame, false);
    table = document.getElementById("table");
    startNewGame();
}

let startNewGame = () => {

    let arrayOfNumbers = [];//this will hold the numbers whose order has been randomized 
    let hasNumberBeenUsed;
    let randomNumber = 0;
    let count = 0;
    

    //create 2D array that will form the rows
    boardArray = new Array(rows);
    for(let i = 0; i < rows; i++) {
        //for each row, or element in the outer array, create a new array that will hold the values 
        //of each column
        boardArray[i] = new Array(columns);
    }

    //temporary array for allocating unique numbers. Each value in the array starts at 0
    hasNumberBeenUsed = new Array(16);
    for(let i = 0; i < 16; i++) {
        hasNumberBeenUsed[i] = 0;
    }

    //assign random numbers to the board
    for(let i = 0; i < 16; i++) {
        //create a random number from 1 - 15
        randomNumber = Math.floor(Math.random() * 16);
        //if the random number hasn't been pushed into the array because the value is 0
        if(hasNumberBeenUsed[randomNumber] == 0) {
            //change the value from 0 to 1 to say it has now been added
            hasNumberBeenUsed[randomNumber] = 1;
            //and add this number the array for the game
            arrayOfNumbers.push(randomNumber);
        }else {
            //otherwise go back and try again
            i--;
        }
    }

    //assign the numbers to the game board
    //nested for loop as we are dealing with 2 arrays. The 2D outer array which holds rows, and the 
    //1D arrays inside making up each element which holds the columns
    count = 0;
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {
            //for each position in the puzzle, push the numbers from arrayOfNumbers as their order
            //has been randomized
            boardArray[i][j] = arrayOfNumbers[count];
            count++;
        }

    }
    console.log(boardArray);
    showTable();
}
//we pass in boardArray which has all of the random numbers into showTable so that the table can 
//display this array as a puzzle
let showTable = () => {
    let theTable = "";
    //first for loop will go through each element in the outer array which is a table row
    for(let i = 0; i < boardArray.length; i++) {
        //and add a table row tag
        theTable += `<tr>`;
        //and then for each array inside the outer array which represents the columns
        for(let j = 0; j < boardArray[i].length; j++) {
            //this tile is 0 it means it's the blank tile
            if(boardArray[i][j] == 0) {
                //so add this tile to the board with class = blank
                theTable += `<td class="blank">${boardArray[i][j]}</td>`;
            } else {
                //otherwise the tile has a value, so add it to the board with class = tile and 
                //and add an onclick function so we can move this tile
                theTable += `<td class="tile" onclick="moveTileFunction">${boardArray[i][j]}</td>`;
            }                
        }
        //at the end of each row we will close with the table row tag
        theTable += `</tr>`;
    }
    // return table;
    table.innerHTML = theTable;
}



//This is where the function moveTileFunction() should go which will move the tile once it's clicked. 
//The function would have to check if the tile is next to the blank tile so it can be moved there. 
//Otherwise the tile wouldn't be able to move.

//I ran out of time and this was the part I was having most difficulty on. 




let checkWinner = () => {
    //count starts at 1 as the 1st tile should be 1
    let count = 1;
    //start by going through the rows
    for(let i = 0; i < boardArray.length; i++) {
        //and then go through each column in each row
        for(let j = 0; j < boardArray[i].length; j++) {
            //if the first tile is equal to the count
            if(boardArray[i][j] === count) {
                //increase the count by 1 and keep going through to check
                count++;
                //and if the count is 16 which is the number of tiles in the game, and the tile
                //at this position is 0, then the numbers should be in order from 1-15
                if(count === rows * columns && boardArray[i][j] === 0) {
                    alert("Congratulations, you have won");
                    return true;
                    
                //otherwise the numbers aren't in order
                }else {return false;}
            // this is false if the specific tile isn't the same as the count
            }else {return false;}
        }
    }
}

//when the window loads, execute the start function to begin the game
window.addEventListener("load", start, false);



















