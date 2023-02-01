#!/bin/node
//#!/usr/bin/env node

const http = require('http');

let http_server = http.createServer(function(request, result){

console.log("Alguien se conecta");
result.write('ola k ase');
result.end();
});
http_server.listen(8080);


