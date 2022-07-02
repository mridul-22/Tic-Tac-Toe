const cell = document.querySelectorAll(".cell");
const statusText= document.querySelector("#statusText");
const restartBtn=document.querySelector("#restartBtn");
const winConditons=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options=["","","","","","","","",""];
let currentPlayer="X";
let running=false;
initializeGame();
function initializeGame(){
    cell.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent=`${currentPlayer}'s turn`;
    running=true;
}
function cellClicked(){
    const cellIndex= this.getAttribute("cellIndex");
    if(options[cellIndex] != ""|| ! running){
        return;
    }
    updatecell(this, cellIndex);
    checkWinner();
}
function updatecell(cell, index){
    options[index]= currentPlayer;
    cell.textContent= currentPlayer;
}
function changePlayer(){
    currentPlayer=(currentPlayer == "X")? "O":"X";
    statusText.textContent=`${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon= false;
    for(let i = 0; i< winConditons.length; i++){
        const Condition= winConditons[i];
        const cellA= options[Condition[0]];
        const cellB= options[Condition[1]];
        const cellC= options[Condition[2]];
        if(cellA =="" || cellB =="" || cellC ==""){
            continue;
        }
        if(cellA == cellB && cellB ==   cellC){
            roundWon= true;
            break;
        }      
    }
    if(roundWon){
        statusText.textContent=`${currentPlayer} win !`;
        running= false;
    }
    else if(!options.includes("")){
        statusText.textContent=`Draw !`;
        running= false;
    }
    else{
        changePlayer();
    }
}
function restartGame()
{
    currentPlayer= "X";
    options=["","","","","","","","",""];
    statusText.textContent=`${currentPlayer}'s turn`;
    cell.forEach(cell=> cell.textContent = "");
    running= true;
}