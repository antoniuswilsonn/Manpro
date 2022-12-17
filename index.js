import path, { resolve } from 'path';
import express, { response } from 'express';
import mysql from "mysql";
import session from "express-session";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mv from 'mv';
import formidable from 'formidable';
import csv from 'fast-csv';
import { request } from 'http';
import { Console } from 'console';

const app = express();

app.set('view engine', 'ejs');

const __dirname = dirname(fileURLToPath(import.meta.url));

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'manproadmin',
  password : 'manproadmin',
  database : 'manprotubes'
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('resources'));
app.use(express.static('views'));

app.get('/home', (request, response) => {
	response.render('home');
});

app.get('/', (request, response) => {
	response.render('home');
});

app.get('/search', (request, response) => {
  response.render('search');
});

app.get('/graphic', (request, response) => {
  let querygraph = 'SELECT sources as label, COUNT(sources) as data FROM got WHERE book=1 GROUP BY sources ORDER BY COUNT(sources) DESC LIMIT 10'
  connection.query(querygraph, (err, result, fields) => {
    if(err) throw err;
    let data = []
		let label = []
			for (var i=0; i<result.length; i++){
				data.push(result[i].data);
				label.push(result[i].label);
			}
    response.render('graph-book1', { judul: 'quantity', label: JSON.stringify(label), data: JSON.stringify(data) });
  });	
});

app.get('/graphic-book2', (request, response) => {
  let querygraph = 'SELECT sources as label, COUNT(sources) as data FROM got WHERE book=2 GROUP BY sources ORDER BY COUNT(sources) DESC LIMIT 10'
  connection.query(querygraph, (err, result, fields) => {
    if(err) throw err;
    let data = []
		let label = []
			for (var i=0; i<result.length; i++){
				data.push(result[i].data);
				label.push(result[i].label);
			}
    response.render('graph-book2', { judul: 'quantity', label: JSON.stringify(label), data: JSON.stringify(data) });
  });	
});

app.get('/graphic-book3', (request, response) => {
  let querygraph = 'SELECT sources as label, COUNT(sources) as data FROM got WHERE book=3 GROUP BY sources ORDER BY COUNT(sources) DESC LIMIT 10'
  connection.query(querygraph, (err, result, fields) => {
    if(err) throw err;
    let data = []
		let label = []
			for (var i=0; i<result.length; i++){
				data.push(result[i].data);
				label.push(result[i].label);
			}
    response.render('graph-book3', { judul: 'quantity', label: JSON.stringify(label), data: JSON.stringify(data) });
  });	
});

app.get('/graphic-book4', (request, response) => {
  let querygraph = 'SELECT sources as label, COUNT(sources) as data FROM got WHERE book=4 GROUP BY sources ORDER BY COUNT(sources) DESC LIMIT 10'
  connection.query(querygraph, (err, result, fields) => {
    if(err) throw err;
    let data = []
		let label = []
			for (var i=0; i<result.length; i++){
				data.push(result[i].data);
				label.push(result[i].label);
			}
    response.render('graph-book4', { judul: 'quantity', label: JSON.stringify(label), data: JSON.stringify(data) });
  });	
});

app.get('/graphic-book5', (request, response) => {
  let querygraph = 'SELECT sources as label, COUNT(sources) as data FROM got WHERE book=5 GROUP BY sources ORDER BY COUNT(sources) DESC LIMIT 10'
  connection.query(querygraph, (err, result, fields) => {
    if(err) throw err;
    let data = []
		let label = []
			for (var i=0; i<result.length; i++){
				data.push(result[i].data);
				label.push(result[i].label);
			}
    response.render('graph-book5', { judul: 'quantity', label: JSON.stringify(label), data: JSON.stringify(data) });
  });	
});

app.get('/interaction', (request, response) => {
	response.render('interaction');
});



app.listen(8081);
console.log(`Server jalan pada port 8081`);
console.log(`===========================`);
console.log(`Ready.`)