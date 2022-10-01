const {creatPool} = require('mysql');

const pool = creatPool({

	host : "localhost",
	user : "root",
	password : "database",

})

pool.query(select)