`use strict`

const gameOver =
` 
/$$$$$$                                           /$$$$$$                               
/$$__  $$                                         /$$__  $$                              
| $$  \__/  /$$$$$$  /$$$$$$/$$$$   /$$$$$$       | $$  \ $$ /$$    /$$ /$$$$$$   /$$$$$$ 
| $$ /$$$$ |____  $$| $$_  $$_  $$ /$$__  $$      | $$  | $$|  $$  /$$//$$__  $$ /$$__  $$
| $$|_  $$  /$$$$$$$| $$ \ $$ \ $$| $$$$$$$$      | $$  | $$ \  $$/$$/| $$$$$$$$| $$  \__/
| $$  \ $$ /$$__  $$| $$ | $$ | $$| $$_____/      | $$  | $$  \  $$$/ | $$_____/| $$      
|  $$$$$$/|  $$$$$$$| $$ | $$ | $$|  $$$$$$$      |  $$$$$$/   \  $/  |  $$$$$$$| $$      
\______/  \_______/|__/ |__/ |__/ \_______/       \______/     \_/    \_______/|__/      
                                                                                                                                                                                
`

const gameName =
` 
/$$$$$$$              /$$     /$$     /$$                     /$$       /$$          
| $$__  $$            | $$    | $$    | $$                    | $$      |__/          
| $$  \ $$  /$$$$$$  /$$$$$$ /$$$$$$  | $$  /$$$$$$   /$$$$$$$| $$$$$$$  /$$  /$$$$$$ 
| $$$$$$$  |____  $$|_  $$_/|_  $$_/  | $$ /$$__  $$ /$$_____/| $$__  $$| $$ /$$__  $$
| $$__  $$  /$$$$$$$  | $$    | $$    | $$| $$$$$$$$|  $$$$$$ | $$  \ $$| $$| $$  \ $$
| $$  \ $$ /$$__  $$  | $$ /$$| $$ /$$| $$| $$_____/ \____  $$| $$  | $$| $$| $$  | $$
| $$$$$$$/|  $$$$$$$  |  $$$$/|  $$$$/| $$|  $$$$$$$ /$$$$$$$/| $$  | $$| $$| $$$$$$$/
|_______/  \_______/   \___/   \___/  |__/ \_______/|_______/ |__/  |__/|__/| $$____/ 
                                                                            | $$      
                                                                            | $$      
                                                                            |__/ `

// create the board
const board = []
const createBoard = (board, size)=>{
    let row ='[O] '.repeat(size)
    for( let i= 0; i< size; i++){
        board.push(row)
        console.log(board.join('\n'))}
}

// Select Random row
const randomPosition =()=>{
    let randomRow = Math.floor(Math.random() * 5) + 1
    let randomColumn = Math.floor(Math.random() * 5) + 1
    console.log(randomRow, randomColumn )
    return [randomRow, randomColumn]
}

//  Message to display when player wins / loses a turn
const progressMessageAndScore =(row, column, randomRow, randomColumn, score)=>{
    if( randomRow=== row && randomColumn=== column){
        console.log('hey you have gained one')
        score = score + (row * column)
       return score
    }  
    if( randomRow !== row || randomColumn !== column){
        console.log(row, typeof column)
        console.log('hey you have lost one')
        score = score - (row * column)
       return score
    }
    if( row > 5 || row < 0 || column > 5 || column < 0){
        console.log('hey you sank dear')
        score = score - (row * column)
       return score
    }   
}

// Get input from players
const readline = require('readline');

const AskPosition = (rl, question) => {
    return new Promise(resolve => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

const Ask = function(questions) {
   
    return new Promise(async( resolve, reject) => {
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        let results = [];
        for(let i=0;i < questions.length;i++) {
            const result = await AskPosition(rl, questions[i]);
            results.push(result);
        }
        rl.close();
        if(results){
        resolve(results)
        }
        else {
            reject(results)
        }
       
    })
}


const markSelectedPosition =(board, row, column)=>{
    let newRow = board[+row -1].split(" ")
    if(newRow[+column-1] ==='[X]'){
        console.log('you have already chosen this previously', board.join('\n'))
        return
    }
    newRow[+column-1] ='[X]'
    newRow = newRow.join(' ')
    board.splice(+row-1, 1, newRow)
    console.log(board.join('\n'))
}

const questions= [
    'What is the row of the ship? ',
    'What is column of the ship? '
 ]


const playGame=async()=>{
    let turns=3;
    let score= 0
    console.log(gameName)
    createBoard(board, 5)
    
    for( turns > 0; turns--;){
        const [randomRow, randomColumn]=randomPosition()
        const [row, column] = await Ask(questions)
        let newScore = progressMessageAndScore(+row, +column, randomRow, randomColumn, score)
        score = score + newScore
        markSelectedPosition(board, +row, +column)
    }
    if(turns <0 && score > 0){
        console.log(`congratulations you scored ${score} ` )
    }
    else{
        console.log(`you scored ${score}, gameOver, you lost ` )
    }
    }
    
    playGame()


    // Calculate the score
    // Mkae the code more elegant and meaningful
    // Make it a two player game
