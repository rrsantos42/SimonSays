let sbt = document.getElementById('btn');
let intra = document.getElementById('input').value;
let start = document.getElementById('start');
let name_1 = [];
let size;
var game = false;

if (game == false){
	start.style.display = "none";
}
function show_btn(){
		start.style.display = "block";
}

function getname(){
	let intra = document.getElementById('input').value;
	name_1 = intra;
	size = name_1.length
	if(size <= 4){ console.log("ERROR WRONG INTRA!!!");}
	else{
		console.log(intra);
		show_btn();
	}
}

