
const enemyWater = document.getElementById("enemyWater");
const playerWater = document.getElementById("playerWater");
const output = document.getElementById("output");
const command = document.getElementById("command");
const mapSize = 8;
const shipToPlaceNumber = 8;

const shipChar = 'o';
const hiddenEnemyShipChar = 'H';
const destroyedShipChar = 'X';
const waterMiss = '~';

var enemyArray = Array.from(Array(mapSize), () => new Array(mapSize));
var playerArray = Array.from(Array(mapSize), () => new Array(mapSize));

var queue = -8;
var isPlayerTurn = true;

CreateTable(enemyWater, enemyArray);
CreateTable(playerWater, playerArray);

command.innerHTML = "Placing enemy ships";
while(queue < 0){
    GameMenager(getRndInteger(0, mapSize), getRndInteger(0, mapSize));
}
command.innerHTML = "Click on your water to place ships";

function CreateTable(tableParent, array){
    const table = document.createElement('table');
    tableParent.appendChild(table);

    for (let i = 0; i < mapSize; i++) {
        const tr = document.createElement('tr');
        table.appendChild(tr);
        for (let j = 0; j < mapSize; j++) {
            const td = document.createElement('td');
            tr.appendChild(td);

            var btn = document.createElement('button');
            td.appendChild(btn);

            btn.addEventListener("click", function(){
                if (array === playerArray) {
                    OnPlayerWaterClick(i, j)
                } else {
                    OnEnemyWaterClick(i, j)
                }
            });
            array[i][j] = btn;
        }
    }
}

function GameMenager(i, j){
    switch (queue) {
        case -8:
        case -7:
            PlaceShipEnemy(i, j, "4ver");
            break;
        case -6:
        case -5:
            PlaceShipEnemy(i, j, "3hor");
            break;
        case -4:
            PlaceShipEnemy(i, j, "2ver");
            break;
        case -3:
            PlaceShipEnemy(i, j, "2hor");
            break;
        case -2:
        case -1:
            PlaceShipEnemy(i, j, "1");
            break;
        case 0:
        case 1:
            TryPlaceShip(i, j, "4ver");
            break;
        case 2:
        case 3:
            TryPlaceShip(i, j, "3hor");
            break;
        case 4:
            TryPlaceShip(i, j, "2ver");
            break;
        case 5:
            TryPlaceShip(i, j, "2hor");
            break;
        case 6:
        case 7:
            TryPlaceShip(i, j, "1");
            break;
    }
}

function OnEnemyWaterClick(i, j){
    if(queue >= shipToPlaceNumber && isPlayerTurn){
        Shoot(i, j, true);
        EnemyShoot();
    }
}
function OnPlayerWaterClick(i, j){
    if(queue >= 0)
        GameMenager(i, j);
}

function EnemyShoot() {
    Shoot(getRndInteger(0, mapSize), getRndInteger(0, mapSize));
}

function Shoot(i, j, isEnemyTarget) {

    if(isEnemyTarget) {
        if(enemyArray[i][j].innerHTML == "")
            enemyArray[i][j].innerHTML = waterMiss;
        else if(enemyArray[i][j].innerHTML == hiddenEnemyShipChar)
            enemyArray[i][j].innerHTML = destroyedShipChar;
    }
    else {
        if(playerArray[i][j].innerHTML == waterMiss || playerArray[i][j].innerHTML == destroyedShipChar){
           EnemyShoot();
           return;
        }
        if(playerArray[i][j].innerHTML == "")
            playerArray[i][j].innerHTML = waterMiss;
        else if(playerArray[i][j].innerHTML == shipChar)
            playerArray[i][j].innerHTML = destroyedShipChar;
    }

    TryEndGame();
    isPlayerTurn = !isPlayerTurn;
}

function TryEndGame(){
    if(isPlayerTurn){
        if(!SearchForAliveShips(enemyArray)){
            alert("Game over: Victory!")
        }
    }
    else{
        if(!SearchForAliveShips(playerArray)){
            alert("Game over: Defeat!")
        }
    }
}

function SearchForAliveShips(array){
    for (let i = 0; i < mapSize; i++) {
        for (let j = 0; j < mapSize; j++) {
            if(array[i][j].innerHTML == shipChar || array[i][j].innerHTML == hiddenEnemyShipChar)
                return true;
        }
    }

    return false;
}

function TryPlaceShip(i, j, type){
    switch (type) {
        case "4ver":
            if(i >= 3)
                PlaceShip(i, j, type);
            break;
        case "3hor":
            if(j >= 2)
                PlaceShip(i, j, type);
            break;
        case "2ver":
            if(i >= 1)
                PlaceShip(i, j, type);
            break;
        case "2hor":
            if(j >= 1)
                PlaceShip(i, j, type);
            break;
        case "1":
            PlaceShip(i, j, type);
            break;
    
    }
}

