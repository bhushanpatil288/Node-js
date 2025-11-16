const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;

const server = http.createServer((req, res)=>{
  const filePath = path.join(__dirname, req.url === '/' ? "index.html" : (req.url).endsWith('.html') ? req.url : req.url+'.html')

  const exName = String(path.extname(filePath).toLowerCase())

  const mimeTypes = {
    '.html' : 'text/html',
    '.css' : 'text/css',
    '.js' : 'text/javascript',
    '.png' : 'text/png',
  }

  const contentType = mimeTypes[exName] || 'application/octet-stream';

  fs.readFile(filePath, (err, content)=>{
    if(err){
      if(err.code === 'ENOENT'){
        res.writeHead(404, {'content-Type': "text/html"});
        res.end('404: File not Found');
      }
    } else {
      res.writeHead(200, {'content-Type': contentType});
      res.end(content, 'utf-8');
    }
  });

});

server.listen(port, ()=>{
  console.log(`listening on port ${port}`);
})  