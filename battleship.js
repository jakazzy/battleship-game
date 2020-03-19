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
    for( let i= 0; i< size; i++)
    board.push(row)
    console.log(board.join('\n'))
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