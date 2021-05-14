const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "rm_system",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded( { extended: true } ))

// Index page
app.get('/', (req, resp) => {
	const sqlSearch = "SELECT * FROM restaurant;";
	db.query(sqlSearch,(err, result) => {
		resp.send(result);
	});
})

// search restaurant/item
app.post('/api/searchData', (req, resp) => {
	const searchQuery = req.body.query;
	const sqlSearch = "SELECT * FROM restaurant WHERE name LIKE ?;";
	db.query(sqlSearch,['%'+searchQuery+'%'], (err, result) => {
		resp.send(result);
	});
});

// update resturant / Item
app.post('/api/updateData', (req, resp) => {
	const data = req.body.data;
	const sqlUpdate = "Update restaurant set name = ?, address = ?, url = ?, neighbourhood = ?, longitude = ?, latitude = ? where restaurant_id = ?;";
	db.query(sqlUpdate,[data.name, data.address, data.url, data.neighbourhood, data.longitude, data.latitude, data.restaurant_id], (err, result) => {
		resp.send(result);
	});
});

app.listen(3001, ()=>{
	console.log("running on port 3001");
});