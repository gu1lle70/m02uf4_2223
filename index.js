#!/usr/bin/env node

const http = require('http');
const fs = require('fs');


const { MongoClient } = require('mongodb');


const url = 'mongodb://localhost:27017';


const client = new MongoClient(url);


const dbName = 'abascal2';

async function db_connect() {

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('characters');

  
  return 'conectados a la base de datos';
}

db_connect()
  .then(info => conosle.log(info))
  .catch(msg => console.error(msg));


 
 function send_characters(response)
{
	let collection = db.collection ('characters');

	collection.find({}),toArray().then(characters => {
	
	let nombres = [];

	for(let i = 0; i < query.length; i++){
		nombres.push( query[i].name );
	}
	response.write(JSON.stringify(nombres));
  	response.end();
	});


}
function send characters_items (response, url)
{
	let name = url[2].trim;
	if (name == "")
	{
	response.write("ERROR: URL mal formada");
	response.end();
	return;


	}
	let collection = db.collection('characters');
	collection.find({"name":name}).toArray().then(character =>{
	if (characters.length != 1)
	{
	response.write("ERROR: El personaje "+name+" no existe);
	response.end();

	return;
	}
	let id = characters[0].id_characters;
	let collection = db.collection('characters_items');
collection.find({"id_characters:id"}).toArray().then(ids =>{

if(ids.length == 0){
	response.weite("[]");
	response.end();

	return
		}

	let ids_items = [];

	ids.forEach(element => 
		ids_items.push(element.id_item);
	});
		let collection = db.collection('items');
		collection.find({"id_items": {$in:ids_items} }).toArray().then(items => {
	
	response.write(JSON.stringify(items))
	response.end();

	return;


		});

	});

});


}

  
function send_age(response, url_split)
{
	if(url_split.length < 3){
		response.write("error: Edad Erronia");
	  	response.end();
		return;
	}
	let collection = db.collection ('characters');

	collection.find({"name": url_split[2]}).project({_id:0,age:1})
			.toArray().then(character => {
	if (character.lenght == 0){
		response.write("ERROR: edad Erronea");
		response.end();
		return;
	}
		response.write(JSON.stringify(character[0]));
	  	response.end();
	});
}

let http_server = http.createServer(function(request, response){
	if (request.url == "/favicon.ico"){
		return;
	}

	let url_split = request.url.split("/");
	console.log(url_split);

switch (url_split[1]){

case "characters":
	send_characters(response);
	break;
case "age":
	send_age(response, url_split);
	break;
case "items":
	console.log("aqui van los items");
	break;
default:
	console.log("default");
      	fs.readFile("index.html", function(err, data){

if(err){

console.log(err);
response.writeHead(404, {"Content-Type":"text/html"});
response.write("Error 404: archivo no encontrado");
response.end();
			
return;
}	

response.writeHead(200, {"Content-Type":"text/html"});
response.write(data);	
response.end();
});
		}
});

http_server.listen(8080);

