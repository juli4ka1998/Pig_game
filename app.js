/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevDice;

init();
document.querySelector('.btn-roll').addEventListener('click', function () {
	if (gamePlaying) {
		//1. Random number
		var dice = Math.floor(Math.random() * 6) + 1;
		var dice_1 = Math.floor(Math.random() * 6) + 1;
		//2. Display the result
		var diceDOM = document.getElementById('dice-0');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';
		var diceDOM_1 = document.getElementById('dice-1');
		diceDOM_1.style.display = 'block';
		diceDOM_1.src = 'dice-' + dice_1 + '.png';
		//3. Update the round score IF the rolled number was NOT a 1
		if (dice !== 1 && dice_1 !== 1) {
			//Add score
			//roundScore += dice;
			roundScore += dice + dice_1;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			// if (dice === prevDice && dice === 6) {
			// 	scores[activePlayer] = 0;
			// 	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			// 	nextPlayer();
			// }else {
			// 	prevDice = dice;
			// }
		}else {
			//Next player
			nextPlayer();
		}

	}
	});

document.querySelector('.btn-hold').addEventListener('click', function () {
	if (gamePlaying) {
		//Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;

		//Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//Check if player won the game
		var input = document.querySelector('.winning-score').value;
		var winningScore;
		if (input) {
			winningScore = input;
		}else {
			winningScore = 100;
		}
		if(scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.getElementById('dice-0').style.display = 'none';
			document.getElementById('dice-1').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		}else {
			//Next player
			nextPlayer();
		}
	}
});

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	prevDice = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.getElementById('dice-0').style.display = 'none';
	document.getElementById('dice-1').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	prevDice = 0;
	document.getElementById('dice-0').style.display = 'none';
	document.getElementById('dice-1').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}










