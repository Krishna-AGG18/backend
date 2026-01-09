const http = require("http");
const fs = require("fs");
const path = require("path");

// port 80 and port 443 for web request already used by computer , 22 for ssh request
const port = 3000;

//server, createserver always listens on the port for incoming traffic, takes a call back for whatever functionality i want to perform on the inputs
const server = http.createServer((req, res) => {
  // req.url === '/' => 'index.html'
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url
  );

  const extName = String(path.extname(filePath)).toLowerCase();

  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "text/png",
  };

  const contentType = mimeTypes[extName] || "application/octet-stream";

  //we have not served anything yet , its FS that reads and serves

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if(err.code === "ENOENT"){
        res.writeHead(404, {'content-type' : 'text/html'})
        res.end('404 : File not found laala !')
      }
    } else {
      res.writeHead(200, { "content-type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});
