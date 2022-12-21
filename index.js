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
import { start } from 'repl';
import { rejects } from 'assert';

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


const show = 10;

const getSearch = (start, limit, nama, book) => {
  return new Promise((resolve, reject) => {
    let querySearch = `SELECT target as 'target1', (SELECT COUNT(target) FROM got WHERE target = target1) as count FROM got WHERE sources LIKE '%${nama}%' AND book = ${book} GROUP BY target ORDER BY count DESC LIMIT ?,?`;
    connection.query(querySearch, [start, limit], (err, result) => {
      if(err) reject(err);
      else{
        resolve(result);
      }
    })
  })
}

const getRowSearch = (nama, book) => {
  return new Promise((resolve, reject) => {
    let queryAllSearch = `SELECT COUNT('target1') as row FROM (SELECT target as 'target1', (SELECT COUNT(target) FROM got WHERE target = 'target1') as count FROM got WHERE sources LIKE '%${nama}%' AND book = ${book} GROUP BY target ORDER BY count DESC) as x;`
    connection.query(queryAllSearch, (err, result) => {
      if(err) reject(err);
      else resolve(result);
    })
  })
}

let namaG;
let bookG;


app.get('/search', (request, response) => {
  response.render('search-awal')
});


app.post('/search-process', async (request, response) => {
  let book = request.body.books;
  let nama = request.body.character;

  namaG = nama
  bookG = book

  console.log(namaG, bookG)

  const jumlahRow = await getRowSearch(nama, book);
  const pageCount = Math.ceil(jumlahRow[0].row/show);
  console.log(jumlahRow[0].row)
  
  let query = `SELECT target as 'target1', (SELECT COUNT(target) FROM got WHERE target = target1) as count FROM got WHERE sources LIKE '%${nama}%' AND book = ${book} GROUP BY target ORDER BY count DESC LIMIT ?,?`;
  connection.query(query, [0, show], (error, results, fields) => {
    if(error) throw error;
    response.render('search', { searchList: results, pageCount})
  });
});

app.get('/search-process', async (request, response) => {
  let book = bookG
  let nama = namaG

  console.log(nama, book)

  const jumlahRow = await getRowSearch(nama, book);
  const pageCount = Math.ceil(jumlahRow[0].row/show);
  console.log(pageCount)

  const start = request.query.start;
  let searchlist;

  if(start==undefined){
    searchlist = await getSearch(0, show, nama, book);
  }
  else{
    let limitStart = (show*(start-1));
    searchlist = await getSearch(limitStart, show, nama, book);
  }
  
  response.render('search', { searchList:searchlist, pageCount})
})

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