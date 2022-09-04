

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const btn1 = document.querySelector('#btn1')
const btn2 = document.querySelector('#btn2')
const btn3 = document.querySelector('#btn3')
const btn4 = document.querySelector('#btn4')
const start = document.querySelector('#btn')

let order = [];
let user_order = [];
var arr = [btn1, btn2, btn3, btn4];
let round = 0;
let flash;

function main()
{	
	order = [];
	user_order = [];
	round += 1;
	flash = 0;
	
	
}  
start.addEventListener('click', (event) => {
	main();
})
