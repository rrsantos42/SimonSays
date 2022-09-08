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

SIMON_SAYS.round_nbr = [];
SIMON_SAYS.round_nbr = 0;
SIMON_SAYS.cmp_order = [];
SIMON_SAYS.user_choice = [];
SIMON_SAYS.selectedGame = undefined;
SIMON_SAYS.container = undefined;
SIMON_SAYS.win = document.getElementById("win");
SIMON_SAYS.lose = document.getElementById("lose");

SIMON_SAYS.win.style.display = 'none';
SIMON_SAYS.lose.style.display = 'none';

SIMON_SAYS.make_grid = function(key) {
	SIMON_SAYS.container = document.querySelector(".button-container");


	SIMON_SAYS.container.addEventListener("click", async function(e) {
		if(e.target.nodeName==="BUTTON") {
			e.target.classList.add("round1");
			await SIMON_SAYS.sleep(400);
			e.target.classList.remove("round1");
			 SIMON_SAYS.user_choice[SIMON_SAYS.user_choice.length] = e.srcElement.id;
		}
	});

	SIMON_SAYS.selectedGame = SIMON_SAYS.config.find((i)=> { return i.css === key });

    for(var x=0;x<SIMON_SAYS.selectedGame.length;x++) {
		var button = document.createElement("button");
		button.setAttribute("type", "button");
		button.setAttribute("id", x);
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
SIMON_SAYS.cmp_order = undefined;
SIMON_SAYS.user_choice = [];

SIMON_SAYS.round_nbr_add = function(){
	SIMON_SAYS.round_nbr += 1;
}

SIMON_SAYS.make_order = function(lvl, round_nbr){
	SIMON_SAYS.cmp_order = [];
	var i = 0;
	if(lvl == 0){
		if(round_nbr == 0){

			for(times = 0; times < 2; times++){
				i = Math.floor(Math.random() * 4);
				SIMON_SAYS.cmp_order[times] = i;
			}
		}
		if(round_nbr == 1){

			for(times = 0; times < 4; times++){
				i = Math.floor(Math.random() * 4);
				SIMON_SAYS.cmp_order[times] = i;
			}
		}
		if(round_nbr == 2){

			for(times = 0; times < 6; times++){
				i = Math.floor(Math.random() * 4);
				SIMON_SAYS.cmp_order[times] = i;
			}
		}
	}
	if(lvl == 1){
		if(round_nbr == 0){

			for(times = 0; times < 3; times++){
				i = Math.floor(Math.random() * 9);
				SIMON_SAYS.cmp_order[times] = i;
			}
		}
		if(round_nbr == 1){

			for(times = 0; times < 5; times++){
				i = Math.floor(Math.random() * 9);
				SIMON_SAYS.cmp_order[times] = i;
			}
		}
		if(round_nbr == 2){

			for(times = 0; times < 7; times++){
				i = Math.floor(Math.random() * 9);
				SIMON_SAYS.cmp_order[times] = i;
			}
		}
	}
	if(lvl == 2){
		if(round_nbr == 0){

			for(times = 0; times < 4; times++){
				i = Math.floor(Math.random() * 16);
				SIMON_SAYS.cmp_order[times] = i;
			}
		}
		if(round_nbr == 1){

			for(times = 0; times < 6; times++){
				i = Math.floor(Math.random() * 16);
				SIMON_SAYS.cmp_order[times] = i;
			}
		}
		if(round_nbr == 2){

			for(times = 0; times < 8; times++){
				i = Math.floor(Math.random() * 16);
				SIMON_SAYS.cmp_order[times] = i;
			}
		}
	}
	if(lvl == 3){
		if(round_nbr == 0){

			for(times = 0; times < 5; times++){
				i = Math.floor(Math.random() *25);
				SIMON_SAYS.cmp_order[times] = i;
			}
		}
		if(round_nbr == 1){

			for(times = 0; times < 7; times++){
				i = Math.floor(Math.random() * 25);
				SIMON_SAYS.cmp_order[times] = i;
			}
		}
		if(round_nbr == 2){

			for(times = 0; times < 9; times++){
				i = Math.floor(Math.random() * 25);
				SIMON_SAYS.cmp_order[times] = i;
			}
		}
	}
	if(lvl == 4){
		if(round_nbr == 0){

			for(times = 0; times < 6; times++){
				i = Math.floor(Math.random() * 36);
				SIMON_SAYS.cmp_order[times] = i;
			}
		}
		if(round_nbr == 1){

			for(times = 0; times < 8; times++){
				i = Math.floor(Math.random() * 36);
				SIMON_SAYS.cmp_order[times] = i;
			}
		}
		if(round_nbr == 2){

			for(times = 0; times < 10; times++){
				i = Math.floor(Math.random() * 36);
				SIMON_SAYS.cmp_order[times] = i;
			}
		}
	}
	return(SIMON_SAYS.cmp_order);
}

SIMON_SAYS.check = function(){
	var size = SIMON_SAYS.cmp_order.length;
	var x = 0;
	while((SIMON_SAYS.cmp_order[x] == SIMON_SAYS.user_choice[x]) && x < size){
		x++;
	}
	if(x == size){
		console.log("YOU WIN");
		SIMON_SAYS.win.style.display = 'block';
	}
	else{
		console.log("YOU LOOSE");
		SIMON_SAYS.lose.style.display = 'block';

	}
	SIMON_SAYS.clear();
	SIMON_SAYS.user_choice = [];
	SIMON_SAYS.turn.style.display = 'none';
}
SIMON_SAYS.wait  = document.getElementById("wait");
SIMON_SAYS.turn  = document.getElementById("turn");
SIMON_SAYS.turn.style.display = 'none';
SIMON_SAYS.wait.style.display = 'none'


SIMON_SAYS.main = function(){
	SIMON_SAYS.make_grid('twotwo');
	SIMON_SAYS.make_order(0, 0);
	SIMON_SAYS.clicked_btn();
}
