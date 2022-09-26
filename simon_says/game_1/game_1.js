let SIMON_SAYS = {};

// The Game layouts
SIMON_SAYS.config = [
	{ css: "twotwo", name: "2x2", length: 4 },
	{ css: "threethree", name: "3x3", length: 9 },
	{ css: "fourfour", name: "4x4", length: 16 },
	{ css: "fivefive", name: "5x5", length: 25},
	{ css: "sixsix", name: "6x6", length: 36},
	{ css: "sevenseven", name: "7x7", length:49},
	{ css: "eighteight", name: "8x8", length:64}
];

//global var
SIMON_SAYS.round_nbr = 0;
SIMON_SAYS.level_nbr = 0;
SIMON_SAYS.lifes_counter = 2;
SIMON_SAYS.score = 0;

SIMON_SAYS.cmp_order = [];
SIMON_SAYS.user_choice = [];
SIMON_SAYS.keys = ["twotwo", "threethree", "fourfour", "fivefive", "sixsix", "sevenseven", "eighteight"];

SIMON_SAYS.selectedGame = undefined;
SIMON_SAYS.container = undefined;

SIMON_SAYS.win = document.getElementById("win");
SIMON_SAYS.lose = document.getElementById("lose");
SIMON_SAYS.lost = document.getElementById("lost");
SIMON_SAYS.level = document.getElementById("level");
SIMON_SAYS.round = document.getElementById("round");
SIMON_SAYS.lifes = document.getElementById("lifes");
SIMON_SAYS.wait  = document.getElementById("wait");
SIMON_SAYS.turn  = document.getElementById("turn");
SIMON_SAYS.start = document.getElementById("start");
SIMON_SAYS.checkbtn = document.getElementById("next_lvl");
SIMON_SAYS.nxt_lvl = document.getElementById("nxt_lvl");
SIMON_SAYS.score_cont = document.getElementById('score');

SIMON_SAYS.win.style.display = 'none';
SIMON_SAYS.lose.style.display = 'none';
SIMON_SAYS.lost.style.display = 'none';
SIMON_SAYS.turn.style.display = 'none';
SIMON_SAYS.wait.style.display = 'none';
SIMON_SAYS.checkbtn.style.display = 'none';
SIMON_SAYS.nxt_lvl.style.display = 'none';


// func return the grid 
SIMON_SAYS.make_grid = function(key) {
	SIMON_SAYS.container = document.querySelector(".button-container");
	SIMON_SAYS.selectedGame = SIMON_SAYS.config.find((i)=> { return i.css === key });

    for(var x=0;x<SIMON_SAYS.selectedGame.length;x++) {
		var button = document.createElement("button");
		button.setAttribute("type", "button");
		button.setAttribute("id", x);
		button.addEventListener("click", async function(e) {
			e.target.classList.add("round1");
			await SIMON_SAYS.sleep(500);
			e.target.classList.remove("round1");
			SIMON_SAYS.user_choice[SIMON_SAYS.user_choice.length] = e.target.id;
		});
		SIMON_SAYS.container.appendChild(button);
	}

	SIMON_SAYS.container.classList.add(SIMON_SAYS.selectedGame.css);
	SIMON_SAYS.win.style.display = 'none';
	SIMON_SAYS.lose.style.display = 'none';
}

// func cleans the container 
SIMON_SAYS.clear = function() {
	SIMON_SAYS.container.innerHTML = "";
	SIMON_SAYS.container.classList.remove(SIMON_SAYS.selectedGame.css);
}

SIMON_SAYS.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
SIMON_SAYS.getRandomInt = function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  
// func that makes a random order so the btn can be clicked 
SIMON_SAYS.make_order = function(lvl, round_nbr){
	SIMON_SAYS.cmp_order = [];
	let x = 0;
	let sqr = lvl + 2;
	let i = 0;
	let counter = 2;
	for(i = 0; i < (counter + round_nbr) + lvl; i++){
		x =  SIMON_SAYS.getRandomInt(0, Math.pow(sqr, 2));
		SIMON_SAYS.cmp_order[i] =  x;
	}
	counter++;
	return(SIMON_SAYS.cmp_order);	
}

