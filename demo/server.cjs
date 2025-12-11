#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3002;
const HOSTNAME = 'localhost';

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Servir HTML
  if (req.url === '/' || req.url === '') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  } else {
    res.writeHead(404);
    res.end('404 Not Found');
  }
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`\n🎨 DEMO COMPURSATIL funcionando en http://${HOSTNAME}:${PORT}`);
  console.log(`📝 Versión SIN Base de Datos (datos en memoria)\n`);
});
