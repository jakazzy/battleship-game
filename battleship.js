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

const gameEnd =`

/$$$$$$$$                 /$$                  /$$$$$$         /$$$$$$                                   
| $$_____/                | $$                 /$$__  $$       /$$__  $$                                  
| $$       /$$$$$$$   /$$$$$$$        /$$$$$$ | $$  \__/      | $$  \__/  /$$$$$$  /$$$$$$/$$$$   /$$$$$$ 
| $$$$$   | $$__  $$ /$$__  $$       /$$__  $$| $$$$          | $$ /$$$$ |____  $$| $$_  $$_  $$ /$$__  $$
| $$__/   | $$  \ $$| $$  | $$      | $$  \ $$| $$_/          | $$|_  $$  /$$$$$$$| $$ \ $$ \ $$| $$$$$$$$
| $$      | $$  | $$| $$  | $$      | $$  | $$| $$            | $$  \ $$ /$$__  $$| $$ | $$ | $$| $$_____/
| $$$$$$$$| $$  | $$|  $$$$$$$      |  $$$$$$/| $$            |  $$$$$$/|  $$$$$$$| $$ | $$ | $$|  $$$$$$$
|________/|__/  |__/ \_______/       \______/ |__/             \______/  \_______/|__/ |__/ |__/ \_______/
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
    for( let i= 0; i< size; i++)
        board.push(row)
    console.log(board.join('\n'))
}

// Select Random row
const randomPosition =(size)=>{
    let randomRow = Math.floor(Math.random() * size) + 1
    let randomColumn = Math.floor(Math.random() * size) + 1
    console.log(randomRow, randomColumn)
    return [randomRow, randomColumn]
}

//  Message to display when player wins / loses a turn
const progressMessageAndScore =(row, column, randomRow, randomColumn, playerOneScore, playerTwoScore, turns)=>{
    if( randomRow=== row && randomColumn=== column){
        playerOneScore = turns % 2 ===0 ? playerOneScore + (row * column) : playerOneScore
        playerTwoScore = turns % 2 ===1 ? playerTwoScore + (row * column) : playerTwoScore
       return [playerOneScore, playerTwoScore]
    }  
    if( randomRow !== row || randomColumn !== column){
        console.log('hey you have lost one')
        score = score - (row * column)
        playerOneScore = turns % 2 ===0 ? playerOneScore - (row * column) : playerOneScore
        playerTwoScore = turns % 2 ===1 ? playerTwoScore - (row * column) : playerTwoScore
       return [playerOneScore, playerTwoScore]
    }
    if( row > 5 || row < 0 || column > 5 || column < 0){
        console.log('hey you sank dear')
        score = score - (row * column)
        playerOneScore = turns % 2 ===0 ? playerOneScore - (row * column) : playerOneScore
        playerTwoScore = turns % 2 ===1 ? playerTwoScore - (row * column) : playerTwoScore
       return [playerOneScore, playerTwoScore]
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
    const fgRed ="\x1b[33m"
    const fgBlue= "\x1b[34m"
    let playerOneScore= 0
    let playerTwoScore = 0

    console.log(fgBlue,gameName)
    createBoard(board, 5)
    
    for(let turns=6; turns > 0; turns--){
        const [randomRow, randomColumn]=randomPosition(5)
        const [row, column] = await Ask(questions)
        let [oneScore, twoScore] = progressMessageAndScore(+row, +column, randomRow, randomColumn, playerOneScore,playerTwoScore, turns)
        playerOneScore = turns % 2===0 ? playerOneScore + oneScore : playerOneScore
        playerTwoScore = turns % 2 === 1 ? playerTwoScore + twoScore : playerTwoScore
       
        markSelectedPosition(board, +row, +column)
    }
    
    if(playerOneScore > playerTwoScore){
        console.log('*'.repeat(100),'\n','\n', fgRed,`Congratulations Player One you are a real champ`,'\n','\n','*'.repeat(100))
    } else{
        console.log('*'.repeat(100),'\n','\n', fgRed,`Congratulations Player two that was amazing!!!`,'\n','\n','*'.repeat(100))
    }

    console.log(fgBlue,gameEnd)
    }
    
    playGame()


  