// func that auto clicks the btn in the cmp_order
SIMON_SAYS.clicked_btn = async function(){
	SIMON_SAYS.wait.style.display = 'block'
	var x = '0';
	var tmp = '';
	var size = SIMON_SAYS.cmp_order.length;
	while(x < size) 
	{
		tmp = SIMON_SAYS.cmp_order[x];
		document.getElementById(tmp).click();
		await SIMON_SAYS.sleep(1000);
		x++;
	}
	SIMON_SAYS.user_choice = [];
	SIMON_SAYS.wait.style.display = 'none';
	SIMON_SAYS.turn.style.display = 'block';
}

// func that checks if the cmp_order is equal to the user_choice and shows a message acordingly 
SIMON_SAYS.check = async function(){
	var size = SIMON_SAYS.cmp_order.length;

	var x = 0;
	while((SIMON_SAYS.cmp_order[x] == SIMON_SAYS.user_choice[x]) && x < size){
		x++;
	}
	if(x == size && SIMON_SAYS.round_nbr == 2){
			SIMON_SAYS.nxt_lvl.style.display = 'block';
			SIMON_SAYS.turn.style.display = 'none';
			await SIMON_SAYS.sleep(1500);
			SIMON_SAYS.nxt_lvl.style.display = 'none';
			SIMON_SAYS.round_nbr += 1;
		}
	else if(x == size){
		console.log("NEXT ROUND");
		SIMON_SAYS.win.style.display = 'block';
		SIMON_SAYS.turn.style.display = 'none';
		await SIMON_SAYS.sleep(1500);
		SIMON_SAYS.round_nbr += 1;
		SIMON_SAYS.score += 200;
	}
	else if (SIMON_SAYS.lifes_counter > 0){
		console.log("YOU LOOSE ONE LIFE");
		SIMON_SAYS.lose.style.display = 'block';
		SIMON_SAYS.lifes_counter -= 1;
		await SIMON_SAYS.sleep(1500);
		SIMON_SAYS.score -= 200;
		
	}
	else{
		console.log("YOU LOST THE GAME")
		SIMON_SAYS.lost.style.display = 'block';
		SIMON_SAYS.start.style.display = 'block';
		SIMON_SAYS.showcontainer.style.display = 'none';
		SIMON_SAYS.turn.style.display = 'none';
		SIMON_SAYS.wait.style.display = 'none';
	}
	SIMON_SAYS.user_choice = [];
	SIMON_SAYS.cmp_order = [];
	SIMON_SAYS.clear();
	SIMON_SAYS.turn.style.display = 'none';
	SIMON_SAYS.main();
}
// this func sees if the player is on round three and if he is it changes the level to te next one
SIMON_SAYS.check_rounds = function(){

	if(SIMON_SAYS.round_nbr === 3){
		SIMON_SAYS.round_nbr = 0;
		SIMON_SAYS.level_nbr ++;
		SIMON_SAYS.lifes_counter = 2;
		SIMON_SAYS.grid_key = SIMON_SAYS.keys[SIMON_SAYS.level_nbr];
		SIMON_SAYS.score += 600; 
	}
	else{
		SIMON_SAYS.grid_key = SIMON_SAYS.keys[SIMON_SAYS.level_nbr];
	}
}
// This is the main func it's executed when the player presses start
SIMON_SAYS.main = async function(){
	if(SIMON_SAYS.lifes_counter > 0){SIMON_SAYS.start.style.display = "none";}
	SIMON_SAYS.check_rounds();
	SIMON_SAYS.make_grid(SIMON_SAYS.grid_key);
	SIMON_SAYS.make_order(SIMON_SAYS.level_nbr, SIMON_SAYS.round_nbr);
	await SIMON_SAYS.sleep(1000);
	SIMON_SAYS.clicked_btn();

	SIMON_SAYS.checkbtn.style.display = 'block'; 
	SIMON_SAYS.level.innerHTML = "Level " + (SIMON_SAYS.level_nbr + 1);
	SIMON_SAYS.round.innerHTML = "Round " + (SIMON_SAYS.round_nbr + 1);
	SIMON_SAYS.lifes.innerHTML = "Lifes " + (SIMON_SAYS.lifes_counter + 1);
	SIMON_SAYS.score_cont.innerHTML = "Score " + (SIMON_SAYS.score);
}