function PlaceShip(i, j, type){
    switch (type) {
        case "4ver":
            var temp = "";
            temp += playerArray[i][j].innerHTML;
            temp += playerArray[i-1][j].innerHTML;
            temp += playerArray[i-2][j].innerHTML;
            temp += playerArray[i-3][j].innerHTML;
            if(temp != "")
                return;

            playerArray[i][j].innerHTML = shipChar;
            playerArray[i-1][j].innerHTML = shipChar;
            playerArray[i-2][j].innerHTML = shipChar;
            playerArray[i-3][j].innerHTML = shipChar;
            output.innerHTML = "successfully placed 4 wide ship";
            break;
        case "3hor":
            var temp = "";
            temp += playerArray[i][j].innerHTML;
            temp += playerArray[i][j-1].innerHTML;
            temp += playerArray[i][j-2].innerHTML;
            if(temp != "")
                return;

            playerArray[i][j].innerHTML = shipChar;
            playerArray[i][j-1].innerHTML = shipChar;
            playerArray[i][j-2].innerHTML = shipChar;
            output.innerHTML = "successfully placed 3 wide ship";
            break;
        case "2ver":
            var temp = "";
            temp += playerArray[i][j].innerHTML;
            temp += playerArray[i-1][j].innerHTML;
            if(temp != "")
                return;

            playerArray[i][j].innerHTML = shipChar;
            playerArray[i-1][j].innerHTML = shipChar;
            output.innerHTML = "successfully placed 2 wide ship";
            break;
        case "2hor":
            var temp = "";
            temp += playerArray[i][j].innerHTML;
            temp += playerArray[i][j-1].innerHTML;
            if(temp != "")
                return;

            playerArray[i][j].innerHTML = shipChar;
            playerArray[i][j-1].innerHTML = shipChar;
            output.innerHTML = "successfully placed 2 wide ship";
            break;
        case "1":
            var temp = "";
            temp += playerArray[i][j].innerHTML;
            if(temp != "")
                return;

            playerArray[i][j].innerHTML = shipChar;
            output.innerHTML = "successfully placed 1 wide ship";
            break;

    }

    if(++queue >= shipToPlaceNumber){
        command.innerHTML = "Now shoot the Enemy!";
        output.innerHTML = "";
    }
}

function PlaceShipEnemy(i, j, type){
    switch (type) {
        case "4ver":
            if(i < 3)
                return;
            var temp = "";
            temp += enemyArray[i][j].innerHTML;
            temp += enemyArray[i-1][j].innerHTML;
            temp += enemyArray[i-2][j].innerHTML;
            temp += enemyArray[i-3][j].innerHTML;
            if(temp != "")
                return;

            enemyArray[i][j].innerHTML = hiddenEnemyShipChar;
            enemyArray[i-1][j].innerHTML = hiddenEnemyShipChar;
            enemyArray[i-2][j].innerHTML = hiddenEnemyShipChar;
            enemyArray[i-3][j].innerHTML = hiddenEnemyShipChar;
            break;
        case "3hor":
            if(j < 2)
                return
            var temp = "";
            temp += enemyArray[i][j].innerHTML;
            temp += enemyArray[i][j-1].innerHTML;
            temp += enemyArray[i][j-2].innerHTML;
            if(temp != "")
                return;

            enemyArray[i][j].innerHTML = hiddenEnemyShipChar;
            enemyArray[i][j-1].innerHTML = hiddenEnemyShipChar;
            enemyArray[i][j-2].innerHTML = hiddenEnemyShipChar;
            break;
        case "2ver":
            if(i < 1)
                return

            var temp = "";
            temp += enemyArray[i][j].innerHTML;
            temp += enemyArray[i-1][j].innerHTML;
            if(temp != "")
                return;

            enemyArray[i][j].innerHTML = hiddenEnemyShipChar;
            enemyArray[i-1][j].innerHTML = hiddenEnemyShipChar;
            break;
        case "2hor":
            if(j < 1)
                return;

            var temp = "";
            temp += enemyArray[i][j].innerHTML;
            temp += enemyArray[i][j-1].innerHTML;
            if(temp != "")
                return;

            enemyArray[i][j].innerHTML = hiddenEnemyShipChar;
            enemyArray[i][j-1].innerHTML = hiddenEnemyShipChar;
            break;
        case "1":
            var temp = "";
            temp += enemyArray[i][j].innerHTML;
            if(temp != "")
                return;

            enemyArray[i][j].innerHTML = hiddenEnemyShipChar;
            break;
    }

    queue++;
    //place next ship
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}