

var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);


/////////////////////////działania przyciskow kamien papier nozyce po kliknieciu
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock'); });
pickPaper.addEventListener('click', function() { playerPick('paper'); });
pickScissors.addEventListener('click', function() { playerPick('scissors'); });


////////////////////////////////////////logika gry

var gameState = 'notStarted',   //started, ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

///////////////////////wyswietlanie elementów gry

var newGameElem = document.getElementById('js-newGameElement'),           //zmienne wskazujeace 
    pickElem = document.getElementById('js-playerPickElement'),           //na elementy gry,  a konkretnie 
    resultsElem = document.getElementById('js-resultsTableElement');      //jej poszczególne czesci
    winnerInfo = document.getElementById('js-winnerInfo');              

function setGameElements(gamestate) {
    switch(gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            winnerInfo.style.display = 'none';
            break;
        case 'ended':
        newGameBtn.innerText = 'Try Again';
        winnerInfo.style.display = 'block';
        pickElem.style.display = 'none';
        newGameElem.style.display = 'block';
            break;
        case 'notStarted':
        
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
            winnerInfo.style.display = 'none';
    }
}

setGameElements();

/////////////rozpoczecie gry 
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');


function newGame(){
    player.name = prompt('Please enter your name','imie gracza');
    if (player.name) {
        player.score = computer.score = 0;
              
        gameState = 'started';
        setGameElements();  

        playerNameElem.innerHTML = player.name;
        setGamePoints(); // This function has not been created yet
    }  

}

//funkcja odpowiedziala za to co gracz wybiera **************wybór gracza

/// losowanie wyboru komputera

function getComputerPick() {
    var possiblePicks = ['rock','paper','scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}







var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById ('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    console.log(playerPick);
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
  
    checkRoundWinner(playerPick, computerPick);
    setGameEnd();
   
}

//***********************************koniec gry dodatkowe funkcje */
//**************************************sprawdzanie wynikow rundy

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

      var winnerIs = 'player';

        if (playerPick == computerPick) {
            winnerIs = 'noone'; // remis
            playerResultElem.innerHTML = 'Draw!!!';
            computerResultElem.innerHTML = 'Draw!!!';
            winnerInfo.style.display = 'block';
            winnerInfo.innerHTML = 'DRAW!!! Play on '+ player.name + ' !!!' ;

        } else if (
            (computerPick == 'rock' && playerPick == 'scissors') ||
            (computerPick == 'scissors' &&  playerPick == 'paper') ||
            (computerPick == 'paper' &&  playerPick == 'rock')) {

                winnerIs = 'computer';
                winnerInfo.style.display = 'none';
                
        }
        if (winnerIs == 'player') {
            playerResultElem.innerHTML = 'Win!!!';
            player.score++;
            winnerInfo.style.display = 'none';
            setGamePoints();
        }else if (winnerIs == 'computer') {
            computerResultElem.innerHTML = 'Win!!!';
            computer.score++;
            winnerInfo.style.display = 'none';
            setGamePoints();
        }
            
    }

    


//*******************************************aktualizacja wyniku

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

//***************************************end game */

function setGameEnd(){

    var winningScore = 10;
    var winner;

    if (player.score == winningScore) {
        gameState ='ended';
        winner = player.name;
        console.log(gameState);
        winnerInfo.innerHTML = "The winner is: " + winner;
        setGameElements();
    } else if (computer.score == winningScore) {
        gameState = 'ended';
        winner = 'computer';
        console.log(gameState);
        winnerInfo.innerHTML = "The winner is: " + winner;
        setGameElements();
    }

}
