let SIMON_SAYS = {};

// The Game layouts
SIMON_SAYS.config = [
	{ css: "twotwo", name: "2x2", length: 4 },
	{ css: "threethree", name: "3x3", length: 9 },
	{ css: "fourfour", name: "4x4", length: 16 },
	{ css: "fivefive", name: "5x5", length: 25},
	{ css: "sixsix", name: "6x6", length: 36}
];

SIMON_SAYS.round_nbr = [];
SIMON_SAYS.cmp_order = [];

SIMON_SAYS.selectedGame = undefined;
SIMON_SAYS.container = undefined;

SIMON_SAYS.start = function(key) {
	SIMON_SAYS.container = document.querySelector(".button-container");


	SIMON_SAYS.container.addEventListener("click", function(e) {
		if(e.target.nodeName==="BUTTON") {
			e.target.classList.add("round1");
		}
	});

	SIMON_SAYS.selectedGame = SIMON_SAYS.config.find((i)=> { return i.css === key });

    for(var x=0;x<SIMON_SAYS.selectedGame.length;x++) {
		var button = document.createElement("button");
		button.setAttribute("type", "button");
		SIMON_SAYS.container.appendChild(button);
	}

	SIMON_SAYS.container.classList.add(SIMON_SAYS.selectedGame.css);
} 

SIMON_SAYS.clear = function() {
	SIMON_SAYS.container.innerHTML = "";
	SIMON_SAYS.container.classList.remove(SIMON_SAYS.selectedGame.css);
}

 function sleep(ms) {
 	return new Promise(resolve => setTimeout(resolve, ms));
}


SIMON_SAYS.round_nbr = [];
SIMON_SAYS.cmp_order = [];
SIMON_SAYS.user_choice = [];



