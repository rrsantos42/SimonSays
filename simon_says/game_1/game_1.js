let SIMON_SAYS = {};

// The Game layouts
SIMON_SAYS.config = [
	{ css: "twotwo", name: "2x2", length: 4 },
	{ css: "threethree", name: "3x3", length: 9 },
	{ css: "fourfour", name: "4x4", length: 16 },
	{ css: "fivefive", name: "5x5", length: 25},
	{ css: "sixsix", name: "6x6", length: 36},
	{ css: "sevenseven", name: "7x7", length:49}
];

SIMON_SAYS.round_nbr = 0;
SIMON_SAYS.level_nbr = 0;
SIMON_SAYS.cmp_order = [];
SIMON_SAYS.user_choice = [];
SIMON_SAYS.selectedGame = undefined;
SIMON_SAYS.container = undefined;
SIMON_SAYS.win = document.getElementById("win");
SIMON_SAYS.lose = document.getElementById("lose");
SIMON_SAYS.lost = document.getElementById("lost");
SIMON_SAYS.level = document.getElementById("level");
SIMON_SAYS.round = document.getElementById("round");
SIMON_SAYS.lifes = document.getElementById("lifes");
SIMON_SAYS.win.style.display = 'none';
SIMON_SAYS.lose.style.display = 'none';
SIMON_SAYS.lost.style.display = 'none';
SIMON_SAYS.lifes_counter = 2;

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

SIMON_SAYS.clear = function() {
	SIMON_SAYS.container.innerHTML = "";
	SIMON_SAYS.container.classList.remove(SIMON_SAYS.selectedGame.css);
}
SIMON_SAYS.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

SIMON_SAYS.round_nbr = 0;
SIMON_SAYS.user_choice = [];

SIMON_SAYS.round_nbr_add = function(){
	SIMON_SAYS.round_nbr += 1;
}

SIMON_SAYS.make_order = function(lvl, round_nbr){
	SIMON_SAYS.cmp_order = [];
	var i = 0;
	if(lvl == 0){
		for(times = 0; times < (2 * (round_nbr + 1)); times++){
				i = Math.floor(Math.random() * 4);
				SIMON_SAYS.cmp_order[times] = i;
			}
	 }
	if(lvl == 1){
		for(times = 0; times < (2 * (round_nbr + 1) + lvl); times++){
			i = Math.floor(Math.random() * 9);
			SIMON_SAYS.cmp_order[times] = i;
		}
	}
	if(lvl == 2){
		for(times = 0; times < (2 * (round_nbr + lvl)); times++){
			i = Math.floor(Math.random() * 16);
			SIMON_SAYS.cmp_order[times] = i;
		}
	}
	if(lvl == 3){
		for(times = 0; times < (2 * (round_nbr + 1) + lvl); times++){
			i = Math.floor(Math.random() * 25);
			SIMON_SAYS.cmp_order[times] = i;
		}
	}
	if(lvl == 4){
		for(times = 0; times < (2 * (round_nbr + lvl - 1)); times++){
			i = Math.floor(Math.random() * 36);
			SIMON_SAYS.cmp_order[times] = i;
		}
	}
	return(SIMON_SAYS.cmp_order);
}
SIMON_SAYS.showcontainer = document.getElementById("container");

SIMON_SAYS.check = async function(){
	var size = SIMON_SAYS.cmp_order.length;

	var x = 0;
	while((SIMON_SAYS.cmp_order[x] == SIMON_SAYS.user_choice[x]) && x < size){
		x++;
	}
	if(x == size){
		console.log("NEXT ROUND");
		SIMON_SAYS.win.style.display = 'block';
		SIMON_SAYS.turn.style.display = 'none';
		await SIMON_SAYS.sleep(1500);
		SIMON_SAYS.round_nbr += 1;
	}
	else if (SIMON_SAYS.lifes_counter > 0){
		console.log("YOU LOOSE ONE LIFE");
		SIMON_SAYS.lose.style.display = 'block';
		SIMON_SAYS.lifes_counter -= 1;
		await SIMON_SAYS.sleep(1500);
		
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

SIMON_SAYS.wait  = document.getElementById("wait");
SIMON_SAYS.turn  = document.getElementById("turn");
SIMON_SAYS.turn.style.display = 'none';
SIMON_SAYS.wait.style.display = 'none';
SIMON_SAYS.start = document.getElementById("btn");
SIMON_SAYS.checkbtn = document.getElementById("next_lvl")
SIMON_SAYS.grids = [ "twotwo", "threethree", "fourfour", "fivefive", "sixsix", "sevenseven"];

SIMON_SAYS.check_rounds = function(){

	if(SIMON_SAYS.round_nbr === 3){
		SIMON_SAYS.round_nbr = 0;
		SIMON_SAYS.level_nbr ++;
		SIMON_SAYS.lifes_counter = 3;
		SIMON_SAYS.grid_value = SIMON_SAYS.grids[SIMON_SAYS.level_nbr];
		
	}
	else{
		SIMON_SAYS.grid_value = SIMON_SAYS.grids[SIMON_SAYS.level_nbr];
	}
}
SIMON_SAYS.main = async function(){
	if(SIMON_SAYS.lifes_counter > 0){SIMON_SAYS.start.style.display = "none";}
	SIMON_SAYS.level.innerHTML = "Level " + SIMON_SAYS.level_nbr;
	SIMON_SAYS.round.innerHTML = "Round " + SIMON_SAYS.round_nbr;
	SIMON_SAYS.lifes.innerHTML = "Lifes " + (SIMON_SAYS.lifes_counter + 1);

	SIMON_SAYS.check_rounds();
	SIMON_SAYS.make_grid(SIMON_SAYS.grid_value);
	SIMON_SAYS.make_order(SIMON_SAYS.level_nbr, SIMON_SAYS.round_nbr);
	await SIMON_SAYS.sleep(1000);
	SIMON_SAYS.clicked_btn();
}
