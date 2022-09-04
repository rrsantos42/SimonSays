
let intra = document.getElementById('input').value;
let name_1 = [];
let size;

function getname(){
	let intra = document.getElementById('input').value;
	name_1 = intra;
	size = name_1.length
	if(size <= 4){ console.log("ERROR WRONG INTRA!!!");}
	else{console.log(intra);}
}
